import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Skills } from "../../../pages/skills";
import { TECHNICAL_EXPERTISE } from "../../models/skills.ts";

// Mock the react-icons to prevent errors in the test environment
vi.mock("react-icons/fa", async (importOriginal) => {
    const actual = await importOriginal<Record<string, unknown>>();
    return {
        ...actual,
        FaServer: () => <svg role="img" />,
        FaCode: () => <svg role="img" />,
    };
});

vi.mock("../models", () => ({
    TECHNICAL_EXPERTISE: {
        eyebrow: "MY SKILLS",
        title: "Technical Expertise",
        skillDetails: [
            {
                type: "Backend",
                icon: "FaServer",
                skills: [
                    { name: "Java", level: 90 },
                    { name: "Spring Boot", level: 88 },
                ],
            },
            {
                type: "Frontend",
                icon: "FaCode",
                skills: [
                    { name: "React", level: 80 },
                    { name: "JavaScript", level: 82 },
                ],
            },
        ],
    },
}));

describe("Skills", () => {
    it("renders the section with eyebrow and title", () => {
        render(<Skills />);
        expect(screen.getByText(TECHNICAL_EXPERTISE.eyebrow)).toBeInTheDocument();
        expect(screen.getByText(TECHNICAL_EXPERTISE.title)).toBeInTheDocument();
    });

    it("renders the correct number of skill types", () => {
        render(<Skills />);
        const skillTypes = screen.getAllByRole("article");
        expect(skillTypes).toHaveLength(TECHNICAL_EXPERTISE.skillDetails.length);
    });
});
