import { useEffect, useState } from "react";
import { getGroupBuy, joinGroupBuying } from "../../api/auth";
import Backbutton from "../../component/Backbutton/Backbutton";
import { useBuilding } from "../../context/Buildingcontext";
import "../../global.css";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import Button from "../../component/Button/Button";
function ShowGroupSerive() {
  const { activeBuilding } = useBuilding();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchList = async () => {
      if (!activeBuilding?.buildingId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getGroupBuy(activeBuilding.buildingId);
        setItems(response.data?.items || []);
      } catch (err) {
        console.error("خطا در دریافت لیست:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [activeBuilding]);
  const handleJoin = async (groupBuyingId) => {
    if (
      !window.confirm(
        "آیا مطمئن هستید که می‌خواهید به این خرید گروهی بپیوندید؟",
      )
    )
      return;
    try {
      await joinGroupBuying(groupBuyingId);
      alert("با موفقیت پیوستید");
      const response = await getGroupBuy(activeBuilding.buildingId);
      setItems(response.data?.items || []);
    } catch (err) {
      console.error("خطا در پیوستن:", err);
      alert("خطا در پیوستن");
    }
  };
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">خرید‌های گروهی ایجاد شده</h1>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : items.length === 0 ? (
        <div style={{ display: "none" }}></div>
      ) : (
        <ul className="listcart">
          {items.map((item) => (
            <li key={item.id} className="cart">
              <Glassybackground>
                <section className="listcart">
                  <div className="cartrowflex">
                    <p>{new Date(item.deadline).toLocaleDateString("fa-IR")}</p>
                    <strong>{item.title}</strong>
                  </div>
                  <p className="cartrow">
                    <strong>:نام ایجادکننده</strong>
                    {item.organizerFullName || "—"}
                  </p>
                  <p className="cartrowflex">
                    {item.block || "—"}
                    <strong>بلوک</strong>
                    {item.floor || "—"}
                    <strong>طبقه</strong>
                    {item.unitNumber || "—"}
                    <strong>واحد</strong>
                  </p>
                  <p className="cartrow">
                    <strong>:تعداد خریداران</strong>
                    {item.joinedUnitsCount}
                  </p>
                  <p className="cartrow">
                    <strong>:قیمت</strong> تومان{item.price}
                  </p>
                  {!item.hasJoined && !item.isMine && (
                    <Button
                      className="flexbutton"
                      onClick={() => handleJoin(item.id)}
                    >
                      پیوستن
                    </Button>
                  )}
                </section>
              </Glassybackground>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default ShowGroupSerive;
