import {describe, test, expect, beforeEach, vi} from "vitest";
import {
    render,
    screen,
    fireEvent,
    act,
    waitFor,
} from "@testing-library/react";

let mockBackendUp = true;

vi.mock("../../../../contexts/HealthContext", () => ({
    useHealth: () => ({ isBackendUp: mockBackendUp, isInitialLoading: false }),
}));

import {Navbar} from "../../../../components/layout/Navbar";
import {MOCKED_NAV_LINKS} from "../../../models/navbar";

describe("Navbar", () => {
    beforeEach(() => {
        mockBackendUp = true;
        act(() => {
            window.innerWidth = 1024;
            window.dispatchEvent(new Event("resize"));
        });
    });

    test("does not render contact nav link when backend is down", () => {
        mockBackendUp = false;
        render(<Navbar/>);

        expect(screen.queryByRole("link", {name: "Contact"})).not.toBeInTheDocument();
        expect(screen.queryByText("Hire Me")).not.toBeInTheDocument();
    });

    test("renders desktop navbar", () => {
        render(<Navbar/>);

        expect(screen.getByText("Hire Me")).toBeInTheDocument();

        MOCKED_NAV_LINKS.forEach((item) => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });
    });

    test("renders logo", () => {
        render(<Navbar/>);

        expect(screen.getByAltText("Logo")).toBeInTheDocument();
    });

    test("renders hire me button", () => {
        render(<Navbar/>);

        expect(
            screen.getByRole("link", {
                name: /hire me/i,
            })
        ).toBeInTheDocument();
    });

    test("renders the Experience link with its section target", () => {
        render(<Navbar/>);

        expect(screen.getByRole("link", {name: "Experience"}))
            .toHaveAttribute("href", "#experience");
    });

    test("marks clicked nav item as active", () => {
        render(<Navbar/>);

        const about = screen.getByText(MOCKED_NAV_LINKS[1].label);

        fireEvent.click(about);

        expect(about).toHaveClass("active");
    });

    test("renders mobile navigation on small screen", () => {
        act(() => {
            window.innerWidth = 500;
        });

        render(<Navbar/>);

        expect(document.querySelector(".mobile-nav")).toBeInTheDocument();
    });

    test("switches from desktop to mobile on resize", async () => {
        render(<Navbar/>);

        expect(screen.getByText("Hire Me")).toBeInTheDocument();

        act(() => {
            window.innerWidth = 500;
            window.dispatchEvent(new Event("resize"));
        });

        await waitFor(() => {
            expect(document.querySelector(".mobile-nav")).toBeInTheDocument();
        });
    });

    test("renders nav element", () => {
        render(<Navbar/>);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
});
