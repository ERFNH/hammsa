import { getMyResevation } from "../api/auth";
import Backbutton from "../component/Backbutton/Backbutton";
import { useBuilding } from "../context/Buildingcontext";
import styles from "./Showresevation.module.css";
import { useState, useEffect } from "react";
function Showresevation() {
  const { activeBuilding } = useBuilding();
  const [reservations, setReservations] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchMyReservations = async () => {
      try {
        setloading(true);
        const response = await getMyResevation();
        setReservations(response.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };
    fetchMyReservations();
  }, []);
  const facilityNames = {
    0: "سالن ورزشی",
    1: "استخر و سونا و جکوزی",
    2: "سالن اجتماعات",
    3: "روف گاردن",
  };
  return (
    <main className={styles.mainShowresevation}>
      <Backbutton />
      {loading ? (
        <p>درحال دریافت اطلاعات</p>
      ) : (
        <>
          <h1 className={styles.header}>رزرو‌های من</h1>
          <div className={styles.list}>
            {reservations.map((item) => (
              <div key={item.id} className={styles.card}>
                <p>{new Date(item.date).toLocaleDateString("fa-IR")}</p>
                <p>{facilityNames[item.facilityType]}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Showresevation;
