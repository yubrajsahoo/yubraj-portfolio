import {CONTACT_CONTENT} from "../../../models";

/**
 * Contact details and introduction information.
 *
 * @author Yubraj Sahoo
 */
export const ContactInfo = () => {
    return (
        <div className="contact__info">
            <p className="section__eyebrow">{CONTACT_CONTENT.eyebrow}</p>
            <h2 className="section__title">{CONTACT_CONTENT.title}</h2>
            <span className="section__title-line" aria-hidden="true"/>
            <p className="contact__subtitle">{CONTACT_CONTENT.subtitle}</p>

            <div className="contact__items">
                {CONTACT_CONTENT.items.map((item) => {
                    const IconComponent = item.icon;
                    const content = (
                        <>
                            <div className="contact__item-icon-box">
                                <IconComponent size={20} aria-hidden="true"/>
                            </div>
                            <span className="contact__item-value">{item.value}</span>
                        </>
                    );

                    return item.href ? (
                        <a
                            key={item.id}
                            href={item.href}
                            className="contact__item"
                            aria-label={`${item.label}: ${item.value}`}
                        >
                            {content}
                        </a>
                    ) : (
                        <div key={item.id} className="contact__item">
                            {content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
