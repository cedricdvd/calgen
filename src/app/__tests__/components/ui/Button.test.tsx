import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Button from "@/app/components/ui/Button";

describe("Button", () => {
  test("Test renders button component", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  test("Test button onClick", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test("Test button disabled", () => {
    render(
      <Button onClick={() => {}} isDisabled>
        Click me
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
