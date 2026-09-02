import { useEffect, useState } from "react";
import { getMyBuilding } from "../../api/auth";
import "../../global.css";
import { Roles } from "../../constants/Roles";
function OwnerBuilding() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMyBuilding()
      .then((res) => {
        const data = res.data?.data || res.data || [];
        const ownerBuildings = data.filter(
          (building) => building.role === Roles.owner,
        );
        setBuildings(ownerBuildings);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="loadingtext">در حال دریافت اطلاعات</p>;
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">ساختمان‌های من</h1>
      {buildings.map((buildingbutton) => (
        <Button
          key={buildingbutton.id}
          className="simplebutton-br"
          onClick={() => towelcomepage(buildingbutton)}
        >
          {buildingbutton.name}
        </Button>
      ))}
      <Button
        className="simplebutton-br position-fx"
        onClick={() => navigate("/Buildinginfo")}
      >
        ثبت ساختمان جدید
      </Button>
    </main>
  );
}
export default OwnerBuilding;
