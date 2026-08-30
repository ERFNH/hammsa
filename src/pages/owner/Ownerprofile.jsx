import Button from "../../component/Button/Button";
import "../../global.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
function Tanentprofile() {
  const navigate = useNavigate();
  const handlelogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log("خطا در خروج", error);
    }
  };
  return (
    <main className="mainglobalinpage">
      <header className="headerglobalstyle">
        <p>سیاوش لنگری خوش آمدید</p>
        <p className="globalprofile-name">مالک</p>
      </header>
      <div className="buttonglobalstyle">
        <Button className="btntobottom" onClick={() => navigate("/Newtenant")}>
          مستاجر جدید
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Showtanant")}>
          لیست مستاجرین
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/NewCowner")}>
          افزودن عضو جدید
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/ShowCoOwner")}
        >
          مشاهده اعضا
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Poll")}>
          تغییر ساختمان
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/Publicprofile")}
        >
          ویرایش پروفایل
        </Button>
      </div>
      <Button className="exit position-fx" onClick={handlelogout}>
        خروج از حساب کاربری
      </Button>
    </main>
  );
}
export default Tanentprofile;
