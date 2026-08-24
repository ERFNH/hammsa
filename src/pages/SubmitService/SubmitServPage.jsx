import { useNavigate } from "react-router-dom";
import Button from "../../component/Button/Button";
import "../../global.css";
function SubmitServPage() {
  const navigate = useNavigate();
  return (
    <main className="mainglobalinpage">
      <div className="buttonglobalstyle">
        <Button
          className="btntobottom"
          onClick={() => navigate("/ListingService")}
        >
          ثبت آگهی جدید
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/MyListing")}>
          آگهی‌های من
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/LocalService")}
        >
          ثبت خدمات
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/GroupService")}
        >
          ثبت خرید گروهی
        </Button>
        <Button className="btntobottom">خرید های گروهی ایجاد شده</Button>
        <Button className="btntobottom">خریدهایی که پیوسته‌اید</Button>
        <Button className="btntobottom">ثبت رویداد</Button>
        <Button className="btntobottom">رویدادهای من </Button>
        <Button className="btntobottom">رویدادهایی که پیوسته‌اید</Button>
      </div>
    </main>
  );
}
export default SubmitServPage;
