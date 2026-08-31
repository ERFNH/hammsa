import styles from "./Membercard.module.css";
import Button from "../../component/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function MemberCard({ member, unit, onStatusClick, allowEdit = true, onEdit }) {
  const [localStatus, setLocalStatus] = useState(member.status || "ساکن");
  const [isActive, setIsActive] = useState(member.isActive ?? true);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!allowEdit || !isActive) return;
    if (localStatus === "تمام شده") return;
    if (onStatusClick) {
      onStatusClick(unit, setLocalStatus, setIsActive);
    }
  };
  const displayText = isActive ? "ساکن" : "تمام شده";
  const rawDate = member.startDate;
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };
  const displayDate = formatDate(rawDate);
  return (
    <div className={styles.card}>
      <div className={styles.cardrow}>
        <span
          className={` ${allowEdit && isActive && localStatus === "ساکن" ? styles.simplebutton : ""}`}
          onClick={handleClick}
          style={{
            cursor:
              allowEdit && isActive && localStatus === "ساکن"
                ? "pointer"
                : "default",
          }}
        >
          {displayText}
        </span>
        <div>
          {displayDate && (
            <div className={styles.date}>
              <span>{displayDate}</span>
            </div>
          )}
        </div>
        <span className={styles.name}>{member.fullName}</span>
      </div>
      <div className={styles.buttonrow}>
        <Button
          className="simplebutton"
          onClick={() => navigate(`/PaymentStatus/${unit.unitId}`)}
        >
          وضعیت پرداخت
        </Button>
        {isActive && member.role === 1 && (
          <Button
            className="simplebutton"
            onClick={() =>
              navigate("/ShowCoMember", { state: { role: "owner" } })
            }
          >
            مشاهده اعضا
          </Button>
        )}
        {isActive && member.role === 2 && (
          <Button
            className="simplebutton"
            onClick={() =>
              navigate("/ShowCoMember", { state: { role: "tenant" } })
            }
          >
            مشاهده اعضا
          </Button>
        )}
      </div>
    </div>
  );
}

export default MemberCard;
