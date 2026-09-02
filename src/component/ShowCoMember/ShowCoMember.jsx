import styles from "./ShowCoMember.module.css";
import "../../global.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import { useLocation } from "react-router-dom";
import { getcomembers, removeOneOwner, removeOneTenant } from "../../api/auth";
function ShowCoMember() {
  const location = useLocation();
  const { activeBuilding } = useBuilding();
  const roleFilter = location.state?.role || "all";
  const [coMembers, setCoMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingPhone, setDeletingPhone] = useState(null);
  useEffect(() => {
    async function fetchCoMembers() {
      if (!activeBuilding?.buildingId) return;
      setLoading(true);
      try {
        const res = await getcomembers(activeBuilding.buildingId);
        setCoMembers(res.data.coMemberInfos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoMembers();
  }, [activeBuilding]);
  const handleRemove = async (member) => {
    if (!activeBuilding?.buildingId) return;
    const confirmDelete = window.confirm(`آیا از حذف این عضو اطمینان دارید؟`);
    if (!confirmDelete) return;
    try {
      setDeletingPhone(member.phoneNumber);
      const payload = {
        ownerPhoneNumber: member.phoneNumber,
        buildingId: activeBuilding.buildingId,
        block: Number(member.block || 1),
        floor: Number(member.floor || 1),
        unitNumber: Number(member.unitNumber || 1),
      };
      if (member.role === 1) {
        await removeOneOwner(payload);
      } else if (member.role === 2) {
        await removeOneTenant(payload);
      }
      setCoMembers((prev) =>
        prev.filter((m) => m.phoneNumber !== member.phoneNumber),
      );
      alert("عضو با موفقیت حذف شد");
    } catch (err) {
      console.error(err);
      alert("خطا در حذف");
    } finally {
      setDeletingPhone(null);
    }
  };
  const filteredMembers = coMembers.filter((member) => {
    if (roleFilter === "owner") return member.role === 1;
    if (roleFilter === "tenant") return member.role === 2;
    return true;
  });
  return (
    <main className={`mainglobalinpage ${styles.coMembersContainer}`}>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : filteredMembers.length === 0 ? (
        <p className="loadingtext">عضوی برای این واحد ثبت نشده است</p>
      ) : (
        <ul className={styles.coMembersList}>
          {filteredMembers.map((member, index) => {
            const isFinished = member.isActive === false;
            const hasName = member.firstName || member.lastName;
            return (
              <li
                key={member.id || member.phoneNumber || index}
                className={styles.coMemberCard}
              >
                {!isFinished && (
                  <Button
                    className="simplebutton"
                    onClick={() => handleRemove(member)}
                    disabled={deletingPhone === member.phoneNumber}
                  >
                    حذف
                  </Button>
                )}
                {member.phoneNumber && <p>{member.phoneNumber}</p>}
                <p>
                  {hasName
                    ? `${member.firstName || ""} ${member.lastName || ""}`.trim()
                    : "بدون نام"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
export default ShowCoMember;
