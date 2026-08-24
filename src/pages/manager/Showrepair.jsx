import Glassybackground from "../../component/Glassybackground/Glassybackground";
import Backbutton from "../../component/Backbutton/Backbutton";
import "./Showrepair.css";
import { useState, useEffect } from "react";
import { Showrepair as getRepairReports } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
function ShowRepair() {
  const { activeBuilding } = useBuilding();
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!activeBuilding?.buildingId) return;
    const fetchRepairs = async () => {
      try {
        setLoading(true);
        const res = await getRepairReports(activeBuilding.buildingId);
        setRepairs(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, [activeBuilding]);

  return (
    <main className="showrepair-main">
      <Backbutton />
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : (
        <>
          <div className="showrepair-header-container">
            <h1 className="showrepair-header">خرابی‌های گزارش شده</h1>
          </div>
          {repairs.length === 0 ? (
            <p className="loadingtext">خرابی ثبت‌ شده‌ای وجود ندارد.</p>
          ) : (
            <div className="showrepair-container">
              {repairs.map((item) => (
                <Glassybackground>
                  <div className="repair-card" key={item.id}>
                    <div className="repair-date">
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </div>
                    <div className="repair-row">
                      <span className="repair-label">گزارش دهنده</span>
                      <div className="repair-value">{item.reporter || "—"}</div>
                    </div>
                    <div className="repair-row">
                      <span className="repair-label">مشکل</span>
                      <div className="repair-value">{item.title}</div>
                    </div>
                    <div className="repair-row repair-row-multiline">
                      <span className="repair-label">توضیحات</span>
                      <div className="repair-value description-box">
                        {item.description}
                      </div>
                    </div>
                    <div className="repair-row">
                      <span className="repair-label">اولویت</span>
                      <div className="repair-value">
                        {item.priority === 1
                          ? "زیاد"
                          : item.priority === 2
                            ? "عادی"
                            : "کم"}
                      </div>
                    </div>
                  </div>
                </Glassybackground>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default ShowRepair;
