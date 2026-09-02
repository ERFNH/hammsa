import Button from "../Button/Button";
import Input from "../Input/Input";
import "../../global.css";
import { useBuilding } from "../../context/Buildingcontext";
function NewCoMemberForm({
  onSubmit,
  phoneNumber,
  setPhoneNumber,
  block,
  setBlock,
  floor,
  setFloor,
  unitNumber,
  setUnitNumber,
  loading = false,
  headerTitle = "افزودن عضو جدید",
}) {
  const { activeBuilding } = useBuilding();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!activeBuilding?.buildingId) {
      alert("ساختمان فعال پیدا نشد.");
      return;
    }
    onSubmit(e);
  };
  return ( 
    <form onSubmit={handleFormSubmit} className="mainglobalinpage"> 
      <h1 className="globalpageheader">{headerTitle}</h1>
      <div className="globalpageform">
        <Input
          type="tel"
          name="phoneNumber"
          className="input-textphone"
          label="شماره تماس"
          value={phoneNumber}
          onChange={setPhoneNumber}
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
      </div>
      <Button type="submit" className="simplebutton-wh position-fx">
        افزودن
      </Button>
    </form>
  );
}
export default NewCoMemberForm;