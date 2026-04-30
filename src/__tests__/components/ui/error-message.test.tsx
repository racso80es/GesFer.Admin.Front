import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "@/components/ui/error-message";

describe("ErrorMessage component", () => {
  it("renders the message correctly", () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("applies the custom className", () => {
    const { container } = render(<ErrorMessage message="Error" className="custom-error-class" />);
    expect(container.firstChild).toHaveClass("custom-error-class");
  });

  it("applies the data-testid", () => {
    render(<ErrorMessage message="Error" data-testid="error-msg-id" />);
    expect(screen.getByTestId("error-msg-id")).toBeInTheDocument();
  });
});