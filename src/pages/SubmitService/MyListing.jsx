import { useEffect, useState } from "react";
import Backbutton from "../../component/Backbutton/Backbutton";
import { getMyListing, delMyListing } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import Button from "../../component/Button/Button";
import "../../global.css";
function MyListing() {
  const { activeBuilding } = useBuilding();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTypeLabel = (type) => {
    const types = {
      0: "فروش",
      1: "قرض دادن",
      2: "اهدای رایگان",
    };
    return types[type] || type;
  };
  useEffect(() => {
    const fetchList = async () => {
      if (!activeBuilding?.buildingId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getMyListing(activeBuilding.buildingId);
        setListings(response.data || []);
      } catch (err) {
        console.error("خطا در دریافت آگهی‌ها:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [activeBuilding]);
  const handleDelete = async (id) => {
    if (!window.confirm("آیا مطمئن هستید که می‌خواهید این آگهی را حذف کنید؟"))
      return;
    try {
      await delMyListing(id);
      setListings((prev) => prev.filter((item) => item.id !== id));
      alert("آگهی با موفقیت حذف شد.");
    } catch (err) {
      console.error("خطا در حذف آگهی:", err);
      alert("خطا در حذف آگهی.");
    }
  };
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">آگهی‌های من</h1>

      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : listings.length === 0 ? (
        <p className="loadingtext">آگهی ثبت نشده است</p>
      ) : (
        <div className="listcart">
          {listings.map((item) => (
            <div key={item.id} className="cart">
              <Glassybackground>
                <header>
                  <h3>{getTypeLabel(item.type)}</h3>
                  <p>{item.title}</p>
                </header>
                <Button
                  className="simplebutton"
                  onClick={() => handleDelete(item.id)}
                >
                  حذف
                </Button>
              </Glassybackground>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyListing;
