import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {ContactInfo} from "../../../pages/contact/components/ContactInfo.tsx";
import {CONTACT_CONTENT} from "../../../models";

describe("ContactInfo component", () => {
    it("renders eyebrow, title, and subtitle", () => {
        render(<ContactInfo/>);

        expect(screen.getByText(CONTACT_CONTENT.eyebrow)).toBeInTheDocument();
        expect(screen.getByText(CONTACT_CONTENT.title)).toBeInTheDocument();
        expect(screen.getByText(CONTACT_CONTENT.subtitle)).toBeInTheDocument();
    });

    it("renders each contact detail with appropriate values and links", () => {
        render(<ContactInfo/>);

        CONTACT_CONTENT.items.forEach((item) => {
            expect(screen.getByText(item.value)).toBeInTheDocument();
            if (item.href) {
                const link = screen.getByRole("link", {
                    name: `${item.label}: ${item.value}`,
                });
                expect(link).toHaveAttribute("href", item.href);
            }
        });
    });
});
