import type {FooterContent} from "./types.ts";
import {FaGithub, FaLinkedin, FaEnvelope} from "react-icons/fa";
import {APP_INFO} from "../app/data.ts";

/**
 * Footer content and social links.
 *
 * @author Yubraj Sahoo
 */
export const FOOTER_CONTENT: FooterContent = {
    quickLinksHeading: "Quick Links",
    connectHeading: "Connect",
    socialLinks: [
        {
            id: "github",
            label: "GitHub",
            href: "https://github.com/yubrajsahoo",
            icon: FaGithub,
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/yubraj-sahoo",
            icon: FaLinkedin,
        },
        {
            id: "email",
            label: "Email",
            href: `mailto:${APP_INFO.personal.email}`,
            icon: FaEnvelope,
        },
    ],
    madeWithText: "Made with ❤️ and ☕",
};
