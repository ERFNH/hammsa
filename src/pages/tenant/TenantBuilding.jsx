import { useEffect, useState } from "react";
import { getMyBuilding } from "../../api/auth";
import { Roles } from "../../constants/Roles";
function TenantBuilding() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMyBuilding()
      .then((res) => {
        const data = res.data?.data || res.data || [];
        const tenantBuildings = data.filter(
          (building) => building.role === Roles.tenant,
        );
        setBuildings(tenantBuildings);
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
export default TenantBuilding;
