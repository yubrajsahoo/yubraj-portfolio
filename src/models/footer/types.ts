import type {IconType} from "react-icons";

export interface FooterSocialLink {
    id: string;
    label: string;
    href: string;
    icon: IconType;
}

export interface FooterContent {
    quickLinksHeading: string;
    connectHeading: string;
    socialLinks: FooterSocialLink[];
    madeWithText: string;
}
