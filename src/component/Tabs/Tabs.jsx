import "./Tabs.css";
import Button from "../Button/Button";

function Tabs({ tabs, value, onChange }) {
  return (
    <div className="tabs ">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          className={value === tab.value ? "tabactive" : "tabinactive"}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

export default Tabs;
