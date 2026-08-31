import Backbutton from "../../component/Backbutton/Backbutton";
import "../../global.css";
import Button from "../../component/Button/Button";
import { useNavigate } from "react-router-dom";
import { getChalengeStatus, getChalengeDetail, completeChallenge } from "../../api/auth";
import { useEffect, useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
function ChalengePage() {
  const { activeBuilding } = useBuilding();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [challengeData, setChallengeData] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding?.buildingId) return;
      try {
        setLoading(true);
        const statusRes = await getChalengeStatus(activeBuilding.buildingId);
        //console.log("status:", statusRes.data);
        setChallengeData(statusRes.data?.data);
        if (statusRes.data?.data?.isRegistered) {
          const detailRes = await getChalengeDetail(activeBuilding.buildingId);

          console.log("detail:", detailRes.data);
          setDetailData(detailRes.data?.data);
          setIsCompleted(detailRes.data?.data?.isCompleted || false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding?.buildingId]);
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
      <Backbutton />
      <div className="mainglobalinpage">
        <h1 className="globalpageheader">چالش ورزشی این هفته</h1>

        {!challengeData?.isRegistered ? (
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
                چالش ها از روز شنبه تا دوشنبه هر هفته مهلت ثبت نام دارند.
                دوشنبه جزئیات چالش، در همین قسمت برنامه مشخص میشه و تا جمعه وقت داری انجامش بدی و ثبتش کنی
              </p>
            </section>
          </>
        ) : (
          <>
            {detailData && (
              <div>
                <p>{detailData.description || "توضیحات چالش"}</p>
                <p>مهلت: {detailData.deadline || challengeData.challengeDeadline}</p>
              </div>
            )}
            {!isCompleted ? (
              <Button onClick={handleComplete}>
                انجام دادم
              </Button>
            ) : (
              <p> چالش انجام شد</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default ChalengePage;