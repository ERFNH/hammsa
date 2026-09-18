
import Select from "../../component/Select/Select";
import Input from "../../component/Input/Input";
import "../../global.css";
import { postCreatLocalService } from "../../api/auth";
import Button from "../../component/Button/Button";
import { useBuilding } from "../../context/Buildingcontext";
import { useState } from "react";
function LocalService() {
  const { activeBuilding } = useBuilding();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [providerName, setProviderName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!activeBuilding?.buildingId) {
        alert("ساختمان فعال پیدا نشد.");
        return;
      }
      await postCreatLocalService(
        activeBuilding.buildingId,
        Number(category),
        title,
        description,
        providerName,
        contactPhone,
        workingHours,
      );
      alert("خدمات ثبت شد");
      setCategory("");
      setTitle("");
      setDescription("");
      setProviderName("");
      setContactPhone("");
      setWorkingHours("");
    } catch (err) {
      console.error("خطای خدمات", err);
      alert("ثبت خدمات با خطا مواجه شد");
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">ثبت خدمات محلی</h1>
      <form className="globalpageform" onSubmit={submit}>
        <Select
          value={category}
          onChange={setCategory}
          label="دسته بندی"
          options={[
            { value: 1, label: "تعمیرات" },
            { value: 2, label: "نظافت و خدمات منزل" },
            { value: 3, label: "آموزش و کلاس ها" },
            { value: 4, label: "حمل و نقل و رفاهی" },
            { value: 5, label: "بهداشت و سلامت" },
            { value: 6, label: "زیبایی و آرایش" },
            { value: 7, label: "حقوقی و اداری" },
            { value: 8, label: "ساختمانی و بازسازی" },
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
          label="نام ارائه دهنده"
          type="text"
          className="input-textphone"
          value={providerName}
          onChange={setProviderName}
        />
        <Input
          label="شماره تماس"
          type="number"
          className="input-textphone"
          value={contactPhone}
          onChange={setContactPhone}
        />
        <Input
          label="ساعات کاری"
          type="textarea"
          className="input-textphone"
          value={workingHours}
          onChange={setWorkingHours}
        />
        <Button className="simplebutton-wh position-fx" type="submit">
          ثبت
        </Button>
      </form>
    </main>
  );
}
export default LocalService;
