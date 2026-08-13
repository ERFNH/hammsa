import Button from "../../component/Button/Button";
import Newbuilding from "../../component/Newbuilding/Newbuilding";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import React, { useState, useEffect } from "react";
import { getMyBuilding, getUserprofile, logout } from "../../api/auth";
function ManagerProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const handlelogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("خطا در خروج", error);
    }
  };
  useEffect(() => {
    getUserprofile()
      .then((response) => {
        setUserInfo({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
        });
      })
      .catch((err) => console.log("خطا در دریافت پروفایل:", err));
    getMyBuilding()
      .then((responseserver) => {
        setBuildings(responseserver.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <main className="loadingtext">
        <p>در حال دریافت اطلاعات</p>
      </main>
    );
  }
  if (buildings.length === 0) {
    return (
      <main className="mainglobalinpage">
        <Newbuilding onCreateClick={() => navigate("/Buildinginfo")} />
      </main>
    );
  }
  return (
    <main className="mainglobalinpage">
      <header className="headerglobalstyle">
        <p>
          {userInfo
            ? `${userInfo.firstName} ${userInfo.lastName} خوش آمدید`
            : "کاربر گرامی خوش آمدید"}
        </p>
        <p className="globalprofile-name">مدیر</p>
      </header>

      <div className="buttonglobalstyle managerprf-button">
        <Button
          onClick={() => navigate("/BuildingInfo")}
          className="btntobottom"
        >
          ویرایش اطلاعات ساختمان
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/Publicprofile")}
        >
          ویرایش پروفایل
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Showrepair")}>
          خرابی های ثبت شده
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Poll")}>
          ایجاد رای گیری
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/Newannouncement")}
        >
          ایجاد اعلان جدید
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Costspage")}>
          هزینه ها
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Newowner")}>
          مالک جدید
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Transfer")}>
          انتقال مدیریت
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Changing")}>
          تغییر ساختمان
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/Showmembers")}
        >
          لیست مالکین و مستاجرین
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Newowner")}>
          تراکنش ها
        </Button>
        <Button className="exit" onClick={handlelogout}>
          خروج از حساب کاربری
        </Button>
      </div>
    </main>
  );
}
export default ManagerProfile;
