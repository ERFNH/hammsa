import { useState } from "react";
import NewCoMemberForm from "../../component/NewCoMemberForm/NewCoMemberForm";
import { owners } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import { useNavigate } from "react-router-dom";
function NewCowner() {
  const { activeBuilding } = useBuilding();
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeBuilding?.buildingId) {
  alert("ساختمان فعال پیدا نشد");
  return;
}
    setLoading(true);
    try {
      await owners(
        activeBuilding.buildingId,
        ownerPhoneNumber,
        block,
        floor,
        unitNumber,
      );
      alert("عضو جدیداضافه شد");
      navigate("/Ownerprofile");
    } catch (err) {
      alert("خطا در ثبت عضو جدید");
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <NewCoMemberForm
      headerTitle="افزودن عضو جدید"
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
export default NewCowner;
