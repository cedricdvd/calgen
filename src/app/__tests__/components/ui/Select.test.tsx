import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Select from "@/app/components/ui/Select";

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

  it("calls setSelected when an option is selected", async () => {
    const setSelected = jest.fn((x) => x);
    const handleSelected = jest.fn((setValue, value) => setValue(value));
    const user = userEvent.setup();

    render(
      <Select
        options={["Option 1", "Option 2"]}
        selected={"Option 1"}
        setSelected={setSelected}
        handleSelected={handleSelected}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "Option 2");
    expect(handleSelected).toHaveBeenCalledWith(setSelected, "Option 2");
    expect(setSelected).toHaveBeenCalledWith("Option 2");
    expect(setSelected).toHaveReturnedWith("Option 2");
  });
});
