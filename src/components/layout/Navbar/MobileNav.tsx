import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import { APP_INFO, NAV_LINKS, type NavLink } from "../../../models";
import { Button } from "../../ui";
import { Logo } from "./Logo";
import { useHealth } from "../../../contexts/HealthContext.tsx";

interface MobileNavProps {
    activeNavItem?: string;
    onActiveNavItemChange?: (itemId: string) => void;
    navLinks?: NavLink[];
}

/**
 * Mobile navigation component.
 *
 * Provides:
 * - Hamburger menu toggle
 * - Swipe-from-left gesture to open the menu
 * - Click-outside support
 * - Active navigation item handling
 * - Hire Me button
 */
const MobileNav = ({
                       activeNavItem: controlledActiveNavItem,
                       onActiveNavItemChange,
                       navLinks: propNavLinks,
                   }: MobileNavProps) => {
    const { isBackendUp } = useHealth();
    const navLinks = propNavLinks ?? NAV_LINKS.filter((item) => {
        if (item.id === "contact") {
            return isBackendUp;
        }
        return true;
    });
    const [open, setOpen] = useState(false);
    const [internalActiveNavItem, setInternalActiveNavItem] =
        useState("home");

    const touchStartX = useRef(0);
    const mobileNavRef = useRef<HTMLDivElement>(null);

    const activeNavItem =
        controlledActiveNavItem ?? internalActiveNavItem;

    /**
     * Updates the active navigation item.
     */
    const setActiveNavItem = (itemId: string) => {
        setInternalActiveNavItem(itemId);
        onActiveNavItemChange?.(itemId);
    };

    /**
     * Opens the menu when the user swipes
     * from the left edge of the screen.
     */
    useEffect(() => {
        const handleTouchStart = (event: TouchEvent) => {
            touchStartX.current = event.touches[0].clientX;
        };

        const handleTouchEnd = (event: TouchEvent) => {
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance =
                touchEndX - touchStartX.current;

            if (
                swipeDistance > 50 &&
                touchStartX.current < 30
            ) {
                event.preventDefault();
                setOpen(true);
            }
        };

        window.addEventListener(
            "touchstart",
            handleTouchStart,
            false
        );

        window.addEventListener(
            "touchend",
            handleTouchEnd,
            { passive: false }
        );

        return () => {
            window.removeEventListener(
                "touchstart",
                handleTouchStart
            );

            window.removeEventListener(
                "touchend",
                handleTouchEnd
            );
        };
    }, []);

    /**
     * Closes the menu when clicking outside
     * the mobile navigation.
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                mobileNavRef.current &&
                !mobileNavRef.current.contains(target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [open]);

    /**
     * Handles navigation link click.
     */
    const handleLinkClick = (itemId: string) => {
        setActiveNavItem(itemId);
        setOpen(false);
    };

    /**
     * Handles Hire Me button click.
     */
    const handleHireMeClick = () => {
        setOpen(false);
    };

    return (
        <div
            className="mobile-nav"
            ref={mobileNavRef}
        >
            <Logo
                onClick={() => {
                    setActiveNavItem("home");
                    setOpen(false);
                }}
            />

            <button
                type="button"
                className="mobile-nav-toggle"
                aria-label={
                    open
                        ? "Close navigation menu"
                        : "Open navigation menu"
                }
                aria-expanded={open}
                onClick={() => setOpen((previous) => !previous)}
            >
                {open ? (
                    <AiOutlineClose
                        className="hamburger"
                        size={30}
                    />
                ) : (
                    <GiHamburgerMenu
                        className="hamburger"
                        size={30}
                    />
                )}
            </button>

            <ul
                className={`mobile-nav-links ${
                    open ? "open" : ""
                }`}
            >
                {navLinks.map((item) => (
                    <li key={item.id}>
                        <a
                            href={item.href}
                            className={
                                activeNavItem === item.id
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                handleLinkClick(item.id)
                            }
                        >
                            {item.label}
                        </a>
                    </li>
                ))}

                {(APP_INFO.config.showHireButton || APP_INFO.config.enableContact) && isBackendUp && (
                    <li>
                        <Button
                            variant="primary"
                            size="sm"
                            radius="circle-1"
                            href="#contact"
                            onClick={handleHireMeClick}
                        >
                            Hire Me
                        </Button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MobileNav;
