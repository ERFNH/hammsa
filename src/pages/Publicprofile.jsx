import Backbutton from "../component/Backbutton/Backbutton";
import styles from "./Publicprofile.module.css";
import Input from "../component/Input/Input";
import Button from "../component/Button/Button";
import { useState } from "react";
import { putUserprofile } from "../api/auth";
import { useNavigate } from "react-router-dom";
function Publicprofile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("دیتای ارسالی:", { firstName: firstname, lastName: lastname });
    try {
      const response = await putUserprofile(firstname, lastname);
      alert("اطلاعات شما ثبت شد");
      navigate("/Welcome");
    } catch (error) {
      console.error("خطای کامل:", error.response?.data);
      alert("خطا در ثبت اطلاعات");
    }
  };
  return (
    <form className={styles.mainPublicprofile} onSubmit={handlesubmit}>
      <Backbutton />
      <h1 className={styles.headerpublicprofil}>ویرایش پروفایل</h1>
      <Input
        className="input-label input-textphone"
        label="نام"
        type="text"
        value={firstname}
        onChange={setFirstname}
      />
      <Input
        className="input-label input-textphone"
        label="نام خانوادگی"
        type="text"
        value={lastname}
        onChange={setLastname}
      />
      <Button type="submit" className="simplebutton-wh position-fx">
        ویرایش پروفایل
      </Button>
    </form>
  );
}
export default Publicprofile;
