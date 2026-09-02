import { useRef } from "react";
import Input from "../Input/Input";
import "./Otpinput.css";
function Otpinput({ value, onChange }) {
  const inputRefs = useRef([]);
  const length = 5;
  const otpArray = Array.from({ length }, (_, i) => value[i] || "");
  const handleChange = (digit, index) => {
    if (!/^\d?$/.test(digit)) return;
    const newOtp = [...otpArray];
    newOtp[index] = digit;
    onChange(newOtp.join(""));
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpArray[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otpcontainor">
      {otpArray.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          className="otpinput"
          groupClassName="otp-input-group"
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}

export default Otpinput;
