import Backbutton from "../../component/Backbutton/Backbutton";
import { getResident } from "../../api/auth";
import { useEffect, useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import Search from "../../component/Search/Search";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import "../../global.css";
import Button from "../../component/Button/Button";
import { useNavigate } from "react-router-dom";
function ShowResidentService() {
  const { activeBuilding } = useBuilding();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchList = async () => {
      if (!activeBuilding?.buildingId) {
        return;
      }
      try {
        setLoading(true);
        const response = await getResident(activeBuilding.buildingId);
        setItems(response.data?.items || []);
      } catch (err) {
        console.error("خطا در دریافت لیست:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [activeBuilding]);
  const filteredItems = items.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const organizer = item.organizerFullName?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return title.includes(search) || organizer.includes(search);
  });
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <div className="searcHeader">
        <h1 className="globalpageheader">رویدادهای ساکنین</h1>
        <Search value={searchTerm} onChange={setSearchTerm} />
      </div>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : filteredItems.length === 0 ? (
        <p className="loadingtext">رویدادی برای نمایش وجود ندارد</p>
      ) : (
        <ul className="listcart">
          {filteredItems.map((item) => (
            <li key={item.id} className="cart">
              <Glassybackground>
                <p className="cartrow">
                  <strong>عنوان:</strong> {item.title}
                </p>
                <p className="cartrow">
                  <strong>نام ایجادکننده:</strong> {item.organizerFullName}
                </p>
                <Button
                  className="simplebutton"
                  onClick={() => navigate(`/ResidentServiceDetail/${item.id}`)}
                >
                  جزئیات
                </Button>
              </Glassybackground>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default ShowResidentService;
