import React from "react";
import { useNavigate } from "react-router-dom";
import { useBuilding } from "../../context/Buildingcontext";
import { setAnnouncement } from "../../api/auth";
import Similarnewform from "../../component/Similarnewform/Similarnewform";

function Announcement() {
  const navigate = useNavigate();
  const { activeBuilding } = useBuilding();

  const handleSend = async ({ subject, discription, priority }) => {
    try {
      await setAnnouncement(
        activeBuilding.buildingId,
        subject,
        discription,
        Number(priority)
      );
      alert("اعلان با موفقیت ثبت شد.");
      navigate("/Managerprofile");
    } catch (err) {
      console.log(err);
      alert("خطا در ثبت اعلان.");
    }
  };

  return (
    <Similarnewform
      pageTitle="اعلان جدید"
      onSubmit={handleSend}
    />
  );
}

export default Announcement;