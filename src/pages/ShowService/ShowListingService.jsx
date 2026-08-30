import Backbutton from "../../component/Backbutton/Backbutton";
import Search from "../../component/Search/Search";
import { useState, useEffect } from "react";
import "../../global.css";
import { getListingList } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import Button from "../../component/Button/Button";
import { useNavigate } from "react-router-dom";
function ShowListingService() {
  const { activeBuilding } = useBuilding();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const gettypeName = (typeId) => {
    const type = {
      0: "فروش",
      1: " قرض دادن ",
      2: " اهدای رایگان",
    };
    return type[typeId] || "سایر";
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding?.buildingId) {
        return;
      }
      try {
        setLoading(true);
        const response = await getListingList(activeBuilding.buildingId);
        setListings(response.data || []);
      } catch (err) {
        console.error("خطا در دریافت آگهی‌ها:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding]);
  const filteredListings = listings.filter((item) => {
    return item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || "";
  });
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <div className="searcHeader">
        <h1 className="globalpageheader">آگهی همسایگان</h1>
        <Search value={searchTerm} onChange={setSearchTerm} />
      </div>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : filteredListings.length === 0 ? (
        <p className="loadingtext">آگهی وجود ندارد</p>
      ) : (
        <div className="listcart">
          {filteredListings.map((item) => (
            <div key={item.id} className="cart">
              <Glassybackground>
                <header>
                  <h3>{gettypeName(item.type)}</h3>
                  <p>{item.title}</p>
                </header>
                <Button
                  className="simplebutton info"
                  onClick={() => navigate(`/ListingDetail/${item.id}`)}
                >
                  جزئیات
                </Button>
              </Glassybackground>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ShowListingService;
