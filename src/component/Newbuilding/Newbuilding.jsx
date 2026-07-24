import "./Newbuilding.css";
import Button from "../Button/Button";
function Newbuilding({ onCreateClick }) {
  return (
    <div className="Newbuilding-err">
      <h1 className="Newbuilding-header">لطفا ساختمان خود را ثبت کنید</h1>
      <Button className="simplebutton" onClick={onCreateClick}>ایجاد ساختمان</Button>
    </div>
  );
}

export default Newbuilding;