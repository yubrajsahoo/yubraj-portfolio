import {useState, type FormEvent} from "react";
import {FiSend} from "react-icons/fi";
import {CONTACT_CONTENT} from "../../../models";
import {sendContactMessage} from "../../../api/v1/services/contact.ts";

/**
 * Interactive contact message form with backend API integration.
 *
 * @author Yubraj Sahoo
 */
export const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{type: "success" | "error"; text: string} | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await sendContactMessage({name, email, message});
            setStatus({
                type: "success",
                text: res.message || "Thank you for reaching out! Your message has been sent.",
            });
            setName("");
            setEmail("");
            setMessage("");
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong. Please try again later.";
            setStatus({
                type: "error",
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact__form-wrapper">
            {status && (
                <div
                    className={`contact__alert contact__alert--${status.type}`}
                    role="alert"
                >
                    {status.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="contact__form">
                <div>
                    <label htmlFor="contact-name" className="visually-hidden">
                        Name
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        required
                        className="contact__input"
                        placeholder={CONTACT_CONTENT.form.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="contact-email" className="visually-hidden">
                        Email
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        required
                        className="contact__input"
                        placeholder={CONTACT_CONTENT.form.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="contact-message" className="visually-hidden">
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        required
                        rows={4}
                        className="contact__textarea"
                        placeholder={CONTACT_CONTENT.form.messagePlaceholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="contact__submit-btn"
                    disabled={loading}
                >
                    <FiSend size={18} aria-hidden="true"/>
                    <span>{loading ? "Sending..." : CONTACT_CONTENT.form.submitButtonText}</span>
                </button>
            </form>
        </div>
    );
};
