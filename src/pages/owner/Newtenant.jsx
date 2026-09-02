import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Datepick from "../../component/Datepick/Datepick";
import { tenants } from "../../api/auth";
import { useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
function Newtenant() {
  const [tenantPhoneNumber, setTenantPhoneNumber] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const { activeBuilding } = useBuilding();
  const [startDate, setStartDate] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!activeBuilding?.buildingId) {
        console.log("ساختمان فعال پیدا نشد");
        return;
      }
      await tenants(
        activeBuilding.buildingId,
        tenantPhoneNumber,
        block,
        floor,
        unitNumber,
        startDate,
      );
      alert("مستاجر جدید ثبت شد");
      setTenantPhoneNumber("");
      setBlock("");
      setFloor("");
      setUnitNumber("");
      setStartDate(null);
    } catch (err) {
      console.log("ارور", err.response?.data);
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader"> ثبت مستاجر جدید</h1>
      <form action="" className="globalpageform" onSubmit={submit}>
        <Input
          type="tel"
          name="phone"
          className="input-textphone"
          label="شماره تماس"
          value={tenantPhoneNumber}
          onChange={setTenantPhoneNumber}
        />
        <Input
          label=" بلوک"
          type="number"
          className="input-number"
          value={block}
          onChange={setBlock}
        />
        <Input
          label="طبقه"
          type="number"
          className="input-number"
          value={floor}
          onChange={setFloor}
        />
        <Input
          label="واحد"
          type="number"
          className="input-number"
          value={unitNumber}
          onChange={setUnitNumber}
        />
        <Datepick
          label="تاریخ شروع"
          value={startDate}
          onChange={setStartDate}
        />
        <Button type="submit" className="simplebutton-wh position-fx">
          افزودن
        </Button>
      </form>
    </main>
  );
}
export default Newtenant;
