import type {Project} from "../../../models";
import {FaGithub, FaServer} from "react-icons/fa";
import {FiExternalLink, FiBookOpen} from "react-icons/fi";

interface ProjectCardProps {
    project: Project;
}

/**
 * Card component for displaying an individual company or personal project.
 *
 * @author Yubraj Sahoo
 */
export const ProjectCard = ({project}: ProjectCardProps) => {
    const getBadgeModifier = (badge: string) => {
        if (badge.includes("Released")) return "project-card__badge--success";
        if (badge.includes("Progress")) return "project-card__badge--warning";
        return "";
    };

    const hasLinks = Boolean(
        project.githubUrl || project.backendGithubUrl || project.docsUrl || project.liveUrl
    );

    return (
        <article className="project-card">
            <div className="project-card__image-container">
                <img
                    src={project.image}
                    alt={project.title}
                    className="project-card__image"
                    loading="lazy"
                />
                {project.badge && (
                    <span className={`project-card__badge ${getBadgeModifier(project.badge)}`.trim()}>
                        {project.badge}
                    </span>
                )}
            </div>

            <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>

                <div className="project-card__tags">
                    {project.tags.map((tag) => (
                        <span key={tag} className="project-card__tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="project-card__links">
                    {hasLinks ? (
                        <>
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card__icon-btn"
                                    aria-label={`${project.title} ${project.backendGithubUrl ? "Frontend " : ""}GitHub repository`}
                                    title={project.backendGithubUrl ? "Frontend Repository (GitHub)" : "GitHub Repository"}
                                >
                                    <FaGithub size={18} />
                                </a>
                            )}
                            {project.backendGithubUrl && (
                                <a
                                    href={project.backendGithubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card__icon-btn"
                                    aria-label={`${project.title} Backend API repository`}
                                    title="Backend API Repository (GitHub)"
                                >
                                    <FaServer size={17} />
                                </a>
                            )}
                            {project.docsUrl && (
                                <a
                                    href={project.docsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card__icon-btn"
                                    aria-label={`${project.title} documentation`}
                                    title="Documentation"
                                >
                                    <FiBookOpen size={18} />
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card__icon-btn"
                                    aria-label={`${project.title} website`}
                                    title="Live Website"
                                >
                                    <FiExternalLink size={18} />
                                </a>
                            )}
                        </>
                    ) : (
                        <span className="project-card__internal-tag">
                            Internal Company Project
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};
