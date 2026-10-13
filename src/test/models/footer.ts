import type {FooterContent} from "../../models/footer";
import {FiGithub, FiLinkedin, FiMail} from "react-icons/fi";

export const MOCKED_FOOTER_CONTENT: FooterContent = {
    quickLinksHeading: "Quick Links",
    connectHeading: "Connect",
    madeWithText: "Made with ❤️ and ☕",
    socialLinks: [
        {
            id: "github",
            label: "GitHub",
            href: "https://github.com/yubrajsahoo",
            icon: FiGithub,
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/yubraj-sahoo",
            icon: FiLinkedin,
        },
        {
            id: "email",
            label: "Email",
            href: "mailto:yubraj2000yubraj@gmail.com",
            icon: FiMail,
        },
    ],
};
