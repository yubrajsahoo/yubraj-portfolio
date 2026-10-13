import type {ContactContent} from "../../models/contact";
import {FiMail, FiPhone, FiMapPin} from "react-icons/fi";

export const MOCKED_CONTACT_CONTENT: ContactContent = {
    eyebrow: "GET IN TOUCH",
    title: "Contact Me",
    subtitle: "Have a project in mind or want to collaborate? Feel free to reach out!",
    items: [
        {
            id: "email",
            label: "Email",
            value: "yubraj2000yubraj@gmail.com",
            href: "mailto:yubraj2000yubraj@gmail.com",
            icon: FiMail,
        },
        {
            id: "phone",
            label: "Phone",
            value: "+91 6370119126",
            href: "tel:+916370119126",
            icon: FiPhone,
        },
        {
            id: "location",
            label: "Location",
            value: "Odisha, India",
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
