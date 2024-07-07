interface SelectProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
  disabledMessage?: string;
}

function Select({
  options,
  selected,
  setSelected,
  disabledMessage,
}: SelectProps) {
  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
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
