import React, { useState } from "react";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import Option from "../../component/Option/Option";
import { owners } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useBuilding } from "../../context/Buildingcontext";
import NewCoMemberForm from "../../component/NewCoMemberForm/NewCoMemberForm";
import "../../global.css";
function Newowner() {
  const { activeBuilding } = useBuilding();
  console.log("activeBuilding:", activeBuilding);
  const navigate = useNavigate();
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await owners(
        activeBuilding.buildingId,
        ownerPhoneNumber,
        block,
        floor,
        unitNumber,
      );
      alert("مالک با موفقیت ثبت شد.");
      navigate("/Managerprofile");
    } catch (err) {
      console.error("خطای کامل سرور:", err.response?.data);
      console.log(err);
      alert("خطا در ثبت مالک.");
    }
  };
  return (
    <NewCoMemberForm
      headerTitle="افزودن مالک"
      onSubmit={handleSubmit}
      phoneNumber={ownerPhoneNumber}
      setPhoneNumber={setOwnerPhoneNumber}
      block={block}
      setBlock={setBlock}
      floor={floor}
      setFloor={setFloor}
      unitNumber={unitNumber}
      setUnitNumber={setUnitNumber}
      loading={loading}
    />
  );
}

export default Newowner;
