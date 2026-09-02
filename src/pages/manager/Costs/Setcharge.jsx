import styles from "./Setcharge.module.css";
import Button from "../../../component/Button/Button";
import Glassybackground from "../../../component/Glassybackground/Glassybackground";
import Input from "../../../component/Input/Input";
import { postRates, getRates } from "../../../api/auth";
import { useState, useEffect } from "react";
import { useBuilding } from "../../../context/Buildingcontext";
import moment from "moment-jalaali";
function Setcharge() {
  const { activeBuilding } = useBuilding();
  const [currentAmount, setCurrentAmount] = useState("");
  const [isCurrentEditable, setIsCurrentEditable] = useState(true);
  const [loading, setLoading] = useState(true);
  const now = moment();
  const persianYear = now.jYear();
  const persianMonth = now.jMonth() + 1;
  const getPersianMonth = (date) => {
    const monthIndex = date.jMonth();
    const year = date.jYear();
    const monthNames = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    return `${monthNames[monthIndex]} ${year}`;
  };
  useEffect(() => {
    if (!activeBuilding?.buildingId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getRates(activeBuilding.buildingId)
      .then((res) => {
        const data = res.data;
        if (data?.currentMonth?.isIssued) {
          setCurrentAmount(String(data.currentMonth.amount || 0));
          setIsCurrentEditable(false);
        } else {
          setCurrentAmount("");
          setIsCurrentEditable(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setIsCurrentEditable(true);
        setLoading(false);
      });
  }, [activeBuilding]);
  const handleSubmit = async () => {
    if (!currentAmount || !isCurrentEditable) {
      alert("مبلغ شارژ را وارد کنید.");
      return;
    }
    try {
      setLoading(true);
      await postRates(
        activeBuilding.buildingId,
        persianYear,
        persianMonth,
        Number(currentAmount),
      );
      const res = await getRates(activeBuilding.buildingId);
      const data = res.data;
      if (data?.currentMonth?.isIssued) {
        setCurrentAmount(String(data.currentMonth.amount || 0));
        setIsCurrentEditable(false);
      }
      //alert(`شارژ ماه ${getPersianMonth(now)} با موفقیت ثبت شد.`);
      setLoading(false);
    } catch (err) {
      //console.error("خطا:", err);
      console.log("خطای کامل :", err.response?.data);
      if (err.response?.data?.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([key, value]) => `${key}: ${value.join(", ")}`)
          .join("\n");
        alert(`خطا در ثبت شارژ:\n${errorMessages}`);
      } else {
        alert("خطا در ثبت شارژ");
      }
      setLoading(false);
    }
  };
  return (
    <main>
      <div className={styles.chargebox}>
        <Glassybackground>
          <div className={styles.chargerow}>
            {loading ? (
              <div>در حال دریافت اطلاعات</div>
            ) : isCurrentEditable ? (
              <Input
                value={currentAmount}
                onChange={setCurrentAmount}
                placeholder="مبلغ شارژ را وارد کنید"
                className={styles.inputnewstyle}
              />
            ) : (
              <div className={styles.chargeDisplay}>
                {Number(currentAmount).toLocaleString()} تومان
              </div>
            )}
            <p>{getPersianMonth(now)}</p>
          </div>
        </Glassybackground>
      </div>
      <Button
        type="submit"
        className="simplebutton-wh position-fx"
        onClick={handleSubmit}
        disabled={loading}
      >
        ثبت
      </Button>
    </main>
  );
}
export default Setcharge;
