import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockSendContactMessage = vi.fn();

vi.mock("../../../api/v1/services/contact.ts", () => ({
    sendContactMessage: (data: unknown) => mockSendContactMessage(data),
}));

import {ContactForm} from "../../../pages/contact/components/ContactForm.tsx";
import {CONTACT_CONTENT} from "../../../models";

describe("ContactForm component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders name, email, message inputs and submit button", () => {
        render(<ContactForm/>);

        expect(screen.getByPlaceholderText(CONTACT_CONTENT.form.namePlaceholder)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(CONTACT_CONTENT.form.emailPlaceholder)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(CONTACT_CONTENT.form.messagePlaceholder)).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: new RegExp(CONTACT_CONTENT.form.submitButtonText, "i")})
        ).toBeInTheDocument();
    });

    it("submits the form and displays success alert on success", async () => {
        const user = userEvent.setup();
        mockSendContactMessage.mockResolvedValueOnce({
            status: "SUCCESS",
            message: "Message received successfully!",
        });

        render(<ContactForm/>);

        const nameInput = screen.getByPlaceholderText(CONTACT_CONTENT.form.namePlaceholder);
        const emailInput = screen.getByPlaceholderText(CONTACT_CONTENT.form.emailPlaceholder);
        const messageInput = screen.getByPlaceholderText(CONTACT_CONTENT.form.messagePlaceholder);
        const submitButton = screen.getByRole("button", {
            name: new RegExp(CONTACT_CONTENT.form.submitButtonText, "i"),
        });

        await user.type(nameInput, "John Doe");
        await user.type(emailInput, "john@example.com");
        await user.type(messageInput, "Hello, looking forward to discussing a project!");

        await user.click(submitButton);

        expect(mockSendContactMessage).toHaveBeenCalledTimes(1);
        expect(mockSendContactMessage).toHaveBeenCalledWith({
            name: "John Doe",
            email: "john@example.com",
            message: "Hello, looking forward to discussing a project!",
        });

        await waitFor(() => {
            expect(screen.getByRole("alert")).toHaveTextContent("Message received successfully!");
        });

        expect(nameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
        expect(messageInput).toHaveValue("");
    }, 15000);

    it("displays error alert when submit fails", async () => {
        const user = userEvent.setup();
        mockSendContactMessage.mockRejectedValueOnce(new Error("Network connection error"));

        render(<ContactForm/>);

        const nameInput = screen.getByPlaceholderText(CONTACT_CONTENT.form.namePlaceholder);
        const emailInput = screen.getByPlaceholderText(CONTACT_CONTENT.form.emailPlaceholder);
        const messageInput = screen.getByPlaceholderText(CONTACT_CONTENT.form.messagePlaceholder);
        const submitButton = screen.getByRole("button", {
            name: new RegExp(CONTACT_CONTENT.form.submitButtonText, "i"),
        });

        await user.type(nameInput, "Jane Doe");
        await user.type(emailInput, "jane@example.com");
        await user.type(messageInput, "Checking error handling.");

        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByRole("alert")).toHaveTextContent("Network connection error");
        });
    }, 15000);
});
