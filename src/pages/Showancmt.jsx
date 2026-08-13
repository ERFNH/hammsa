import "./Showancmt.css";
import Tabs from "../component/Tabs/Tabs";
import Backbutton from "../component/Backbutton/Backbutton";
import AnnouncementCard from "../component/AnnouncementCard/AnnouncementCard";
import { useEffect, useState } from "react";
import { useBuilding } from "../context/Buildingcontext";
import {
  getShowancmt,
  readAnnouncement,
  deleteAnnouncement,
} from "../api/auth";
function Showancmt() {
  const [activeTab, setActiveTab] = useState("unread");
  const { activeBuilding } = useBuilding();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleRead = async (id) => {
    try {
      await readAnnouncement(id);
      setAnnouncements((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (activeBuilding?.buildingId) {
      setLoading(true);
      getShowancmt(activeBuilding.buildingId)
        .then((res) => {
          setAnnouncements(res.data);
        })
        .catch(console.log)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeBuilding]);

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const unreadAnnouncements = announcements.filter((item) => !item.isRead);
  const readAnnouncements = announcements.filter((item) => item.isRead);
  return (
    <main>
      <Backbutton />
      <Tabs
        tabs={[
          { value: "read", label: "خوانده شده" },
          { value: "unread", label: "جدید" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "unread" && (
        <div className="showancmt-container">
          {loading ? (
            <p className="loading-text">درحال دریافت اطلاعات</p>
          ) : unreadAnnouncements.length === 0 ? (
            <p className="loading-text">اعلان جدیدی وجود ندارد</p>
          ) : (
            unreadAnnouncements.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onRead={handleRead}
              />
            ))
          )}
        </div>
      )}
      {activeTab === "read" && (
        <div className="showancmt-container">
          {readAnnouncements.length === 0 ? (
            <p className="loading-text">اعلان خوانده‌ شده‌ای وجود ندارد</p>
          ) : (
            readAnnouncements.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onRead={handleRead}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}
export default Showancmt;