interface SelectProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
  handleSelected: (setSelected: (value: string) => void, value: string) => void;
  disabledMessage?: string;
  ariaLabel?: string;
}

function Select({
  options,
  selected,
  setSelected,
  handleSelected,
  disabledMessage,
  ariaLabel,
}: SelectProps) {
  return (
    <select
      aria-label={ariaLabel || ""}
      value={selected}
      onChange={(e) => handleSelected(setSelected, e.target.value)}
    >
      <option value="" disabled>
        {disabledMessage || "Select an option"}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
