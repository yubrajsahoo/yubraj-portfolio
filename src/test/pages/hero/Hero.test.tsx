import {beforeEach, describe, expect, test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// MUST come before Hero import
vi.mock("../../../api/v1/services/resume", () => ({
    downloadResume: vi.fn(),
}));
vi.mock("../../../contexts/HealthContext", () => ({
    useHealth: () => ({ isBackendUp: true, isInitialLoading: false }),
}));

import {Hero} from "../../../pages/hero";
import {downloadResume} from "../../../api/v1/services/resume";
import {APP_INFO} from "../../../models";

describe("Hero", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 'UP' }),
        }) as unknown as typeof fetch;
    });

    test("renders hero content", () => {
        render(<Hero/>);

        expect(
            screen.getByText(APP_INFO.personal.name)
        ).toBeInTheDocument();
    });

    test("renders avatar", () => {
        render(<Hero/>);

        expect(
            screen.getByAltText("Avatar")
        ).toBeInTheDocument();
    });

    test("renders technologies heading", () => {
        render(<Hero/>);

        expect(
            screen.getByText("Technologies I work with")
        ).toBeInTheDocument();
    });

    test("renders download resume button", async () => {
        render(<Hero/>);

        expect(
            await screen.findByRole("button", {
                name: /download resume/i,
            })
        ).toBeInTheDocument();
    });

    test("calls downloadResume when clicked", async () => {
        const user = userEvent.setup();

        render(<Hero/>);

        const button = await screen.findByRole("button", {
            name: /download resume/i,
        });

        await user.click(button);

        expect(downloadResume).toHaveBeenCalledTimes(1);
    });

    test("renders contact me button when backend is up", () => {
        render(<Hero/>);

        expect(
            screen.getByRole("link", {
                name: /contact me/i,
            })
        ).toBeInTheDocument();
    });

    test("renders hero section", () => {
        const {container} = render(<Hero/>);

        expect(
            container.querySelector("section")
        ).toBeInTheDocument();
    });
});
