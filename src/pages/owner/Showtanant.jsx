import { getMyTenant, removetenant } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import { useEffect, useState } from "react";
import MemberCard from "../../component/Membercard/Membercard";
//import MemberCard from "../../component/Membercard/Membercard";
import EditMember from "../../component/EditMember/EditMember";
import "../../global.css";
function Showtanant() {
  const { activeBuilding } = useBuilding();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (activeBuilding?.buildingId) {
      setLoading(true);
      getMyTenant(activeBuilding.buildingId)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setTenants(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeBuilding]);

  const handleStatusClick = async (unit, setLocalStatus, setIsActive) => {
    if (!activeBuilding?.buildingId) return;
    try {
      await removetenant(
        activeBuilding.buildingId,
        Number(unit.block),
        Number(unit.floor),
        Number(unit.unitNumber),
      );
      alert("مستاجر حذف شد");
      setLocalStatus("مستاجر شده");
      setIsActive(false);
      await fetchMembers();
    } catch (error) {
      console.error("remove owner error:", error);
      alert(error?.response?.data?.message || "خطا در حذف مستاجر");
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">لیست مستاجرین</h1>
      <div className="members-container">
        {loading ? (
          <p className="loading-text">در حال دریافت اطلاعات</p>
        ) : tenants.length === 0 ? (
          <p className="loading-text">مستاجری ثبت نشده است</p>
        ) : (
          tenants.map((tenant) => (
            <MemberCard
              key={tenant.id}
              member={tenant}
              unit={tenant.unit}
              onStatusClick={handleStatusClick}
              //onEdit={() =>
              //setEditingMember({ member: tenant, unit: tenant.unit })
              //}
            />
          ))
        )}
      </div>
      {/*{editingMember && (
        <div className="edit-member-overlay">
          <div className="edit-member-modal">
            <EditMember
              member={editingMember.member}
              unit={editingMember.unit}
              onClose={() => setEditingMember(null)}
              onSave={editTenant}
            />
          </div>
        </div>
      )}*/}
    </main>
  );
}
export default Showtanant;
