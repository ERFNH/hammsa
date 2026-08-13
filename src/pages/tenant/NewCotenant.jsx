import { useState } from "react";
import NewCoMemberForm from "../../component/NewCoMemberForm/NewCoMemberForm";
import { tenants } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
function NewCotenant() {
  const [tenantPhoneNumber, setTenantPhoneNumber] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { activeBuilding } = useBuilding();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await tenants(
        activeBuilding.buildingId,
        tenantPhoneNumber,
        block,
        floor,
        unitNumber,
      );
      alert("عضو جدیداضافه شد");
      navigate("/Tenantprofile");
    } catch (err) {
      alert("خطا در ثبت عضو جدید");
    } finally {
      setLoading(false);
    }
  };
  return (
    <NewCoMemberForm
      headerTitle="افزودن عضو جدید"
      onSubmit={handleSubmit}
      phoneNumber={tenantPhoneNumber}
      setPhoneNumber={setTenantPhoneNumber}
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
export default NewCotenant;
