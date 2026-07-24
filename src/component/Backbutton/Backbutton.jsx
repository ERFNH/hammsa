import "./Backbutton.css";
import Backarow from "../../assets/icons/Backarow.svg?react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function Backbutton() {
  const navigate = useNavigate();
  return (
    <Button className="backarow" onClick={() => navigate(-1)}>
      <Backarow />
    </Button>
  );
}
export default Backbutton;
