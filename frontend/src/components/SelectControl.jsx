export default function SelectControl({ label, value, options, onChange }) {
  return (
    <div className="select-control">
      <label>{label}</label>

      <select value={value} onChange={onChange}>
        {options.map((option) => {
          const isObject = typeof option === "object";

          return (
            <option
              key={isObject ? option.value : option}
              value={isObject ? option.value : option}
            >
              {isObject ? option.label : option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
