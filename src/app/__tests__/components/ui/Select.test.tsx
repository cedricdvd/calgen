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
        handleSelected={() => {}}
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
    const setSelected = jest.fn((x) => x);

    const handleSelected = jest.fn((setValue, value) => setValue(value));

    render(
      <Select
        options={["Option 1", "Option 2"]}
        selected={"Option 1"}
        setSelected={setSelected}
        handleSelected={handleSelected}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Option 2" } });
    expect(handleSelected).toHaveBeenCalledWith(setSelected, "Option 2");
    expect(setSelected).toHaveBeenCalledWith("Option 2");
    expect(setSelected).toHaveReturnedWith("Option 2");
  });
});
