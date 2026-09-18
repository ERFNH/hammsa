import Button from "../../component/Button/Button";
import "../../global.css";
import { useNavigate } from "react-router-dom";
import { logout, getUserprofile } from "../../api/auth";
import { useState, useEffect } from "react";

function Tenantprofile() {
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
        <p className="globalprofile-name">مستاجر</p>
      </header>
      <div className="buttonglobalstyle">
        <Button
          className="btntobottom"
          onClick={() => navigate("/Publicprofile")}
        >
          ویرایش پروفایل
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/NewCotenant")}
        >
          افزودن اعضای خانواده
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/ShowCoOwner")}
        >
          مشاهده اعضا
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/TenantBuilding")}>
          تغییر ساختمان
        </Button>
      </div>
      <Button onClick={handlelogout} className="exit position-fx">
        خروج از حساب کاربری
      </Button>
    </main>
  );
}

export default Tenantprofile;