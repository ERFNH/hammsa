import { useNavigate } from "react-router-dom";
import Button from "../../component/Button/Button";
import "../../global.css";
function ShowServPage() {
  const navigate = useNavigate();
  return (
    <main className="mainglobalinpage">
      <div className="buttonglobalstyle">
        <Button
          className="btntobottom"
          onClick={() => {
            navigate("/ShowListingService");
          }}
        >
          آگهی همسایگان
        </Button>
        <Button
          className="btntobottom"
          onClick={() => {
            navigate("/ShowLocalService");
          }}
        >
          خدمات
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/ShowGroupSerive")}
        >
          خرید گروهی
        </Button>
        <Button className="btntobottom">رویداد همسایگان</Button>
      </div>
    </main>
  );
}
export default ShowServPage;
