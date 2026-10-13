import type {IconType} from "react-icons";
import type {Skill} from "../../../models";
import {Icon} from "../../../components/ui";
import {ProgressBar} from "../../../components/ui";

interface SkillTypeProps {
    type: string;
    icon: IconType;
    skills: Skill[];
}

/**
 * Returns a CSS modifier class for the skill category.
 */
const getCategoryClass = (type: string): string => {
    const normalized = type.toLowerCase();
    if (normalized.includes("backend")) return "skill-type--backend";
    if (normalized.includes("frontend")) return "skill-type--frontend";
    if (normalized.includes("database")) return "skill-type--database";
    if (normalized.includes("devops")) return "skill-type--devops";
    return "";
};

/**
 * Displays a category of technical skills.
 *
 * @param type - The skill category.
 * @param icon - The React icon associated with the category.
 * @param skills - The skills belonging to the category.
 */
export const SkillType = ({
                              type,
                              icon,
                              skills,
                          }: SkillTypeProps) => {
    const categoryClass = getCategoryClass(type);

    return (
        <article className={`skill-type ${categoryClass}`}>
            <div className="skill-type__header">
                <div className="skill-type__title-group">
                    <div className="skill-type__icon-box">
                        <Icon
                            icon={icon}
                            size={22}
                            color="#548bf4"
                        />
                    </div>

                    <h3 className="skill-type__title">
                        {type}
                    </h3>
                </div>

                <span className="skill-type__badge">
                    {skills.length} {skills.length === 1 ? "Skill" : "Skills"}
                </span>
            </div>

            <div className="skill-type__list">
                {skills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                        <ProgressBar
                            label={skill.name}
                            value={skill.level}
                            showValue={true}
                        />
                    </div>
                ))}
            </div>
        </article>
    );
};
