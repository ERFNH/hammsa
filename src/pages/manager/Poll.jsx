import { useState } from "react";
import Input from "../../component/Input/Input";
import Backbutton from "../../component/Backbutton/Backbutton";
import Button from "../../component/Button/Button";
import Select from "../../component/Select/Select";
import Datepick from "../../component/Datepick/Datepick";
import Addoption from "../../component/Addoption/Addoption";
import { useBuilding } from "../../context/Buildingcontext";
import { useNavigate } from "react-router-dom";
import { Newpoll } from "../../api/auth";
import "../../global.css";
function Poll() {
  const { activeBuilding } = useBuilding();
  const buildingId = activeBuilding?.buildingId;
  const [pollDeadline, setPollDeadline] = useState(null);
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    {
      /*  if (!buildingId) {
    alert("لطفاً ابتدا یک ساختمان انتخاب کنید");
    setLoading(false);
    return;
   }
    */
    }
    if (!title.trim() || !pollDeadline || options.length === 0) {
      setLoading(false);
      return;
    }
    try {
      await Newpoll(
        buildingId,
        title,
        description,
        Number(audience),
        pollDeadline,
        options,
      );
      alert("اطلاعات ثبت شد");
      setTitle("");
      setDescription("");
      setAudience(1);
      setPollDeadline(null);
      setOptions([]);
    } catch (err) {
      console.error("خطا:", err);
      console.error("خطای کامل سرور:", err.response?.data);
      console.log(err.response?.data.errors);
      console.log(typeof audience, audience);
      alert("خطا در ارسال اطلاعات");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">ایجاد رای گیری</h1>
      <form onSubmit={handleSubmit} className="globalpageform">
        <Input
          className="input-textphone"
          label="رای گیری برای"
          type="text"
          value={title}
          onChange={setTitle}
        />
        <Input
          className="input-textphone"
          label="توضیحات"
          type="textarea"
          value={description}
          onChange={setDescription}
        />
        <Select
          label="مخاطبان رای گیری"
          value={audience}
          onChange={setAudience}
          options={[
            { value: 0, label: "همه" },
            { value: 1, label: "مالکین" },
            { value: 2, label: "مستاجرین" },
          ]}
        />
        <Datepick
          label="مهلت رأی گیری"
          value={pollDeadline}
          onChange={setPollDeadline}
        />
        <Addoption
          options={options}
          onChange={setOptions}
          placeholder="متن گزینه را وارد کنید"
        />
        <Button
          type="submit"
          className="simplebutton-wh position-fx"
          disabled={loading}
          onClick={() => navigate("/Managerprofile")}
        >
          ثبت
        </Button>
      </form>
    </main>
  );
}
export default Poll;
