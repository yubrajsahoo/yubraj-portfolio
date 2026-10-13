import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";
import {Projects} from "../../../pages/projects";
import {PROJECTS_CONTENT} from "../../../models";

describe("Projects", () => {
    it("renders the projects section with id, eyebrow, and title", () => {
        const {container} = render(<Projects/>);

        const section = container.querySelector("#projects");
        expect(section).toBeInTheDocument();
        expect(section).toHaveClass("main_section", "projects-section");

        expect(screen.getByText(PROJECTS_CONTENT.eyebrow)).toBeInTheDocument();
        expect(screen.getByText(PROJECTS_CONTENT.title)).toBeInTheDocument();
    });

    it("renders SMF4J with highest priority (first project card)", () => {
        render(<Projects/>);

        const titles = screen.getAllByRole("heading", {level: 3});
        expect(titles[0]).toHaveTextContent("SMF4J");
    });

    it("renders the View All Projects link", () => {
        render(<Projects/>);

        const viewAllLink = screen.getByRole("link", {
            name: PROJECTS_CONTENT.viewAllText,
        });
        expect(viewAllLink).toBeInTheDocument();
        expect(viewAllLink).toHaveAttribute("href", PROJECTS_CONTENT.viewAllHref);
        expect(viewAllLink).toHaveAttribute("target", "_blank");
    });

    it("renders all projects by default and filters by category", () => {
        render(<Projects/>);

        // All projects should be visible initially
        expect(screen.getByText("SMF4J")).toBeInTheDocument();
        expect(screen.getByText("NotesGenAi")).toBeInTheDocument();
        expect(screen.getByText("Portfolio & API")).toBeInTheDocument();
        expect(screen.getByText("AI Commission Rules")).toBeInTheDocument();
        expect(screen.getByText("Indian Eagle")).toBeInTheDocument();
        expect(screen.getByText("iGaruda Command Center")).toBeInTheDocument();
        expect(screen.getByText("iEagle")).toBeInTheDocument();

        // Click Company Projects filter
        const companyFilterBtn = screen.getByRole("button", {name: /company projects/i});
        fireEvent.click(companyFilterBtn);

        expect(screen.getByText("AI Commission Rules")).toBeInTheDocument();
        expect(screen.getByText("Indian Eagle")).toBeInTheDocument();
        expect(screen.getByText("iGaruda Command Center")).toBeInTheDocument();
        expect(screen.getByText("iEagle")).toBeInTheDocument();
        expect(screen.queryByText("SMF4J")).not.toBeInTheDocument();
        expect(screen.queryByText("NotesGenAi")).not.toBeInTheDocument();
        expect(screen.queryByText("Portfolio & API")).not.toBeInTheDocument();

        // Click Personal Projects filter
        const personalFilterBtn = screen.getByRole("button", {name: /personal projects/i});
        fireEvent.click(personalFilterBtn);

        expect(screen.getByText("SMF4J")).toBeInTheDocument();
        expect(screen.getByText("NotesGenAi")).toBeInTheDocument();
        expect(screen.getByText("Portfolio & API")).toBeInTheDocument();
        expect(screen.queryByText("AI Commission Rules")).not.toBeInTheDocument();
        expect(screen.queryByText("Indian Eagle")).not.toBeInTheDocument();
    });

    it("renders navigation buttons and handles scroll clicks", () => {
        render(<Projects/>);

        const prevBtn = screen.getByRole("button", {name: /previous projects/i});
        const nextBtn = screen.getByRole("button", {name: /next projects/i});

        expect(prevBtn).toBeInTheDocument();
        expect(nextBtn).toBeInTheDocument();

        const track = document.querySelector(".projects__track");
        expect(track).toBeInTheDocument();

        const scrollByMock = vi.fn();
        if (track) {
            track.scrollBy = scrollByMock;
        }

        fireEvent.click(prevBtn);
        expect(scrollByMock).toHaveBeenCalledWith({left: -320, behavior: "smooth"});

        fireEvent.click(nextBtn);
        expect(scrollByMock).toHaveBeenCalledWith({left: 320, behavior: "smooth"});
    });
});
