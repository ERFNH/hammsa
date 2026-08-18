import { useState } from "react";
import "./Verifyotp.css";
import logo from "../../assets/images/logo.svg";
import Button from "../../component/Button/Button";
import Otpinput from "../../component/Otpinput/Otpinput";
import { verifyOtp } from "../../api/auth";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const phone = localStorage.getItem("phone");
  const submit = async () => {
    console.log("phone:", phone);
    console.log("otp:", otp);
    if (!phone) {
      alert("شماره موبایل پیدا نشد.");
      navigate("/");
      return;
    }
    if (otp.length !== 5) {
      alert("لطفا کد تایید را کامل وارد کنید.");
      return;
    }
    try {
      const response = await verifyOtp(phone, otp);
      console.log("LOGIN PHONE:", phone);
      console.log("NEW TOKEN:", response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log(localStorage.getItem("token"));
      navigate("/Welcome");
    } catch (error) {
      console.log(error.response?.data);
      alert("کد تایید اشتباه است.");
    }
  };

  return (
    <main>
      <section className="Verify">
        <div className="logo">
          <img src={logo} alt="لوگوی همسا" className="main-logo-img" />
        </div>
        <div className="Verify-box">
          <h1 className="Verify-title">کد تایید را وارد کنید</h1>
          <div className="verify-edit">
            <Button className="edit" onClick={() => navigate("/")}>
              ویرایش
            </Button>
            <p className="number">شماره موبایل {phone}</p>
          </div>
          <Otpinput value={otp} onChange={setOtp} />
          <Button className="btn" onClick={submit}>
            تایید و ورود
          </Button>
        </div>
      </section>
    </main>
  );
}

export default VerifyOtp;
