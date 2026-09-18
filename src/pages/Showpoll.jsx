import styles from "./Showpoll.module.css";
import Tabs from "../component/Tabs/Tabs";
import PollCard from "../component/PollCard/PollCard";
import { useEffect, useState } from "react";
import { useBuilding } from "../context/Buildingcontext";
import { getActivePolls, getInActivePolls } from "../api/auth";
import { data } from "react-router-dom";
function Showpoll() {
  const [activeTab, setActiveTab] = useState("active");
  const { activeBuilding } = useBuilding();
  const [activePolls, setActivePolls] = useState([]);
  const [inactivePolls, setInactivePolls] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (activeBuilding?.buildingId) {
      setLoading(true);
      Promise.all([
        getActivePolls(activeBuilding.buildingId),
        getInActivePolls(activeBuilding.buildingId),
      ])
        .then(([activeRes, inactiveRes]) => {
          console.log("ساختار کامل پاسخ فعال:", activeRes);
          console.log("کل پاسخ سرور (غیرفعال):", inactiveRes);
          setActivePolls(activeRes.data || []);
          setInactivePolls(inactiveRes.data || []);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeBuilding]);
  return (
    <main className={styles.showpoll}>
      <h1 className={styles.header}>رای‌گیری‌ها</h1>
      <Tabs
        tabs={[
          { value: "inactive", label: "غیرفعال" },
          { value: "active", label: "فعال" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "active" && (
        <div className={styles.pollContainer}>
          {loading ? (
            <p className={styles.loadingText}>در حال دریافت اطلاعات</p>
          ) : activePolls.length === 0 ? (
            <p className={styles.emptyText}>رای‌گیری فعالی وجود ندارد</p>
          ) : (
            activePolls.map((item) => (
              <PollCard
                key={item.id}
                pollId={item.id}
                title={item.title}
                description={item.description}
                options={item.options || []}
                deadline={item.deadline}
              />
            ))
          )}
        </div>
      )}
      {activeTab === "inactive" && (
        <div className={styles.pollContainer}>
          {loading ? (
            <p className={styles.loadingText}>در حال دریافت اطلاعات</p>
          ) : inactivePolls.length === 0 ? (
            <p className={styles.emptyText}>رای‌گیری غیرفعالی وجود ندارد</p>
          ) : (
            inactivePolls.map((item) => (
              <PollCard
                key={item.id}
                title={item.title}
                description={item.description}
                options={item.options || []}
                deadline={item.deadline}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}
export default Showpoll;
