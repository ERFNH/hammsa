import { useState } from "react";
import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Option from "../../component/Option/Option";
import Select from "../../component/Select/Select";
import "../../global.css";
import { useBuilding } from "../../context/Buildingcontext";
import { postChalengeRegister } from "../../api/auth";
import { useNavigate } from "react-router-dom";
function ChalengRegister() {
  const { activeBuilding } = useBuilding();
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(1);
  const [sportsBackground, setSportsBackground] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postChalengeRegister(
        activeBuilding.buildingId,
        Number(age),
        gender,
        Number(sportsBackground),
      );
      alert("ثبت نام با موفقیت انجام شد");
      setAge("")
      setGender(1)
      setSportsBackground("")
    } catch (err) {
      console.error("خطا:", err);
      console.error(err?.response?.data)
      alert(err?.response?.data?.message || "خطا در ثبت نام");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">مشخصاتت رو وارد کن</h1>
      <form className="globalpageform" onSubmit={handleSubmit}>
        <Input
          type="number"
          label="سن"
          className="input-textphone"
          value={age}
          onChange={setAge}
        />
        <Select
          label="سابقه ورزشی"
          value={sportsBackground}
          onChange={setSportsBackground}
          options={[
            { value: 1, label: "مبتدی" },
            { value: 2, label: "متوسط" },
            { value: 3, label: "حرفه‌ای" },
          ]}
        />
        <Option
          value={gender}
          onChange={setGender}
          first={{ value: 1, label: "مرد" }}
          second={{ value: 2, label: "زن" }}
        />
        <Button
          className="simplebutton-wh position-fx"
          type="submit"
        >
          ثبت نام
        </Button>
      </form>
    </main>
  );
}
export default ChalengRegister;
