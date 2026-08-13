import "./Glassybackground.css";

function Glassybackground({children , classname=""}) {
  return <div className={`Glassybackground${classname}`}>{children}</div>;
}
export default Glassybackground;
