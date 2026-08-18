import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button/Button";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import { getcurretncharge, getMyunits, postPayCharge } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import styles from "./Financepage.module.css";
import "../../global.css";
function Finance() {
  const { activeBuilding } = useBuilding();
  const [charge, setCharge] = useState({ amount: 0, isPaid: false, id: null });
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeBuilding?.buildingId) {
          const unitsRes = await getMyunits(activeBuilding.buildingId);
          const myUnits = unitsRes.data?.userUnitDetails || [];
          if (myUnits.length > 0 && myUnits[0]?.unitId) {
            const unitId = myUnits[0].unitId;
            const chargeRes = await getcurretncharge(unitId);
            const data = chargeRes.data || {};
            setCharge({
              amount: data.amount || 0,
              isPaid: data.isPaid || false,
              id: data.chargeId || null,
            });
          }
        }
      } catch (err) {
        console.log("خطا در دریافت اطلاعات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding]);
const handlePay = async () => {
  if (!charge.id) {
    alert("شناسه شارژ پیدا نشد.");
    return;
  }
  try {
    setIsPaying(true);
    const response = await postPayCharge(charge.id);
    let rawUrl = response.data?.paymentUrl;
    if (rawUrl && typeof rawUrl === "string") {
      const fixedUrl = rawUrl.replace("?authority=", "&authority=");
      window.location.href = fixedUrl;
    } else {
      alert("آدرس درگاه پرداخت دریافت نشد.");
    }
  } catch (err) {
    console.error("خطا در درخواست پرداخت:", err);
    alert("مشکلی در ارتباط با درگاه پرداخت به وجود آمد.");
  } finally {
    setIsPaying(false);
  }
};
  return (
    <main className="mainglobalinpage">
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : (
        <>
          <Glassybackground>
            <header className={styles.headerfinance}>
              <div className={styles.headerfirst}>
                <h1 className="globallightbackground">
                  {charge.amount.toLocaleString()} تومان
                </h1>
                <p>شارژ این ماه</p>
              </div>
              {!charge.isPaid && (
                <Button
                  onClick={handlePay}
                  disabled={isPaying}
                  className={`simplebutton ${styles.buttonstyle}`}
                >
                  {isPaying ? "در حال انتقال..." : "پرداخت"}
                </Button>
              )}
            </header>
          </Glassybackground>

          <div className="buttonglobalstyle">
            <Button className="btntobottom" onClick={() => navigate("/ShowFixCost")}>
             فاکتور هزینه های ثابت ساختمان
            </Button>
            <Button className="btntobottom" onClick={() => navigate("/FinanceReport")}>
              گزارش مالی
            </Button>
            <Button className="btntobottom" onClick={() => navigate("/Poll")}>
              پیش بینی هزینه
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

export default Finance;
