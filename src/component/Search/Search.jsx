import styles from "./Search.module.css";
import SearchIcon from "../../assets/icons/Searchh.svg?react";

function Searchh({ value, onChange }) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIcon className={styles.searchIcon} />
    </div>
  );
}

export default Searchh;