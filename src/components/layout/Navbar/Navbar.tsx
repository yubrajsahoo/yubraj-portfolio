import {useState, useEffect} from "react";
import {Logo} from "./Logo";
import {NavItem} from "./NavItem";
import {NAV_LINKS} from "../../../models";
import {APP_INFO} from "../../../models";
import MobileNav from "./MobileNav";
import {useActiveNavItem} from "../../../hooks/useActiveNavItem";

import "./Navbar.css";
import {Button} from "../../ui";
import {useHealth} from "../../../contexts/HealthContext.tsx";

/**
 * Navbar component for portfolio
 *
 * @constructor
 * @author Yubraj Sahoo
 */
const Navbar = () => {
    const {activeNavItem, setActiveNavItem} = useActiveNavItem();
    const {isBackendUp} = useHealth();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const navLinks = NAV_LINKS.filter((item) => {
        if (item.id === "contact") {
            return isBackendUp;
        }
        return true;
    });

    return (
        <nav className={`navbar fixed-top nav-color app-components`}>
            <div className={`container-fluid navbar-pad`}>
                {isMobile ? (
                    <MobileNav
                        activeNavItem={activeNavItem}
                        onActiveNavItemChange={setActiveNavItem}
                        navLinks={navLinks}
                    />
                ) : (
                    <>
                        <Logo onClick={() => setActiveNavItem("home")}/>
                        <ul className={`navbar-nav flex-row gap-4 ms-auto navbar-pad`}>
                            {navLinks.map((item) => (
                                <NavItem
                                    key={item.id}
                                    item={item}
                                    active={activeNavItem === item.id}
                                    onClick={() => setActiveNavItem(item.id)}
                                />
                            ))}
                            {(APP_INFO.config.showHireButton || APP_INFO.config.enableContact) && isBackendUp && (
                                <Button key={`hire`} variant={`primary`} size={`sm`} radius={`circle-1`} href="#contact">
                                    Hire Me
                                </Button>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
