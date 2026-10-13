import {useRef, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {PROJECTS_CONTENT, type ProjectCategory} from "../../models";
import {ProjectCard} from "./components/ProjectCard";
import "./Projects.css";

/**
 * Projects section for displaying portfolio projects with category filtering and horizontal navigation.
 *
 * @author Yubraj Sahoo
 */
export const Projects = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState<ProjectCategory | "all">("all");

    const filteredProjects = PROJECTS_CONTENT.projects.filter((project) => {
        if (filter === "all") return true;
        return project.category === filter;
    });

    const handlePrev = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({left: -320, behavior: "smooth"});
        }
    };

    const handleNext = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({left: 320, behavior: "smooth"});
        }
    };

    return (
        <section id="projects" className="main_section projects-section">
            <div className="projects__header">
                <div>
                    <p className="section__eyebrow">{PROJECTS_CONTENT.eyebrow}</p>
                    <h2 className="section__title">{PROJECTS_CONTENT.title}</h2>
                    <span className="section__title-line" aria-hidden="true"/>
                </div>

                <div className="projects__actions">
                    <a
                        href={PROJECTS_CONTENT.viewAllHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__view-all-btn"
                    >
                        {PROJECTS_CONTENT.viewAllText}
                    </a>
                    <div className="projects__nav-buttons">
                        <button
                            type="button"
                            className="projects__nav-btn"
                            onClick={handlePrev}
                            aria-label="Previous projects"
                        >
                            <FiChevronLeft size={18}/>
                        </button>
                        <button
                            type="button"
                            className="projects__nav-btn"
                            onClick={handleNext}
                            aria-label="Next projects"
                        >
                            <FiChevronRight size={18}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="projects__filters-bar mb-4">
                <button
                    type="button"
                    className={`projects__filter-btn ${filter === "all" ? "active" : ""}`}
                    onClick={() => setFilter("all")}
                >
                    All ({PROJECTS_CONTENT.projects.length})
                </button>
                <button
                    type="button"
                    className={`projects__filter-btn ${filter === "company" ? "active" : ""}`}
                    onClick={() => setFilter("company")}
                >
                    Company Projects (
                    {PROJECTS_CONTENT.projects.filter((p) => p.category === "company").length}
                    )
                </button>
                <button
                    type="button"
                    className={`projects__filter-btn ${filter === "personal" ? "active" : ""}`}
                    onClick={() => setFilter("personal")}
                >
                    Personal Projects (
                    {PROJECTS_CONTENT.projects.filter((p) => p.category === "personal").length}
                    )
                </button>
            </div>

            <div className="projects__carousel-wrapper">
                <div className="projects__track" ref={trackRef}>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>
            </div>
        </section>
    );
};
