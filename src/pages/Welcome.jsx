import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Buildingimage from "../assets/images/buildingimage.png";
import Button from "../component/Button/Button";
import { getUserprofile, getcurretncharge, getMyunits } from "../api/auth";
import { useBuilding } from "../context/Buildingcontext";
import "./Welcome.css";
import "../global.css";
function Welcome() {
  const { activeBuilding } = useBuilding();
  console.log("activeBuilding:", activeBuilding);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const phone = localStorage.getItem("phone");
  const [charge, setCharge] = useState({ amount: 0, isPaid: false });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await getUserprofile();
        setUserInfo(userRes.data);
        if (activeBuilding?.buildingId) {
          const unitsRes = await getMyunits(activeBuilding.buildingId);
          const myUnits = unitsRes.data?.userUnitDetails || [];
          if (myUnits.length > 0 && myUnits[0]?.unitId) {
            const unitId = myUnits[0].unitId;
            const chargeRes = await getcurretncharge(unitId);
            setCharge({
              amount: chargeRes.data?.amount || 0,
              isPaid: chargeRes.data?.isPaid || false,
            });
          }
        }
      } catch (err) {
        console.error("خطا در دریافت اطلاعات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding]);
  const isProfileComplete = userInfo?.firstName && userInfo?.lastName;
  if (loading) {
    return (
      <div className="loadingtext">در حال بررسی اطلاعات لطفا شکیبا باشید </div>
    );
  }
  return (
    <main className="mianwelcome">
      {!activeBuilding && (
        <div className="mainglobalinpage">
          <p className="loadingtext">شما در حال حاضر عضو هیچ ساختمانی نیستید</p>
          <p className="loadingtext">
            مدیر هنوز شما را به عنوان ساکن یا مالک اضافه نکرده است. در صورتی که
            مدیر ساختمان هستید، می‌توانید یک ساختمان جدید ثبت کنید
          </p>
          <Button
            className="simplebutton"
            onClick={() => navigate("/Buildinginfo")}
          >
            ساخت ساختمان جدید
          </Button>
        </div>
      )}
      {activeBuilding && (
        <>
          <header className="welcome-header">
            <img src={Buildingimage} alt="ساختمان" className="buildingimage" />
            <div className="welcome-box">
              <h1 className="welcomebox-title">
                <span>
                  {isProfileComplete
                    ? `${userInfo.firstName} ${userInfo.lastName} خوش آمدید`
                    : `${phone || ""} خوش آمدید`}
                </span>
              </h1>
              {!isProfileComplete && (
                <Button
                  className="simplebutton"
                  onClick={() => navigate("/Publicprofile")}
                >
                  برای تکمیل پروفایل کلیک کنید
                </Button>
              )}
            </div>
          </header>
          <div className="mainglobalinpage">
            <section className="Welcome-firstbox">
              <div className="firstbox-detail">
                <p className="firstbox-item">
                  {charge.amount.toLocaleString()} تومان
                </p>
                <p className="firstbox-desc">شارژ</p>
                <p className="firstbox-item">
                  {charge.isPaid ? "پرداخت شده" : "پرداخت نشده"}
                </p>
                <p className="firstbox-desc">وضعیت</p>
              </div>
              <Button
                className="simplebutton"
                onClick={() => navigate("/Financepage")}
              >
                امور مالی و پرداخت
              </Button>
            </section>
            <section className="welcome-button">
              <Button
                className="welcomebutton"
                onClick={() => navigate("/Showpoll")}
              >
                رای گیری
              </Button>
              <Button
                className="welcomebutton"
                onClick={() => navigate("/Newrepair")}
              >
                ثبت خرابی
              </Button>
              <Button className="welcomebutton">خدمات محلی</Button>
              <Button
                className="welcomebutton"
                onClick={() => navigate("/Reservation")}
              >
                رزرو
              </Button>
              <Button
                className="welcomebutton"
                onClick={() => navigate("/Showancmt")}
              >
                اعلانات
              </Button>
              <Button className="welcomebutton">چالش های گروهی</Button>
            </section>
          </div>
        </>
      )}
    </main>
  );
}

export default Welcome;
