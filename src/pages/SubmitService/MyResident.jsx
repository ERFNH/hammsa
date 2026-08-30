import Backbutton from "../../component/Backbutton/Backbutton";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import { getMyResident, deleteMyResident } from "../../api/auth";
import { useEffect, useState } from "react";
import Button from "../../component/Button/Button";
import "../../global.css";
function MyResident() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fatchList = async () => {
      try {
        setLoading(true);
        const response = await getMyResident();
        setItems(response.data?.items || []);
      } catch (err) {
        console.error("خطا در دریافت لیست:", err);
      } finally {
        setLoading(false);
      }
    };
    fatchList();
  }, []);
  const getCategoryName = (categoryId) => {
    const categories = {
      1: "آشپزی",
      2: "آموزشی",
      3: "زیبایی",
      4: "فنی",
      5: "ورزشی",
      6: "کتابخوانی",
      7: "والدین",
    };
    return categories[categoryId] || "سایر";
  };
  const handleDelete = async (eventId) => {
    try {
      await deleteMyResident(eventId);
      setItems((prev) => prev.filter((item) => item.id !== eventId));
      alert("با موفقیت حذف شد");
    } catch (err) {
      console.error("خطا در حذف:", err);
      alert("خطا در حذف");
    }
  };
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">رویدادهایی من</h1>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : items.length === 0 ? (
        <p className="loadingtext">رویدادی برای نمایش وجود ندارد</p>
      ) : (
        <ul className="listcart">
          {items.map((item) => (
            <li key={item.id} className="cart">
              <Glassybackground>
                <section className="listcart">
                  <p className="cartrow">
                    <strong>:دسته بندی</strong> {getCategoryName(item.category)}
                  </p>
                  <p className="cartrow">
                    <strong>:عنوان</strong> {item.title}
                  </p>
                  <Button
                    className="glassybutton"
                    onClick={() => handleDelete(item.id)}
                  >
                    حذف
                  </Button>
                  <Glassybackground>
                    <div className="loadingtext">
                      <strong>:مشارکت کنندگان</strong> {item.participants}
                    </div>
                  </Glassybackground>
                </section>
              </Glassybackground>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default MyResident;
