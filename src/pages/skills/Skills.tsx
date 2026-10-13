import {useState} from "react";
import {TECHNICAL_EXPERTISE} from "../../models";
import {SkillType} from "./components/SkillType.tsx";
import {FaBolt, FaShieldAlt, FaCodeBranch, FaCloud} from "react-icons/fa";
import "./Skills.css";

const HIGHLIGHTS = [
    {
        icon: FaBolt,
        label: "Architecture",
        detail: "Microservices & Distributed Systems",
    },
    {
        icon: FaShieldAlt,
        label: "Security",
        detail: "Spring Security, JWT & OAuth2",
    },
    {
        icon: FaCodeBranch,
        label: "APIs & Data",
        detail: "RESTful, SOAP, JPA & Redis Caching",
    },
    {
        icon: FaCloud,
        label: "DevOps",
        detail: "Docker Containers, AWS & CI/CD",
    },
];

export const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = ["all", ...TECHNICAL_EXPERTISE.skillDetails.map((s) => s.type)];

    const filteredSkillDetails = selectedCategory === "all"
        ? TECHNICAL_EXPERTISE.skillDetails
        : TECHNICAL_EXPERTISE.skillDetails.filter((s) => s.type === selectedCategory);

    return (
        <section id="skills" className="main_section skills-section">
            <div className="skills__header">
                <div>
                    <p className="section__eyebrow">
                        {TECHNICAL_EXPERTISE.eyebrow}
                    </p>

                    <h2 className="section__title">
                        {TECHNICAL_EXPERTISE.title}
                    </h2>

                    <span
                        className="section__title-line"
                        aria-hidden="true"
                    />
                </div>

                <div className="skills__filters-bar" role="tablist" aria-label="Skill categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            role="tab"
                            aria-selected={selectedCategory === category}
                            className={`skills__filter-btn ${selectedCategory === category ? "active" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === "all" ? "All Skills" : category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="skills__grid">
                {filteredSkillDetails.map((skillType) => (
                    <SkillType
                        key={skillType.type}
                        type={skillType.type}
                        icon={skillType.icon}
                        skills={skillType.skills}
                    />
                ))}
            </div>

            <div className="skills__highlights-wrapper">
                <div className="skills__highlights-grid">
                    {HIGHLIGHTS.map(({icon: IconComponent, label, detail}) => (
                        <div key={label} className="skills__highlight-card">
                            <div className="skills__highlight-icon">
                                <IconComponent aria-hidden="true" />
                            </div>
                            <div className="skills__highlight-text">
                                <span className="skills__highlight-label">{label}</span>
                                <span className="skills__highlight-detail">{detail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
