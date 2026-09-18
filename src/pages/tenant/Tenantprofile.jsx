import Button from "../../component/Button/Button";
import "../../global.css";
import { useNavigate } from "react-router-dom";
import { logout, getUserprofile } from "../../api/auth";
import { useState, useEffect } from "react";
function Tanentprofile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getUserprofile()
      .then((response) => {
        setUserInfo({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
        });
      })
      .catch((err) => console.log("خطا در دریافت پروفایل:", err));
  }, []);

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
        <p>
          {userInfo?.firstName && userInfo?.lastName
            ? `${userInfo.firstName} ${userInfo.lastName} خوش آمدید`
            : "خوش آمدید"}
        </p>
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
        <Button className="btntobottom" onClick={() => navigate("/OwnerBuilding")}>
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