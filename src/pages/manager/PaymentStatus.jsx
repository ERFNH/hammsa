import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Backbutton from "../../component/Backbutton/Backbutton";
import "../../global.css";
import Button from "../../component/Button/Button";
import styles from "./PaymentStatus.module.css";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import { getPayment, postVerifyPayment } from "../../api/auth";
function PaymentStatus() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [trackingCode, setTrackingCode] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getPayment(unitId);
        console.log("response.data:", response.data);
        setTrackingCode(response.data?.trackingCode || "—");
        setTransactionId(response.data?.transactionId);
        setStatus(response.data?.status);

        setLoading(false);
      } catch (err) {
        console.error("خطا در دریافت :", err);
        setLoading(false);
      }
    };
    fetchStatus();
  }, [unitId]);
  const handleVerify = async (isApproved) => {
    try {
      await postVerifyPayment(transactionId, isApproved);
      alert(isApproved ? "پرداخت تایید شد" : "پرداخت لغو شد");
      setStatus(isApproved ? 2 : 0);
    } catch (err) {
      console.error("خطا:", err);
      alert("خطا در انجام عملیات");
    }
  };
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">وضعیت پرداخت</h1>
      <Glassybackground>
        <div className="globalpageform">
          {loading ? (
            <p className="loadingtext"> در حال دریافت اطلاعات</p>
          ) : (
            <>
              {status === 2 ? (
                <p className={`loadingtext ${styles.pay}`}>
                  پرداخت قبلاً تایید شده است
                </p>
              ) : (
                <div className="cartrowflex">
                  <p className="cartrowflex">
                    {trackingCode}
                    <strong>:کد پیگیری</strong>
                  </p>
                  <Button
                    className={`${styles.btntobottom} ${styles.btnreject}`}
                    onClick={() => handleVerify(false)}
                  >
                    لغو
                  </Button>
                  <Button
                    className={`${styles.btntobottom} ${styles.btnaccept}`}
                    onClick={() => handleVerify(true)}
                  >
                    تایید
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Glassybackground>
    </main>
  );
}
export default PaymentStatus;
