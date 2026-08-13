import "./Showmembers.css";
import Tabs from "../../component/Tabs/Tabs";
import { getUnits, removeowner } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import { useEffect, useState } from "react";
import MemberCard from "../../component/Membercard/Membercard";
//import EditMember from "../../component/EditMember/EditMember";
import "../../global.css";
import Backbutton from "../../component/Backbutton/Backbutton";
function Showmembers() {
  const [activeTab, setActiveTab] = useState("owner");
  const { activeBuilding } = useBuilding();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [editingMember, setEditingMember] = useState(null);
  const fetchMembers = async () => {
    if (!activeBuilding?.buildingId) return;
    try {
      setLoading(true);
      const response = await getUnits(activeBuilding.buildingId);
      console.log("get unit", response.data);
      setUnits(response.data || []);
    } catch (error) {
      console.log(error.response?.data);
      console.error("get unit", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, [activeBuilding]);
  const handleStatusClick = async (unit, setLocalStatus, setIsActive) => {
    if (!activeBuilding?.buildingId) return;
    try {
      await removeowner(
        activeBuilding.buildingId,
        Number(unit.block),
        Number(unit.floor),
        Number(unit.unitNumber),
      );
      alert("مالک حذف شد");
      setLocalStatus("تمام شده");
      setIsActive(false);
      await fetchMembers();
    } catch (error) {
      console.error("remove owner error:", error);
      alert(error?.response?.data?.message || "خطا در حذف مالک");
    }
  };
  const owners = units.flatMap((unit) =>
    (unit.members || [])
      .filter((member) => member.role === 1)
      .map((member) => ({
        member,
        unit,
      })),
  );
  const tenants = units.flatMap((unit) =>
    (unit.members || [])
      .filter((member) => member.role === 2)
      .map((member) => ({
        member,
        unit,
      })),
  );
  {
    /* const handleEdit = (member, unit) => {
    console.log("EDIT UNIT:", unit);
    console.log("EDIT MEMBER:", member);
    setEditingMember({
      member,
      unit,
    });
  };*/
  }
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <Tabs
        tabs={[
          {
            value: "tenant",
            label: "مستاجرین",
          },
          {
            value: "owner",
            label: "مالکین",
          },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "owner" && (
        <div className="members-container">
          {loading ? (
            <p className="loadingtext">در حال دریافت اطلاعات</p>
          ) : owners.length === 0 ? (
            <p className="loadingtext">مالکی ثبت نشده است</p>
          ) : (
            owners.map(({ member, unit }) => (
              <MemberCard
                key={`${unit.unitId}-${member.phoneNumber}-${member.startDate}`}
                member={member}
                unit={unit}
                onStatusClick={handleStatusClick}
                //allowEdit={true}
                //onEdit={() => handleEdit(member, unit)}
              />
            ))
          )}
        </div>
      )}
      {activeTab === "tenant" && (
        <div className="members-container">
          {loading ? (
            <p className="loadingtext">در حال دریافت اطلاعات</p>
          ) : tenants.length === 0 ? (
            <p className="loadingtext">مستاجری ثبت نشده است</p>
          ) : (
            tenants.map(({ member, unit }) => (
              <MemberCard
                key={`${unit.unitId}-${member.phoneNumber}-${member.startDate}`}
                member={member}
                unit={unit}
                onStatusClick={null}
                //allowEdit={false}
              />
            ))
          )}
        </div>
      )}
      {/*{editingMember && (
        <div className="edit-member-overlay">
          <div className="edit-member-modal">
            <EditMember
              member={editingMember.member}
              unit={editingMember.unit}
              onClose={() => setEditingMember(null)}
              onSave={editOwner}
              showEndDate={false}
            />
          </div>
        </div>
      )}*/}
    </main>
  );
}
export default Showmembers;
