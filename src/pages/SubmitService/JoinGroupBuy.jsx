import { useEffect, useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import { getJoinBuy, leaveGroupBuying } from "../../api/auth";
import "../../global.css";
import Button from "../../component/Button/Button";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
function JoinGroupBuy() {
  const { activeBuilding } = useBuilding();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const mockItems = [
    {
      id: "1",
      title: "خرید گروهی لپ تاپ",
      participantsCount: 5,
      price: 30000000,
      deadline: "2026-09-08T08:30:00",
      organizerFullName: "عرفان لنگری",
    },
    {
      id: "2",
      title: "خرید گروهی گوشی",
      participantsCount: 2,
      price: 15000000,
      deadline: "2026-09-12T10:00:00",
      organizerFullName: "علی رضایی",
    },
  ];
  const handleLeave = async (groupBuyingId) => {
    try {
      await leaveGroupBuying(groupBuyingId);
      setItems((prev) => prev.filter((item) => item.id !== groupBuyingId));
      alert("با موفقیت خارج شدید");
    } catch (err) {
      console.error("خطا در خروج:", err);
      alert("خطا در خروج");
    }
  };
  useEffect(() => {
    const fetchList = async () => {
      if (!activeBuilding?.buildingId) {
        return;
      }
      try {
        setLoading(true);
        const response = await getJoinBuy(activeBuilding.buildingId);
        //setItems(mockItems);
      } catch (err) {
        console.error("خطا در دریافت لیست:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [activeBuilding]);
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">خرید‌هایی که به آن‌ها پیوسته‌اید</h1>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : items.length === 0 ? (
        <p className="loadingtext">خرید‌ی برای نمایش وجود ندارد</p>
      ) : (
        <ul className="listcart">
          {items.map((item) => (
            <li key={item.id} className="cart">
              <Glassybackground>
                <p className="cartrow">
                  <strong>:عنوان</strong> {item.title}
                </p>
                <p className="cartrow">
                  <strong>:تعداد افرادی که پیوسته‌اند</strong>
                  {item.participantsCount}
                </p>
                <p className="cartrow">
                  <strong>:قیمت</strong> {item.price} تومان
                </p>
                <p className="cartrow">
                  <strong>:مهلت</strong>
                  {new Date(item.deadline).toLocaleDateString("fa-IR")}
                </p>
                <p className="cartrow">
                  <strong>:نام ایجادکننده</strong> {item.organizerFullName}
                </p>
                <Button
                  className="glassybutton"
                  onClick={() => handleLeave(item.id)}
                >
                  خروج
                </Button>
              </Glassybackground>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default JoinGroupBuy;
