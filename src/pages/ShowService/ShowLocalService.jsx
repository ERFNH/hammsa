import Backbutton from "../../component/Backbutton/Backbutton";
import { getLocalService } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import { useEffect, useState } from "react";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import Button from "../../component/Button/Button";
import styles from "./ShowLocalService.module.css";
import Search from "../../component/Search/Search";
import { useNavigate } from "react-router-dom";
function ShowLocalService() {
  const { activeBuilding } = useBuilding();
  const [localServices, setLocalServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const getCategoryName = (categoryId) => {
    const categories = {
      1: "تعمیرات",
      2: "نظافت و خدمات منزل",
      3: "آموزش و کلاس ها",
      4: "حمل و نقل و رفاهی",
      5: "بهداشت و سلامت",
      6: "زیبایی و آرایش",
      7: "حقوقی و اداری",
      8: "ساختمانی و بازسازی",
    };
    return categories[categoryId] || "سایر";
  };
  const filteredServices = localServices.filter((item) =>
    getCategoryName(item.category).includes(searchTerm),
  );
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding) return;
      if (!activeBuilding.buildingId) {
        return;
      }
      try {
        setLoading(true);
        const response = await getLocalService(activeBuilding.buildingId);
        setLocalServices(response.data || []);
      } catch (err) {
        console.error("خطا در دریافت خدمات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding]);
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <div className="searcHeader">
        <h1 className="globalpageheader">لیست خدمات محلی</h1>
        <Search value={searchTerm} onChange={setSearchTerm} />
      </div>
      {loading ? (
        <p>در حال دریافت اطلاعات</p>
      ) : (
        <>
          {filteredServices.length === 0 ? (
            <div style={{ display: "none" }}></div>
          ) : (
            <ul className="listcart">
              {filteredServices.map((item) => (
                <li key={item.id} className="cart">
                  <Glassybackground>
                    <header>
                      <h3>{getCategoryName(item.category)}</h3>
                      <p>{item.title}</p>
                    </header>
                    <Button
                      className="simplebutton info"
                      onClick={() => navigate(`/LocalServiceDetail/${item.id}`)}
                    >
                      جزئیات
                    </Button>
                  </Glassybackground>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

export default ShowLocalService;
