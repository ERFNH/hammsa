import React, { useState } from "react";
import "./Requestotp.css";
import logo from "../../assets/images/logo.svg";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import Layout from "../../component/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../api/auth";
function Requestotp() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const submit = async () => {
    if (phone.length !== 11) {
      alert("شماره موبایل باید ۱۱ رقم باشد.");
      return;
    }
    try {
      await sendOtp(phone);
      localStorage.setItem("phone", phone);
      navigate("/verify");
    } catch (error) {
      alert("ارسال کد با خطا مواجه شد.");
      console.log(error);
    }
  };
  const Change = (value) => {
    if (/^\d*$/.test(value) && value.length <= 11) {
      setPhone(value);
    }
  };

  return (
    <main>
      <section className="login">
        <div className="logo">
          <img src={logo} alt="لوگوی همسا" />
        </div>
        <form className="login-box">
          <h1 className="login-title">شماره موبایل خود را وارد کنید</h1>
          <Input
            groupClassName="reqphone"
            type="tel"
            name="phone"
            placeholder="09999999999"
            value={phone}
            onChange={Change}
          />
          <Button className="btn" type="button" onClick={submit}>
            دریافت کد تایید
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Requestotp;
