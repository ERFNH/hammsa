import { useState } from "react";
import Buildingimage from "../assets/images/buildingimage.png";
import Button from "../component/Button/Button";
import Welcomelayout from "../component/Layout/Welcomelayout";
import "./Welcome.css";

function Welcome() {
  const phone = localStorage.getItem("phone");
  return (
    <main>
      <header className="welcome-header">
        <img src={Buildingimage} alt="" className="buildingimage" />
        <div className="welcome-box">
          <h1 className="welcomebox-title">
            <span>به همسا خوش آمدید</span>
            <span>{phone}</span>
          </h1>
          <Button className="simplebutton">
            {" "}
            برای تکمیل پروفایل کلیک کنید{" "}
          </Button>
        </div>
      </header>
      <section className="Welcome-firstbox">
        <div className="firstbox-detail">
          <p className="firstbox-item">700000 تومان</p>
          <p className="firstbox-desc">شارژ</p>
          <p className="firstbox-item">پرداخت نشده</p>
          <p className="firstbox-desc">وضعیت</p>
        </div>
        <Button className="simplebutton">امور مالی و پرداخت</Button>
      </section>
      <section className="welcome-button">
        <Button className="welcomebutton">رای گیری فعال</Button>
        <Button className="welcomebutton">ثبت خرابی</Button>
        <Button className="welcomebutton">خدمات محلی</Button>
        <Button className="welcomebutton">رزرو</Button>
        <Button className="welcomebutton">اعلانات</Button>
        <Button className="welcomebutton">چالش های گروهی</Button>
      </section>
    </main>
  );
}
export default Welcome;
