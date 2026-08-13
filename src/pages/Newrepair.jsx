import React from "react";
import { useNavigate } from "react-router-dom";
import { useBuilding } from "../context/Buildingcontext";
import { Newrepair } from "../api/auth";
import Similarnewform from "../component/Similarnewform/Similarnewform";


function Repair() {
  const navigate = useNavigate();
  const { activeBuilding } = useBuilding();

  const handleSend = async ({ subject, discription, priority }) => {
    if (!activeBuilding?.buildingId) {
      alert("ساختمان فعال پیدا نشد.");
      return;
    }
    try {
      await Newrepair(
        activeBuilding.buildingId,
        subject,
        discription,
        Number(priority)
      );
      alert("گزارش خرابی با موفقیت ثبت شد.");
      navigate("/Welcome");
    } catch (err) {
      console.log(err);
      alert("خطا در ثبت گزارش خرابی");
    }
  };

  return (
    <Similarnewform
      pageTitle="ثبت خرابی جدید"
      onSubmit={handleSend}
    />
  );
}

export default Repair;