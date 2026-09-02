import Button from "../../component/Button/Button";
import { useBuilding } from "../../context/Buildingcontext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyBuilding, setCurrentBuilding } from "../../api/auth";
import "../../global.css";
function Changing() {
  const { activeBuilding, setActiveBuilding } = useBuilding();
  const [buildings, serverBuildings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getMyBuilding()
      .then((responseserver) => {
        serverBuildings(responseserver.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const towelcomepage = (building) => {
    setCurrentBuilding({
      buildingId: building.id,
    })
      .then((res) => {
        console.log("OK", res);
        setActiveBuilding(building);
        navigate("/Welcome");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">یک ساختمان را انتخاب کنید</h1>
      <div className="buttonglobalstyle">
        {buildings.map((buildingbutton) => (
          <Button
            key={buildingbutton.id}
            className="simplebutton-br"
            onClick={() => towelcomepage(buildingbutton)}
          >
            {buildingbutton.name}
          </Button>
        ))}
      </div>
      <Button
        className="simplebutton-br position-fx"
        onClick={() => navigate("/Buildinginfo")}
      >
        ثبت ساختمان جدید
      </Button>
    </main>
  );
}
export default Changing;
