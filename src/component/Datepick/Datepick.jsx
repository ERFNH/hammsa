import React, { useState, useRef, useEffect } from "react";
import { PersianDatePicker } from "persian-date-kit";
import "persian-date-kit/styles.css";
import "./Datepick.css";
import Date from "../../assets/icons/Date.svg?react";
function Datepick({
  label,
  value,
  onChange,
  placeholder = "۱۴۰۵/۰۱/۰۱",
  disabledDates,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const formatPersianDate = (date) => {
    if (!date) return "";
    try {
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
    } catch {
      return "";
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="datepicker-group" ref={wrapperRef}>
      {label && <label className="datepicker-label">{label}</label>}
      <div className="datepicker-wrapper">
        <div className="datepicker-input-wrapper">
          <span  className="calendar-icon" onClick={() => setIsOpen(!isOpen)}>
            
            <Date />
          </span>
          <input
            type="text"
            className="datepicker-input"
            value={formatPersianDate(value)}
            placeholder={placeholder}
            readOnly
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div className="datepicker-popover">
            <PersianDatePicker
              value={value}
              onChange={(newDate) => {
                onChange(newDate);
                setIsOpen(false);
              }}
              mode="inline"
              showCalendarButton={false}
              formatInputText={formatPersianDate}
              disabledDates={disabledDates || (() => false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default Datepick;
