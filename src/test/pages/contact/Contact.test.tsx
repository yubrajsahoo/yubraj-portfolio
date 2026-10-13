import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen} from "@testing-library/react";

const mockUseHealth = vi.fn();

vi.mock("../../../contexts/HealthContext.tsx", () => ({
    useHealth: () => mockUseHealth(),
}));

import {Contact} from "../../../pages/contact";
import {CONTACT_CONTENT} from "../../../models";

describe("Contact component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders nothing when backend is down (isBackendUp is false)", () => {
        mockUseHealth.mockReturnValue({
            isBackendUp: false,
            isInitialLoading: false,
        });

        const {container} = render(<Contact/>);

        expect(container.firstChild).toBeNull();
        expect(screen.queryByText(CONTACT_CONTENT.title)).not.toBeInTheDocument();
    });

    it("renders contact section when backend is up (isBackendUp is true)", () => {
        mockUseHealth.mockReturnValue({
            isBackendUp: true,
            isInitialLoading: false,
        });

        const {container} = render(<Contact/>);

        const section = container.querySelector("section#contact");
        expect(section).toBeInTheDocument();
        expect(screen.getByText(CONTACT_CONTENT.title)).toBeInTheDocument();
        expect(screen.getByText(CONTACT_CONTENT.eyebrow)).toBeInTheDocument();
        expect(screen.getByAltText("Contact illustration")).toBeInTheDocument();
    });
});
