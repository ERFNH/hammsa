import Button from "../../component/Button/Button";
import Newbuilding from "../../component/Newbuilding/Newbuilding";
import { useNavigate } from "react-router-dom";
import "./Managerprofile.css";
import "../../global.css";
import React, { useState, useEffect } from "react";
import { getMyBuilding } from "../../api/auth";
function ManagerProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
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
      <main className="managerprofile-main">
        <p>در حال دریافت اطلاعات</p>
      </main>
    );
  }
  if (buildings.length === 0) {
    return (
      <main className="managerprofile-main">
        <Newbuilding onCreateClick={() => navigate("/Buildinginfo")} />
      </main>
    );
  }
  return (
    <main className="managerprofile-main">
      <header className="managerprofile-header">
        <p>“سیاوش لنگری” خوش آمدید</p>
        <p className="managerprofile-name">مدیر</p>
      </header>

        <div className="managerprofile-button managerprf-button">
          <Button onClick={() => navigate("/BuildingInfo")} className="btntobottom">
            ویرایش اطلاعات ساختمان
          </Button>
          <Button className="btntobottom">ویرایش پروفایل</Button>
          <Button className="btntobottom">خرابی های ثبت شده</Button>
          <Button className="btntobottom">ایجاد رای گیری جدید</Button>
          <Button className="btntobottom">ایجاد اعلان جدید</Button>
          <Button className="btntobottom">هزینه ها</Button>
          <Button className="btntobottom" onClick={() => navigate("/Newowner")}>مالک جدید</Button>
          <Button className="btntobottom">انتقال مدیریت</Button>
          <Button className="btntobottom" onClick={() => navigate("/Changing")}>تغییر ساختمان</Button>
          <Button className="btntobottom">لیست مالکین و مستاجرین</Button>
        </div>

      <Button className="exit">خروج از حساب کاربری</Button>
    </main>
  );
}
export default ManagerProfile;
