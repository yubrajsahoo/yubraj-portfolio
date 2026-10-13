import {APP_INFO, FOOTER_CONTENT, NAV_LINKS} from "../../../models";
import "./Footer.css";

/**
 * Footer component with logo, quick navigation links, social connect buttons, and copyright.
 *
 * @author Yubraj Sahoo
 */
export const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer__container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <a href="#home" className="footer__brand-link">
                            <img
                                src={APP_INFO.application.logo}
                                alt="Logo"
                                width="44"
                                height="34"
                                className="footer__logo-img"
                            />
                            <span className="footer__brand-text">{APP_INFO.personal.name}</span>
                        </a>
                        <p className="footer__role">{APP_INFO.professional.role}</p>
                    </div>

                    <div className="footer__quick-links">
                        <h4 className="footer__heading">{FOOTER_CONTENT.quickLinksHeading}</h4>
                        <ul className="footer__links">
                            {NAV_LINKS.map((link) => (
                                <li key={link.id}>
                                    <a href={link.href} className="footer__link">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__connect">
                        <h4 className="footer__heading">{FOOTER_CONTENT.connectHeading}</h4>
                        <ul className="footer__social-list">
                            {FOOTER_CONTENT.socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                const isExternal = social.href.startsWith("http");

                                return (
                                    <li key={social.id}>
                                        <a
                                            href={social.href}
                                            target={isExternal ? "_blank" : undefined}
                                            rel={isExternal ? "noopener noreferrer" : undefined}
                                            className="footer__social-btn"
                                            aria-label={social.label}
                                            title={social.label}
                                        >
                                            <IconComponent size={18} aria-hidden="true"/>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright m-0">{APP_INFO.application.copyright}</p>
                    <p className="footer__made-with m-0">{FOOTER_CONTENT.madeWithText}</p>
                </div>
            </div>
        </footer>
    );
};
