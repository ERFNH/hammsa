import Backbutton from "../../component/Backbutton/Backbutton";
import { getJoinResident } from "../../api/auth";
import { useEffect, useState } from "react";
import "../../global.css";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
function JoinResident() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const response = await getJoinResident();
        setItems(response.data?.items || []);
      } catch (err) {
        console.error("خطا در دریافت لیست:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
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
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">رویدادهایی که پیوسته‌اید</h1>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : items.length === 0 ? (
        <p className="loadingtext">رویدادی برای نمایش وجود ندارد</p>
      ) : (
        <ul className="listcart">
          {items.map((item) => (
            <li key={item.id} className="cart">
              <Glassybackground>
                <p className="cartrow">
                  <strong>:نام ایجادکننده</strong> {item.organizerFullName}
                </p>
                <p className="cartrow">
                  <strong>:دسته بندی</strong> {getCategoryName(item.category)}
                </p>
              </Glassybackground>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default JoinResident;
