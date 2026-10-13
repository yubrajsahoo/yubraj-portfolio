import {ContactInfo} from "./components/ContactInfo.tsx";
import {ContactForm} from "./components/ContactForm.tsx";
import contactIllustration from "../../assets/images/contact-illustration.png";
import {useHealth} from "../../contexts/HealthContext.tsx";
import "./Contact.css";

/**
 * Contact section component.
 * Rendered conditionally when the backend service is active.
 *
 * @author Yubraj Sahoo
 */
export const Contact = () => {
    const {isBackendUp} = useHealth();

    if (!isBackendUp) {
        return null;
    }

    return (
        <section id="contact" className="main_section contact-section">
            <div className="row g-4 g-lg-5 align-items-center">
                <div className="col-lg-5">
                    <ContactInfo/>
                </div>

                <div className="col-lg-4">
                    <ContactForm/>
                </div>

                <div className="col-lg-3 d-none d-lg-flex justify-content-center">
                    <div className="contact__illustration-container">
                        <img
                            src={contactIllustration}
                            alt="Contact illustration"
                            className="contact__illustration"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
