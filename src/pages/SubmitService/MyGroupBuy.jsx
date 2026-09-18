import "../../global.css";
import { useEffect, useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import { getMyGroupBuying, deleteMyBuy } from "../../api/auth";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import Button from "../../component/Button/Button";
function MyGroupBuy() {
  const { activeBuilding } = useBuilding();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchList = async () => {
      if (!activeBuilding?.buildingId) {
        return;
      }
      try {
        setLoading(true);
        const response = await getMyGroupBuying(activeBuilding.buildingId);
        setItems(response.data?.items || []);
      } catch (err) {
        console.error("خطا در دریافت لیست:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [activeBuilding]);
  const handleDelete = async (groupBuyingId) => {
    try {
      await deleteMyBuy(groupBuyingId);
      alert("خرید گروهی با موفقیت حذف شد.");
      setItems((prev) => prev.filter((item) => item.id !== groupBuyingId));
    } catch (err) {
      console.log(err);
      alert("خطا در حذف خرید گروهی.");
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">خرید‌های من</h1>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : items.length === 0 ? (
        <p className="loadingtext">خرید‌ی برای نمایش وجود ندارد</p>
      ) : (
        <ul className="listcart">
          {items.map((item) => (
            <li key={item.id} className="cart">
              <Glassybackground>
                <section className="listcart">
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
export default MyGroupBuy;
