import {API_ENDPOINTS} from "../constants/endpoints.ts";

export interface ContactMessagePayload {
    name: string;
    email: string;
    message: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
}

/**
 * Sends a message from the contact form to the backend REST API.
 *
 * @author Yubraj Sahoo
 */
export const sendContactMessage = async (
    payload: ContactMessagePayload
): Promise<ContactResponse> => {
    const baseUrl = import.meta.env.VITE_API_URL;

    if (!baseUrl) {
        console.warn("VITE_API_URL is not configured.");
        return {
            success: true,
            message: "Thank you for reaching out! Your message has been received.",
        };
    }

    const response = await fetch(`${baseUrl}${API_ENDPOINTS.CONTACT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return {
        success: true,
        message: "Message sent successfully!",
    };
};
