import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Select from "../../component/Select/Select";
import { useState } from "react";
import { useBuilding } from "../../context/Buildingcontext";
import { createResidentEvent } from "../../api/auth";
import "../../global.css";
function ResisdentService() {
  const { activeBuilding } = useBuilding();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(1);
  const [description, setDescription] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");
  const [eventTime, setEventTime] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!activeBuilding?.buildingId) {
        return;
      }
      await createResidentEvent(
        activeBuilding.buildingId,
        Number(category),
        title,
        description,
        Number(registrationFee),
        eventTime,
      );
      alert("رویداد با موفقیت ثبت شد.");
      setTitle("")
      setCategory("")
      setDescription("")
      setRegistrationFee("")
      setEventTime([])
    } catch (err) {
      console.error("خطا در ثبت رویداد:", err);
      alert("خطا در ثبت رویداد.");
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">ثبت رویداد</h1>
      <form className="globalpageform" onSubmit={handleSubmit}>
        <Select
          label="دسته بندی"
          value={category}
          onChange={setCategory}
          options={[
            { value: 1, label: "آشپزی" },
            { value: 2, label: "آموزشی" },
            { value: 3, label: "زیبایی" },
            { value: 4, label: "فنی" },
            { value: 5, label: "ورزشی" },
            { value: 6, label: "کتابخوانی" },
            { value: 7, label: "والدین" },
          ]}
        />
        <Input
          label="عنوان"
          type="text"
          className="input-textphone"
          value={title}
          onChange={setTitle}
        />
        <Input
          label="توضیحات"
          type="textarea"
          className="input-textphone"
          value={description}
          onChange={setDescription}
        />
        <Input
          label="زمان‌های برگزاری"
          type="textarea"
          className="input-textphone"
          value={eventTime}
          onChange={setEventTime}
        />
        <Input
          label="هزینه ثبت نام"
          type="number"
          className="input-textphone"
          value={registrationFee}
          onChange={setRegistrationFee}
        />
        <Button className="simplebutton-wh position-fx" type="submit">
          ثبت
        </Button>
      </form>
    </main>
  );
}
export default ResisdentService;
