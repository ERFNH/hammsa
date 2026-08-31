import React, { useState } from "react";
import styles from "./Addoption.module.css";
import Plus from "../../assets/icons/plus.svg?react";
import Glassybackground from "../Glassybackground/Glassybackground";
function Addoption({ options = [], onChange, placeholder = "گزینه جدید..." }) {
  const [newOption, setNewOption] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const handleAddOption = () => {
    if (newOption.trim() === "") return;
    const updatedOptions = [...options, newOption.trim()];
    onChange(updatedOptions);
    setNewOption("");
    setIsAdding(false);
  };
  const handleRemoveOption = (indexToRemove) => {
    const updatedOptions = options.filter(
      (_, index) => index !== indexToRemove,
    );
    onChange(updatedOptions);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddOption();
    }
    if (e.key === "Escape") {
      setNewOption("");
      setIsAdding(false);
    }
  };
  return (
    <Glassybackground>
      <div className={styles.addoption}>
        <div className={styles.optionsList}>
          {options.map((option, index) => (
            <div key={index} className={styles.optionItem}>
              <span className={styles.optionText}>{option}</span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => handleRemoveOption(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        
        {isAdding ? (
          <div className={styles.addWrapper}>
            <input
              type="text"
              className={styles.addInput}
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              autoFocus
            />
            <div className={styles.addActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setNewOption("");
                  setIsAdding(false);
                }}
              >
                انصراف
              </button>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={handleAddOption}
                disabled={newOption.trim() === ""}
              >
                افزودن
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setIsAdding(true)}
          >
            <Plus />
            افزودن گزینه جدید
          </button>
        )}
      </div>
    </Glassybackground>
  );
}

export default Addoption;
