import FixCostt from "../../../component/FixCostt/FixCostt";
import { putSharedCost, getSharedCost } from "../../../api/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilding } from "../../../context/Buildingcontext";
function FixCost() {
  const { activeBuilding } = useBuilding();
  const navigate = useNavigate();
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
  useEffect(() => {
    if (!activeBuilding?.buildingId) return;
    getSharedCost(activeBuilding.buildingId)
      .then((res) => {
        setCosts(res.data);
      })
      .catch((err) => {
        console.error("خطا در دریافت هزینه‌ها:", err);
      });
  }, [activeBuilding]);
  const handleEditCosts = async () => {
    const newElectricity = prompt("مبلغ جدید برق مشاعات:", costs.electricity);
    const newWater = prompt("مبلغ جدید آب مشاعات:", costs.water);
    const newCleaning = prompt("مبلغ جدید نظافت:", costs.cleaning);
    const newElevator = prompt("مبلغ جدید آسانسور:", costs.elevator);
    if (
      newElectricity !== null &&
      newWater !== null &&
      newCleaning !== null &&
      newElevator !== null
    ) {
      const updatedCosts = {
        ...costs,
        electricity: Number(newElectricity),
        water: Number(newWater),
        cleaning: Number(newCleaning),
        elevator: Number(newElevator),
      };
      console.log("activeBuilding BEFORE SEND:", activeBuilding);
      try {
        await putSharedCost(activeBuilding.buildingId, updatedCosts);
        console.log(activeBuilding);
        const freshData = await getSharedCost(activeBuilding.buildingId);
        setCosts(freshData.data);
        alert("هزینه‌ها با موفقیت ویرایش شد.");
      } catch (err) {
          console.error("خطای دریافت هزینه‌ها:", err.response?.data);

        console.error("خطا در ویرایش هزینه‌ها:", err);
        alert("خطا در ویرایش هزینه‌ها.");
      }
    }
  };
  const onEditIsPay = async (type) => {
    const key = `is${type.charAt(0).toUpperCase() + type.slice(1)}Paid`;

    const updatedCosts = { ...costs, [key]: false };
    try {
      await putSharedCost(activeBuilding.buildingId, updatedCosts);
      const freshData = await getSharedCost(activeBuilding.buildingId);
      setCosts(freshData.data);
    } catch (err) {
      console.error("خطا در تغییر وضعیت:", err);
      alert("خطا در تغییر وضعیت پرداخت.");
    }
  };
  return (
    <FixCostt
      costs={costs}
      onEditCosts={handleEditCosts}
      onEditIsPay={onEditIsPay}
      isEditable={true}
    />
  );
}
export default FixCost;
