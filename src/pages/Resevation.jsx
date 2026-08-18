import Backbutton from "../component/Backbutton/Backbutton";
import Select from "../component/Select/Select";
import Datepick from "../component/Datepick/Datepick";
import Button from "../component/Button/Button";
import styles from "./Resevation.module.css";
import { postResavation, getReservedDates } from "../api/auth";
import { useBuilding } from "../context/Buildingcontext";
import { useState, useEffect } from "react";
function Reservation() {
  const { activeBuilding, loading: buildingLoading } = useBuilding();
  const buildingId = activeBuilding?.buildingId;
  const [facilityType, setFacilityType] = useState(0);
  const [reservetime, setReservetime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservedDates, setReservedDates] = useState([]);
  useEffect(() => {
    const fetchReservedDates = async () => {
      if (buildingLoading) return;
      if (!buildingId) {
        console.log("ساختمان برای کاربر پیدا نشد");
        return;
      }
      try {
        const response = await getReservedDates(buildingId);

        if (Array.isArray(response.data)) {
          setReservedDates(response.data);
        } else {
          setReservedDates([]);
        }
      } catch (err) {
        console.log("خطا در دریافت تاریخ‌های رزرو شده:", err);
        setReservedDates([]);
      }
    };
    fetchReservedDates();
  }, [buildingId, buildingLoading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buildingId) {
      alert("شناسه ساختمان یافت نشد. لطفاً یک ساختمان انتخاب کنید");
      return;
    }
    if (!reservetime) {
      alert("لطفاً تاریخ را انتخاب کنید!");
      return;
    }
    const selectedDateStr = new Date(reservetime).toISOString().split("T")[0];
    const isAlreadyReserved = reservedDates.some((reserved) => {
      const reservedDateStr = reserved.split("T")[0];
      return reservedDateStr === selectedDateStr;
    });
    if (isAlreadyReserved) {
      alert("این تاریخ قبلاً رزرو شده است. لطفاً تاریخ دیگری انتخاب کنید.");
      return;
    }
    if (facilityType === undefined || facilityType === null) {
      alert(" یک گزینه را انتخاب کنید");
      return;
    }
    setLoading(true);
    try {
      const formattedDate = new Date(reservetime).toISOString();
      await postResavation(buildingId, Number(facilityType), formattedDate);
      alert("اطلاعات شما ثبت شد");
      setFacilityType(0);
      setReservetime(null);
      const response = await getReservedDates(buildingId);
      if (Array.isArray(response.data)) {
        setReservedDates(response.data);
      } else if (Array.isArray(response)) {
        setReservedDates(response);
      }
    } catch (err) {
      console.log("خطای کامل سرور:", err.response?.data);
      const errorMessage = err.response?.data?.message || "خطا در ثبت اطلاعات";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className={styles.mainresevation}>
      <Backbutton />
      <h1 className={styles.headerresevation}>رزرو</h1>
      <form onSubmit={handleSubmit} className={styles.formresevation}>
        <Select
          className={styles.selectgroup}
          label="رزرو برای"
          options={[
            { value: 0, label: "سالن ورزشی" },
            { value: 1, label: "استخرو سونا و جکوزی" },
            { value: 2, label: "سالن احتماعات" },
            { value: 3, label: "روف گاردن" },
          ]}
          value={facilityType}
          onChange={setFacilityType}
        />
        <Datepick
          label="زمان های قابل رزور"
          value={reservetime}
          onChange={setReservetime}
          disabledDates={(date) => {
            if (!date) return false;
            const dateString = new Date(date).toISOString().split("T")[0];
            return reservedDates.some((reserved) => {
              const reservedDateString = reserved.split("T")[0];
              return dateString === reservedDateString;
            });
          }}
        />

        <div className={styles.submitbutton}>
          <Button type="submit" className="simplebutton-wh ">
            رزرو
          </Button>
          <a href="/Showresevation" className="myreserve">
            رزرو‌های من
          </a>
        </div>
      </form>
    </main>
  );
}

export default Reservation;
