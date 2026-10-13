import type {IconType} from "react-icons";

export interface ContactInfoItem {
    id: string;
    label: string;
    value: string;
    href?: string;
    icon: IconType;
}

export interface ContactContent {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ContactInfoItem[];
    form: {
        namePlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        submitButtonText: string;
    };
}
