import "../../global.css";
import { getPredict } from "../../api/auth";
import { useEffect, useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
function FinancePredict() {
  const { activeBuilding } = useBuilding();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding?.buildingId) return;
      try {
        const response = await getPredict(activeBuilding.buildingId);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [activeBuilding]);
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">پیش بینی هزینه</h1>
      {!data ? (
        <p>در حال دریافت اطلاعات</p>
      ) : (
        <div className="cart">
          <Glassybackground>
            <div className="cartrowflex">
              {Math.round(data.predictedAmount)} تومان
              <strong>مبلغ پیش‌بینی شده</strong>
            </div>
            <div className="loadingtextrtl">
              <strong>تحلیل:</strong>
              <p>{data.analysis || "تحلیلی موجود نیست"}</p>
            </div>
            <div className="loadingtextrtl">
              <strong>توصیه‌ها:</strong>
              <p>{data.recommendations || "توصیه‌ای موجود نیست"}</p>
            </div>
          </Glassybackground>
        </div>
      )}
    </main>
  );
}

export default FinancePredict;
