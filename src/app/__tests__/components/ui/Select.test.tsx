import Select from "@/app/components/ui/Select";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Select", () => {
  it("renders a select element", () => {
    render(
      <Select
        options={["Option 1", "Option 2"]}
        selected={"Option 1"}
        setSelected={() => {}}
        disabledMessage={"Select a random option"}
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Select a random option");
    expect(options[1]).toHaveTextContent("Option 1");
    expect(options[2]).toHaveTextContent("Option 2");
  });

  it("calls setSelected when an option is selected", () => {
    const setSelected = jest.fn();

    render(
      <Select
        options={["Option 1", "Option 2"]}
        selected={"Option 1"}
        setSelected={setSelected}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Option 2" } });
    expect(setSelected).toHaveBeenCalledWith("Option 2");
  });
});
