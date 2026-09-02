import "../../global.css";
import Button from "../../component/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  getChalengeStatus,
  getChalengeDetail,
  completeChallenge,
} from "../../api/auth";
import { useEffect, useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
function ChalengePage() {
  const { activeBuilding } = useBuilding();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [challengeData, setChallengeData] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const today = new Date().getDay();
  const isRegistrationDay = today === 6 || today === 0 || today === 1;
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding?.buildingId) return;
      try {
        setLoading(true);
        const statusRes = await getChalengeStatus(activeBuilding.buildingId);
        const status = statusRes.data?.data;
        setChallengeData(status);
        if (status?.isRegistered || !isRegistrationDay) {
          const detailRes = await getChalengeDetail(activeBuilding.buildingId);
          const detail = detailRes.data?.data;
          console.log("DETAIL:", detail);
          setDetailData(detail);
          setIsCompleted(detail?.hasCompleted || false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding?.buildingId, isRegistrationDay]);
  const handleComplete = async () => {
    if (!activeBuilding?.buildingId) return;
    try {
      await completeChallenge(activeBuilding.buildingId);
      alert("چالش با موفقیت انجام شد");
      setIsCompleted(true);
    } catch (err) {
      console.error("خطا:", err);
      alert(err?.response?.data?.message || "خطا در ثبت انجام چالش");
    }
  };
  if (loading) {
    return (
      <main>
        <Backbutton />
        <div className="mainglobalinpage">
          <p className="loadingtext">در حال دریافت اطلاعات</p>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="mainglobalinpage">
        <h1 className="globalpageheader">چالش ورزشی این هفته</h1>
        {!challengeData?.isRegistered && isRegistrationDay ? (
          <>
            <p className="loadingtext">در چالش ورزشی این هفته شرکت میکنی؟</p>
            <section className="headerglobalstyle">
              <Button
                className="chalenge"
                onClick={() => navigate("/ChalengRegister")}
              >
                شرکت می‌کنم
              </Button>
              <Button
                className="stylenone"
                onClick={() => navigate("/welcome")}
              >
                این هفته شرکت نمی‌کنم
              </Button>
              <p className="loadingtext">
                چالش ها از روز شنبه تا دوشنبه هر هفته مهلت ثبت نام دارند. دوشنبه
                جزئیات چالش، در همین قسمت برنامه مشخص میشه و تا جمعه وقت داری
                انجامش بدی و ثبتش کنی
              </p>
            </section>
          </>
        ) : (
          <>
            {detailData ? (
              <div className="headerglobalstyle">
                <h3 style={{ direction: "rtl" }}>{detailData.title || "چالش ورزشی"}</h3>
                <p>{detailData.description || "توضیحات چالش به زودی"}</p>
                <p>
                  مهلت:
                  {detailData.deadline
                    ? new Date(detailData.deadline).toLocaleDateString("fa-IR")
                    : "نامشخص"}
                </p>
                <p>تعداد شرکت‌کنندگان: {detailData.totalParticipants || 0}</p>
              </div>
            ) : (
              <p>در حال بارگذاری جزئیات چالش</p>
            )}
            {detailData && (
              <>
                {!isCompleted ? (
                  <Button
                    onClick={handleComplete}
                    className="simplebutton-wh position-fx "
                  >
                    انجام دادم
                  </Button>
                ) : (
                  <p> چالش انجام شد</p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
export default ChalengePage;
