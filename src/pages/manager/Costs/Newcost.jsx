import Input from "../../../component/Input/Input";
import Button from "../../../component/Button/Button";
import Select from "../../../component/Select/Select";
import { useState } from "react";
import { useBuilding } from "../../../context/Buildingcontext";
import { postCreateExpense } from "../../../api/auth";
import "../../../global.css";
function Newcosts() {
  const { activeBuilding } = useBuilding();
  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postCreateExpense(
        activeBuilding.buildingId,
        Number(category),
        title,
        Number(cost),
      );
      alert("اطلاعات ثبت شد ")
      setCategory(0)
      setTitle("")
      setCost("")
    } catch (err) {
      console.error("خطا در ثبت ", err.response?.data);
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">خرید جدید</h1>
      <form className="globalpageform" onSubmit={handleSubmit}>
        <Select
          label="دسته بندی"
          value={category}
          onChange={setCategory}
          options={[
            { value: 0, label: "تعمیرات و نگهداری" },
            { value: 1, label: "نگهبانی و امننیت" },
            { value: 2, label: "قبوض" },
            { value: 3, label: "هزینه های مدیریتی" },
            { value: 4, label: "سایر" },
          ]}
        />
        <Input
          className="input-label input-textphone"
          value={title}
          onChange={setTitle}
          label="عنوان"
          type="text"
        />
        <Input
          value={cost}
          onChange={setCost}
          className="input-label input-textphone"
          label="هزینه"
          type="number"
        />
        <Button type="submit" className="simplebutton-wh position-fx">
          ثبت
        </Button>
      </form>
    </main>
  );
}
export default Newcosts;
