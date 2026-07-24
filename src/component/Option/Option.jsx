import "./Option.css";

function Option({ first, second, value, onChange }) {
  return (
    <div className="option-container">
      <div
        className={`option-item ${value == first.value ? "active" : ""}`}
        onClick={() => onChange(first.value)}
      >
        <span className="option-label">{first.label}</span>
        <div className="radio-circle">
          <div className="radio-inner"></div>
        </div>
      </div>

      <div
        className={`option-item ${value == second.value ? "active" : ""}`}
        onClick={() => onChange(second.value)}
      >
        <span className="option-label">{second.label}</span>
        <div className="radio-circle">
          <div className="radio-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default Option;