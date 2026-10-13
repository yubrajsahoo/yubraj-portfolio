import {describe, expect, test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let mockBackendUp = true;

vi.mock("../../../../contexts/HealthContext", () => ({
    useHealth: () => ({ isBackendUp: mockBackendUp, isInitialLoading: false }),
}));

import MobileNav from "../../../../components/layout/Navbar/MobileNav.tsx";
import {MOCKED_NAV_LINKS} from "../../../models/navbar.ts";

describe("MobileNav", () => {
    test("does not render contact link and hire me when backend is down", () => {
        mockBackendUp = false;
        render(<MobileNav/>);

        expect(screen.queryByText("Contact")).not.toBeInTheDocument();
        expect(screen.queryByRole("link", {name: /hire me/i})).not.toBeInTheDocument();
        mockBackendUp = true;
    });

    test("renders logo", () => {
        render(<MobileNav/>);

        expect(screen.getByRole("link", {name: /logo/i}))
            .toBeInTheDocument();
    });

    test("renders hamburger icon initially", () => {
        const {container} = render(<MobileNav/>);

        expect(
            container.querySelector(".hamburger")
        ).toBeInTheDocument();
    });

    test("menu is closed initially", () => {
        const {container} = render(<MobileNav/>);

        expect(
            container.querySelector(".mobile-nav-links")
        ).not.toHaveClass("open");
    });

    test("opens menu when hamburger is clicked", async () => {
        const user = userEvent.setup();

        const {container} = render(<MobileNav/>);

        await user.click(
            container.querySelector(".hamburger")!
        );

        expect(
            container.querySelector(".mobile-nav-links")
        ).toHaveClass("open");
    });

    test("renders all navigation links", () => {
        render(<MobileNav/>);

        MOCKED_NAV_LINKS.forEach((item) => {
            expect(
                screen.getByText(item.label)
            ).toBeInTheDocument();
        });
    });

    test("renders the Experience link with its section target", () => {
        render(<MobileNav/>);

        expect(screen.getByRole("link", {name: "Experience"}))
            .toHaveAttribute("href", "#experience");
    });

    test("clicking navigation link closes menu", async () => {
        const user = userEvent.setup();

        const {container} = render(<MobileNav/>);

        // Open menu
        await user.click(
            container.querySelector(".hamburger")!
        );

        // Click first nav link
        await user.click(
            screen.getByText(MOCKED_NAV_LINKS[0].label)
        );

        expect(
            container.querySelector(".mobile-nav-links")
        ).not.toHaveClass("open");
    });

    test("clicked navigation link becomes active", async () => {
        const user = userEvent.setup();

        render(<MobileNav/>);

        const link = screen.getByText(MOCKED_NAV_LINKS[1].label);

        await user.click(link);

        expect(link).toHaveClass("active");
    });

    test("renders Hire Me button", () => {
        render(<MobileNav/>);

        expect(
            screen.getByRole("link", {
                name: /hire me/i,
            })
        ).toBeInTheDocument();
    });

    test("clicking Hire Me closes menu", async () => {
        const user = userEvent.setup();

        const {container} = render(<MobileNav/>);

        await user.click(
            container.querySelector(".hamburger")!
        );

        await user.click(
            screen.getByRole("link", {
                name: /hire me/i,
            })
        );

        expect(
            container.querySelector(".mobile-nav-links")
        ).not.toHaveClass("open");
    });

    test("clicking logo keeps home active", async () => {
        const user = userEvent.setup();

        render(<MobileNav/>);

        await user.click(
            screen.getByRole("link", {
                name: /logo/i,
            })
        );

        expect(
            screen.getByText(MOCKED_NAV_LINKS[0].label)
        ).toHaveClass("active");
    });
});
