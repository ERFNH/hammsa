import Input from "../Input/Input";
import Button from "../Button/Button";
import Backbutton from "../Backbutton/Backbutton";
import Datepick from "../Datepick/Datepick";
import { useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import "../../global.css";
function EditMember({ member, unit, onClose, showEndDate = false, onSave }) {
  const { activeBuilding } = useBuilding();
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    if (!activeBuilding?.buildingId) {
      setError("ساختمان انتخاب نشده است");
      return;
    }
    if (!member || !unit) {
      setError("اطلاعات مالک یا واحد پیدا نشد");
      return;
    }
    if (typeof onSave !== "function") {
      setError("تابع ویرایش به فرم ارسال نشده است");
      return;
    }
    const payload = {
      buildingId: activeBuilding.buildingId,
      block: Number(unit.block),
      floor: Number(unit.floor),
      unitNumber: Number(unit.unitNumber),
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
      newBlock: Number(block) !== Number(unit.block) ? Number(block) : null,
      newFloor: Number(floor) !== Number(unit.floor) ? Number(floor) : null,
      newUnitNumber:
        Number(unitNumber) !== Number(unit.unitNumber)
          ? Number(unitNumber)
          : null,
      targetUserId: null,
    };
    console.log(payload);
    try {
      setSaving(true);
      console.log(JSON.stringify(payload, null, 2));
      await onSave(payload);
      alert("اطلاعات با موفقیت ویرایش شد");
      onClose();
    } catch (error) {
      console.error("EDIT ERROR:", error);
      console.error("SERVER ERROR:", error?.response?.data);
      const serverData = error?.response?.data;
      const message =
        serverData?.message ||
        serverData?.errors?.request?.[0] ||
        serverData?.errors?.["$.targetUserId"]?.[0] ||
        "ویرایش اطلاعات انجام نشد";
      setError(message);
    } finally {
      setSaving(false);
    }
  };
  if (!member || !unit) {
    return <p>اطلاعات مالک در دسترس نیست</p>;
  }
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">ویرایش اطلاعات</h1>
      <form className="globalpageform" onSubmit={handleSave}>
        <Input
          label="بلوک جدید"
          type="number"
          className="input-number"
          value={block}
          onChange={setBlock}
        />
        <Input
          label="طبقه جدید"
          type="number"
          className="input-number"
          value={floor}
          onChange={setFloor}
        />
        <Input
          label="شماره واحد جدید"
          type="number"
          className="input-number"
          value={unitNumber}
          onChange={setUnitNumber}
        />
        <Datepick
          label="تاریخ شروع جدید"
          value={startDate}
          onChange={setStartDate}
        />
        {showEndDate && (
          <Datepick label="تاریخ پایان" value={endDate} onChange={setEndDate} />
        )}
        <Button type="submit" className="simplebutton-wh" disabled={saving}>
          ویرایش
        </Button>
        {error && <p className="loadingtext">{error}</p>}
      </form>
    </main>
  );
}
export default EditMember;
