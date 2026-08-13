import { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(
  (
    {
      type,
      name,
      placeholder,
      value,
      onChange,
      className = "",
      groupClassName = "",
      inputMode,
      maxLength,
      onKeyDown,
      label,
      rows,
      id,
    },
    ref,
  ) => {
    return (
      <div className={`input-group${groupClassName}`.trim()}>
        {label && <label className="input-label">{label}</label>}
        {type === "textarea" ? (
          <textarea
            ref={ref}
            className={`input textarea-input ${className}`}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            rows={rows}
          />
        ) : (
          <input
            ref={ref}
            className={`input ${className}`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            inputMode={inputMode}
            maxLength={maxLength}
          />
        )}
      </div>
    );
  },
);

export default Input;
