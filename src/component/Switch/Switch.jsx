import "./Switch.css";

function Switch({ id, label, onChange, checked }) {
  return (
    <div className="switchstyle">
      <input type="checkbox" id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
export default Switch;
