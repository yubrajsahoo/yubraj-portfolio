import {describe, expect, test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {MOCKED_APP_INFO} from "../../../models/app.ts";

// Mock the data module before importing Logo
vi.mock("../../../../models", async (importOriginal) => {
    const actual = await importOriginal<Record<string, unknown>>();
    return {
        ...actual,
        APP_INFO: MOCKED_APP_INFO,
    };
});

import {Logo} from "../../../../components/layout/Navbar/Logo";

describe("Logo", () => {
    test("renders the logo image", () => {
        render(<Logo/>);

        const image = screen.getByAltText("Logo");

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", MOCKED_APP_INFO.application.logo);
    });

    test("renders the application name", () => {
        render(<Logo/>);

        expect(
            screen.getByText(MOCKED_APP_INFO.personal.name)
        ).toBeInTheDocument();
    });

    test("renders a link", () => {
        render(<Logo/>);

        const link = screen.getByRole("link");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "#home");
    });

    test("calls onClick when clicked", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Logo onClick={handleClick}/>);

        await user.click(screen.getByRole("link"));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("renders image with correct dimensions", () => {
        render(<Logo/>);

        const image = screen.getByAltText("Logo");

        expect(image).toHaveAttribute("width", "50");
        expect(image).toHaveAttribute("height", "40");
    });

    test("has navbar-brand class", () => {
        render(<Logo/>);

        expect(screen.getByRole("link"))
            .toHaveClass("navbar-brand");
    });

    test("has logo class", () => {
        render(<Logo/>);

        expect(screen.getByRole("link"))
            .toHaveClass("logo");
    });
});
