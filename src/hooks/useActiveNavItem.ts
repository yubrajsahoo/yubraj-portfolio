import {useCallback, useEffect, useRef, useState} from 'react';
import {NAV_LINKS} from "../models";

/** Tracks the navigation item whose matching section is currently in view. */
export const useActiveNavItem = () => {
    const [activeNavItem, setActiveNavItem] = useState('home');
    const isManualClickRef = useRef(false);
    const manualClickTimerRef = useRef<number | null>(null);

    const updateActiveNavItem = useCallback((sectionId: string, isManual = false) => {
        if (isManual) {
            isManualClickRef.current = true;
            if (manualClickTimerRef.current !== null) {
                window.clearTimeout(manualClickTimerRef.current);
            }
            manualClickTimerRef.current = window.setTimeout(() => {
                isManualClickRef.current = false;
                manualClickTimerRef.current = null;
            }, 800);
        }

        setActiveNavItem(sectionId);

        if (typeof window !== 'undefined' && window.location.hash !== `#${sectionId}`) {
            window.history.replaceState(null, '', `#${sectionId}`);
        }
    }, []);

    const calculateActiveSection = useCallback(() => {
        if (isManualClickRef.current) return;

        const sections = NAV_LINKS
            .map(({id}) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        if (!sections.length) return;

        // Top of the page: highlight first section (e.g. 'home')
        if (window.scrollY < 80) {
            updateActiveNavItem(sections[0].id);
            return;
        }

        // Bottom of the page: highlight last section (e.g. 'contact' or 'projects')
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const isNearBottom = window.innerHeight + window.scrollY >= scrollHeight - 60;
        if (isNearBottom) {
            updateActiveNavItem(sections[sections.length - 1].id);
            return;
        }

        // Active reading line offset from top of viewport
        const readingLine = Math.min(220, window.innerHeight * 0.35);

        // Find the lowest section on page that has reached readingLine and hasn't fully scrolled past
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            if (rect.top <= readingLine && rect.bottom > 80) {
                updateActiveNavItem(section.id);
                return;
            }
        }
    }, [updateActiveNavItem]);

    const unlockManualClick = useCallback(() => {
        if (isManualClickRef.current) {
            isManualClickRef.current = false;
            if (manualClickTimerRef.current !== null) {
                window.clearTimeout(manualClickTimerRef.current);
                manualClickTimerRef.current = null;
            }
        }
    }, []);

    useEffect(() => {
        const sections = NAV_LINKS
            .map(({id}) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        let observer: IntersectionObserver | null = null;
        if ('IntersectionObserver' in window && sections.length > 0) {
            observer = new IntersectionObserver(
                (entries) => {
                    if (isManualClickRef.current) return;

                    // If running in a browser with real DOM layout dimensions
                    const hasRealLayout = entries.some(
                        (entry) => entry.target && entry.target.getBoundingClientRect().height > 0,
                    );

                    if (hasRealLayout) {
                        calculateActiveSection();
                        return;
                    }

                    // Fallback for test / headless environments without layout
                    const visibleSection = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                    if (visibleSection) {
                        updateActiveNavItem(visibleSection.target.id);
                    }
                },
                {
                    rootMargin: '-20% 0px -40% 0px',
                    threshold: [0, 0.25, 0.5, 0.75, 1],
                },
            );

            sections.forEach((section) => observer?.observe(section));
        }

        let rafId: number | null = null;
        const handleScroll = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                calculateActiveSection();
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        window.addEventListener('wheel', unlockManualClick, { passive: true });
        window.addEventListener('touchmove', unlockManualClick, { passive: true });

        // If the page is already scrolled on mount, calculate the current section
        if (window.scrollY > 0) {
            calculateActiveSection();
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
            if (manualClickTimerRef.current !== null) {
                window.clearTimeout(manualClickTimerRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            window.removeEventListener('wheel', unlockManualClick);
            window.removeEventListener('touchmove', unlockManualClick);
        };
    }, [calculateActiveSection, unlockManualClick, updateActiveNavItem]);

    return {
        activeNavItem,
        setActiveNavItem: (sectionId: string) => updateActiveNavItem(sectionId, true),
    };
};
