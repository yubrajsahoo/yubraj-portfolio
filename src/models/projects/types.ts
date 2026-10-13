/**
 * Category classification for portfolio projects.
 */
export type ProjectCategory = "company" | "personal";

/**
 * Represents a single project item to display in the projects showcase.
 *
 * @author Yubraj Sahoo
 */
export interface Project {
    /** Unique identifier for the project */
    id: string;

    /** Display title of the project */
    title: string;

    /** Category (company or personal) */
    category: ProjectCategory;

    /** Brief description of the project */
    description: string;

    /** URL or local path to project thumbnail image */
    image: string;

    /** Array of technology tags / badges used in the project */
    tags: string[];

    /** Optional status or release badge (e.g., "v0.0.1 Released", "In Progress", "Full Stack", "Enterprise OTA") */
    badge?: string;

    /** Optional link to GitHub repository (Frontend / Main) */
    githubUrl?: string;

    /** Optional link to backend / API GitHub repository */
    backendGithubUrl?: string;

    /** Optional link to live demo / company website */
    liveUrl?: string;

    /** Optional link to documentation or maven repository */
    docsUrl?: string;
}

/**
 * Content definition for the Projects page/section.
 *
 * @author Yubraj Sahoo
 */
export interface ProjectsContent {
    /** Eyebrow label, e.g. "PROJECTS" */
    eyebrow: string;

    /** Section heading, e.g. "Featured Projects" */
    title: string;

    /** Label for the View All Projects button */
    viewAllText: string;

    /** URL for the View All Projects link */
    viewAllHref: string;

    /** List of projects to display */
    projects: Project[];
}
