import styles from "./Optionlist.module.css";
function OptionList({
  options = [],
  selectedOption,
  onSelect,
  disabled = false,
  showPercentage = false,
  myVoteId = null,
  calculatePercentage,
}) {
  return (
    <div className={styles.optionContainer}>
      {options.map((option) => {
        const percentage = calculatePercentage
          ? calculatePercentage(option.id)
          : 0;
        const isMyVote = myVoteId === option.id;
        return (
          <div
            key={option.id}
            className={`${styles.optionItem} ${selectedOption === option.id ? styles.selected : ""} ${disabled ? styles.disabled : ""}`}
            onClick={() => !disabled && onSelect(option.id)}
          >
            <div className={styles.radioCircle}>
              <div
                className={`${styles.radioInner} ${selectedOption === option.id ? styles.active : ""}`}
              />
            </div>
            <div className={styles.optionContent}>
              <span className={styles.optionLabel}>{option.text}</span>
              {showPercentage && (
                <div className={styles.percentageBar}>
                  <span className={styles.percentageText}>{percentage}%</span>
                  <div
                    className={`${styles.percentageFill} ${isMyVote ? styles.myVote : ""}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default OptionList;
