import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button/Button";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import { getcurretncharge, getMyunits, postPayment } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import Input from "../../component/Input/Input";
import "../../global.css";
function Finance() {
  const { activeBuilding } = useBuilding();
  const [charge, setCharge] = useState({ amount: 0, isPaid: false, id: null });
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
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
        //console.log("خطا در دریافت اطلاعات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding]);
  const handlePay = async () => {
    if (!charge.id) {
      alert("شناسه شارژ پیدا نشد");
      return;
    }
    if (!trackingCode.trim()) {
      alert("لطفاً کد پیگیری را وارد کنید.");
      return;
    }
    try {
      setIsPaying(true);
      const response = await postPayment(charge.id, trackingCode);
      console.log("پاسخ سرور:", response.data);
      alert("کدپیگیری با موفقیت ارسال شد");
    } catch (err) {
      console.error("خطا در ارسال:", err);
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
            <header className="globalpageform">
              {!charge.isPaid ? (
                <>
                  <Input
                    className="input-group input-textphone"
                    type="number"
                    label="کد پیگیری"
                    value={trackingCode}
                    onChange={setTrackingCode}
                  />
                  <Button
                    onClick={handlePay}
                    disabled={isPaying}
                    className="glassybutton"
                  >
                    {isPaying ? "در حال ارسال" : "ارسال"}
                  </Button>
                </>
              ) : (
                <p className="loadingtext">پرداخت تایید شد </p>
              )}
            </header>
          </Glassybackground>
          <div className="buttonglobalstyle">
            <Button
              className="btntobottom"
              onClick={() => navigate("/ShowFixCost")}
            >
              فاکتور هزینه های ثابت ساختمان
            </Button>
            <Button
              className="btntobottom"
              onClick={() => navigate("/FinanceReport")}
            >
              گزارش مالی
            </Button>
            <Button
              className="btntobottom"
              onClick={() => navigate("/FinancePredict")}
            >
              پیش بینی هزینه
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
export default Finance;
