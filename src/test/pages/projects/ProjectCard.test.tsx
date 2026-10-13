import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {ProjectCard} from "../../../pages/projects/components/ProjectCard";
import {MOCKED_PROJECTS_CONTENT} from "../../models/projects";

describe("ProjectCard", () => {
    const smf4jProject = MOCKED_PROJECTS_CONTENT.projects[0]; // SMF4J (personal with links)
    const portfolioProject = MOCKED_PROJECTS_CONTENT.projects[2]; // Portfolio & API (frontend + backend repo + live)
    const companyProject = MOCKED_PROJECTS_CONTENT.projects[3]; // AI Commission Rules (company, no URL)

    it("renders project title, description, badge, and image", () => {
        render(<ProjectCard project={smf4jProject}/>);

        expect(screen.getByText(smf4jProject.title)).toBeInTheDocument();
        expect(screen.getByText(smf4jProject.description)).toBeInTheDocument();
        expect(screen.getByText(smf4jProject.badge!)).toBeInTheDocument();

        const img = screen.getByRole("img", {name: smf4jProject.title});
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", smf4jProject.image);
    });

    it("renders all technology tags", () => {
        render(<ProjectCard project={companyProject}/>);

        companyProject.tags.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    it("renders GitHub link when provided", () => {
        render(<ProjectCard project={smf4jProject}/>);

        const githubLink = screen.getByRole("link", {
            name: `${smf4jProject.title} GitHub repository`,
        });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute("href", smf4jProject.githubUrl);
        expect(githubLink).toHaveAttribute("target", "_blank");
    });

    it("renders both frontend and backend API GitHub links for portfolio", () => {
        render(<ProjectCard project={portfolioProject}/>);

        const frontendLink = screen.getByRole("link", {
            name: `${portfolioProject.title} Frontend GitHub repository`,
        });
        expect(frontendLink).toBeInTheDocument();
        expect(frontendLink).toHaveAttribute("href", portfolioProject.githubUrl);

        const backendLink = screen.getByRole("link", {
            name: `${portfolioProject.title} Backend API repository`,
        });
        expect(backendLink).toBeInTheDocument();
        expect(backendLink).toHaveAttribute("href", portfolioProject.backendGithubUrl);
    });

    it("renders website/artifact link for projects with liveUrl", () => {
        render(<ProjectCard project={portfolioProject}/>);

        const websiteLink = screen.getByRole("link", {
            name: `${portfolioProject.title} website`,
        });
        expect(websiteLink).toBeInTheDocument();
        expect(websiteLink).toHaveAttribute("href", portfolioProject.liveUrl);
        expect(websiteLink).toHaveAttribute("target", "_blank");
    });

    it("does not render external links for company projects without URLs", () => {
        render(<ProjectCard project={companyProject}/>);

        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        expect(screen.getByText("Internal Company Project")).toBeInTheDocument();
    });
});
