import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Footer} from "../../../../components/layout/Footer";
import {APP_INFO, FOOTER_CONTENT, NAV_LINKS} from "../../../../models";

describe("Footer component", () => {
    it("renders brand logo, name, and role", () => {
        render(<Footer/>);

        const logoImg = screen.getByAltText("Logo");
        expect(logoImg).toBeInTheDocument();
        expect(logoImg).toHaveAttribute("src", APP_INFO.application.logo);

        const brandText = screen.getByText(APP_INFO.personal.name);
        expect(brandText).toBeInTheDocument();

        const role = screen.getByText(APP_INFO.professional.role);
        expect(role).toBeInTheDocument();
    });

    it("renders quick navigation links", () => {
        render(<Footer/>);

        expect(screen.getByText(FOOTER_CONTENT.quickLinksHeading)).toBeInTheDocument();

        NAV_LINKS.forEach((link) => {
            const navLink = screen.getByRole("link", {name: link.label});
            expect(navLink).toBeInTheDocument();
            expect(navLink).toHaveAttribute("href", link.href);
        });
    });

    it("renders connect section and social buttons with proper attributes", () => {
        render(<Footer/>);

        expect(screen.getByText(FOOTER_CONTENT.connectHeading)).toBeInTheDocument();

        FOOTER_CONTENT.socialLinks.forEach((social) => {
            const socialBtn = screen.getByRole("link", {name: social.label});
            expect(socialBtn).toBeInTheDocument();
            expect(socialBtn).toHaveAttribute("href", social.href);

            if (social.href.startsWith("http")) {
                expect(socialBtn).toHaveAttribute("target", "_blank");
                expect(socialBtn).toHaveAttribute("rel", "noopener noreferrer");
            }
        });
    });

    it("renders copyright and made-with text", () => {
        render(<Footer/>);

        expect(screen.getByText(APP_INFO.application.copyright)).toBeInTheDocument();
        expect(screen.getByText(FOOTER_CONTENT.madeWithText)).toBeInTheDocument();
    });

    it("renders footer element with app-footer class", () => {
        const {container} = render(<Footer/>);
        expect(container.querySelector("footer")).toHaveClass("app-footer");
    });
});
