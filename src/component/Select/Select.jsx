import "./Select.css";

function Select({ label, value, onChange, options, className = "" }) {
  return (
    <div className="select-group">
      {label && <label>{label}</label>}
      <select
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Select;
