import { useState, useEffect } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import { getSharedCost } from "../../api/auth";
import FixCostt from "../../component/FixCostt/FixCostt";

function ShowFixCost() {
  const { activeBuilding } = useBuilding();
  const [costs, setCosts] = useState({
    electricity: 0,
    water: 0,
    cleaning: 0,
    elevator: 0,
    isElectricityPaid: false,
    isWaterPaid: false,
    isCleaningPaid: false,
    isElevatorPaid: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeBuilding?.buildingId) return;

    getSharedCost(activeBuilding.buildingId)
      .then((res) => {
        setCosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در دریافت هزینه‌ها:", err);
        setLoading(false);
      });
  }, [activeBuilding]);

  if (loading) return <p className="loadingtext">در حال دریافت اطلاعات...</p>;

  return (
    <FixCostt
      costs={costs}
      isEditable={false}
    />
  );
}

export default ShowFixCost;