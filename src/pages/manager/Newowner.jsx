import React, { useState } from "react";
import "./Newowner.css";
import Backbutton from "../../component/Backbutton/Backbutton";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import Option from "../../component/Option/Option";
import { useBuilding } from "../../context/Buildingcontext";
import { owners } from "../../api/auth";

function Newowner() {
  const [phone, setPhone] = useState("");
  const [blockCount, setBlockCount] = useState("");
  const [floorCount, setFloorCount] = useState("");
  const [unitCount, setUnitCount] = useState("");
  const [selectedRole, setSelectedRole] = useState(1);
  const firstOption = { label: "مالک ساکن", value: 1 };
  const secondOption = { label: "مالک موجر", value: 2 };
  const { activeBuilding } = useBuilding();
  const Submit = async () => {
    try {
      if (!activeBuilding?.id) {
        alert("ساختمان فعال پیدا نشد.");
        return;
      }
      await owners(
        activeBuilding.id,
        phone,
        blockCount,
        floorCount,
        unitCount,
        selectedRole === 1,
      );
      alert("مالک با موفقیت ثبت شد.");
    } catch (err) {
      console.log(err);
      alert("خطا در ثبت مالک.");
    }
  };
  return (
    <main>
      <Backbutton />
      <div className="newowner-main">
        <h1 className="Newowner-header">ثبت مالک جدید</h1>
        <div className="form-ownerinput">
          <Input
            type="tel"
            name="phone"
            className="input-textphone"
            label="شماره تماس"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label=" بلوک"
            type="number"
            className="input-number"
            value={blockCount}
            onChange={(e) => setBlockCount(e.target.value)}
          />
          <Input
            label="طبقه"
            type="number"
            className="input-number"
            value={floorCount}
            onChange={(e) => setFloorCount(e.target.value)}
          />
          <Input
            label="واحد"
            type="number"
            className="input-number"
            value={unitCount}
            onChange={(e) => setUnitCount(e.target.value)}
          />
          <Option
            first={firstOption}
            second={secondOption}
            value={selectedRole}
            onChange={(val) => setSelectedRole(val)}
          />
        </div>
        <Button className="simplebutton-wh position-fx" onClick={Submit}>
          افزودن
        </Button>{" "}
      </div>
    </main>
  );
}

export default Newowner;
