import "./Switch.css";
function Switch({ id, label, onChange, checked }) {
  return (
    <div className="switch-group">
      <input 
        type="checkbox" 
        id={id} 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
export default Switch;