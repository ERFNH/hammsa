import Backbutton from "../../component/Backbutton/Backbutton";
import Search from "../../component/Search/Search";
import { getActivePrimaryOwners, postTransferManager } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import { useEffect, useState } from "react";
import Button from "../../component/Button/Button";
import "../../global.css";
import styles from "./Transfer.module.css";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
function Transfer() {
  const { activeBuilding } = useBuilding();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(null);
  useEffect(() => {
    if (activeBuilding?.buildingId) {
      setLoading(true);
      getActivePrimaryOwners(activeBuilding.buildingId)
        .then((response) => {
          setUnits(response.data.primaryOwners);
          console.log(response.data.primaryOwners);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeBuilding]);
  const filteredOwners = units.filter(
    (member) =>
      member &&
      member.fullName &&
      member.fullName.trim().includes(searchTerm.trim()),
  );
  const handleConfirm = async () => {
    if (!selectedOwner) {
      alert("لطفاً ابتدا یک مالک را انتخاب کنید");
      return;
    }
    try {
      await postTransferManager(
        activeBuilding.buildingId,
        selectedOwner.id || selectedOwner.phoneNumber,
      );
      alert("مدیریت با موفقیت منتقل شد");
    } catch (err) {
      console.error(err);
      alert("خطا در انتقال مدیریت");
    }
  };
  return (
    <main className={styles.main}>
      <Backbutton />
      <div className="searcHeader">
        <h1 className="globalpageheader">انتقال مدیریت</h1>
        <Search
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className={styles.cart}>
        {loading ? (
          <p className="loadingtext">در حال دریافت اطلاعات</p>
        ) : filteredOwners.length === 0 ? (
          <p className="loadingtext">
            مالک ساکن دیگری در ساختمان شما ثبت نشده است
          </p>
        ) : (
          <div className={styles.ownerList}>
            {filteredOwners.map((member) =>
              member ? (
                <div
                  key={`${member.phoneNumber}`}
                  className={`${styles.ownerItem} ${selectedOwner?.phoneNumber === member.phoneNumber ? styles.selected : ""}`}
                  onClick={() => setSelectedOwner(member)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedOwner?.phoneNumber === member.phoneNumber
                        ? "2px solid #d5b072"
                        : "none",
                  }}
                >
                  <Glassybackground>
                    <div className={styles.ownerInfo}>
                      <div className={styles.ownerInfoheader}>
                        <span className={styles.ownerName}>
                          {member.fullName}
                        </span>
                        <span>
                          {member.managementTermsCount > 0
                            ? ` ${member.managementTermsCount} دوره سابقه مدیریت `
                            : "بدون سابقه مدیریت"}
                        </span>
                      </div>
                      <span>{member.phoneNumber}</span>
                      <span className={styles.ownerUnit}>
                        بلوک {member.block} - طبقه {member.floor} - واحد{" "}
                        {member.unitNumber}
                      </span>
                    </div>
                  </Glassybackground>
                </div>
              ) : null,
            )}
          </div>
        )}
      </div>
      <Button className="simplebutton-br position-fx" onClick={handleConfirm}>
        تایید نهایی
      </Button>
    </main>
  );
}

export default Transfer;
