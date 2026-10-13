import type {ContactContent} from "./types.ts";
import {FiMail, FiPhone, FiMapPin} from "react-icons/fi";
import {APP_INFO} from "../app/data.ts";

/**
 * Contact section content and configuration.
 *
 * @author Yubraj Sahoo
 */
export const CONTACT_CONTENT: ContactContent = {
    eyebrow: "CONTACT",
    title: "Get In Touch",
    subtitle: "Have a project idea or want to work together? Feel free to reach out.",
    items: [
        {
            id: "email",
            label: "Email",
            value: APP_INFO.personal.email,
            href: `mailto:${APP_INFO.personal.email}`,
            icon: FiMail,
        },
        {
            id: "phone",
            label: "Phone",
            value: APP_INFO.personal.phone,
            href: `tel:${APP_INFO.personal.phone.replace(/\s+/g, "")}`,
            icon: FiPhone,
        },
        {
            id: "location",
            label: "Location",
            value: APP_INFO.personal.location,
            icon: FiMapPin,
        },
    ],
    form: {
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        messagePlaceholder: "Your Message",
        submitButtonText: "Send Message",
    },
};
