import { useEffect, useState } from "react";
import { getGroupBuy } from "../../api/auth";
import Backbutton from "../../component/Backbutton/Backbutton";
import { useBuilding } from "../../context/Buildingcontext";
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
        setItems(response.data || []);
      } catch (err) {
        console.error("خطا در دریافت لیست:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [activeBuilding]);
  return (
    <main>
      <Backbutton />
      {loading ? (
        <p>در حال دریافت اطلاعات</p>
      ) : items.length === 0 ? (
        <p>لیست خالی است</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <p>
                <strong>عنوان:</strong> {item.title}
              </p>
              <p>
                <strong>قیمت:</strong> {item.price} تومان
              </p>
              <p>
                <strong>حداقل تعداد:</strong> {item.minimumQuantity}
              </p>
              <p>
                <strong>مهلت:</strong> {item.deadline}
              </p>
              <p>
                <strong>واحد:</strong> {item.unitNumber || "—"}
              </p>
              <p>
                <strong>بلوک:</strong> {item.block || "—"}
              </p>
              <p>
                <strong>طبقه:</strong> {item.floor || "—"}
              </p>
              <p>
                <strong>نام ایجادکننده:</strong> {item.creatorName || "—"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default ShowGroupSerive;
