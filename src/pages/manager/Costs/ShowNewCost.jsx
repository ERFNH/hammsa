import Backbutton from "../../../component/Backbutton/Backbutton";
import {
  getExpencseList,
  deleteExpence,
  putUpdateExpence,
} from "../../../api/auth";
import { useEffect, useState } from "react";
import { useBuilding } from "../../../context/Buildingcontext";
import Glassybackground from "../../../component/Glassybackground/Glassybackground";
import styles from "./ShowNewCost.module.css";
import "../../../global.css";
import Button from "../../../component/Button/Button";
import Input from "../../../component/Input/Input";
import Select from "../../../component/Select/Select";
function ShowNewCost() {
  const { activeBuilding } = useBuilding();
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const categoryMap = {
    Maintenance: "تعمیرات و نگهداری",
    Security: "نگهبانی و امنیت",
    Utilities: "قبوض",
    Management: "هزینه‌های مدیریتی",
    Other: "سایر",
  };
  const categoryOptions = [
    { value: 0, label: "تعمیرات و نگهداری" },
    { value: 1, label: "نگهبانی و امنیت" },
    { value: 2, label: "قبوض" },
    { value: 3, label: "هزینه‌های مدیریتی" },
    { value: 4, label: "سایر" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding?.buildingId) return;
      try {
        const response = await getExpencseList(activeBuilding.buildingId);
        setExpenses(response.data);
      } catch (err) {
        console.log("خطا", err.response?.data);
      }
    };
    fetchData();
  }, [activeBuilding]);
  const handleDelete = async (id) => {
    if (!window.confirm("آیا مطمئن هستید که می‌خواهید این خرید را حذف کنید؟")) {
      return;
    }
    try {
      await deleteExpence(activeBuilding.buildingId, id);
      const response = await getExpencseList(activeBuilding.buildingId);
      setExpenses(response.data);
      alert("خرید با موفقیت حذف شد.");
    } catch (err) {
      console.error("خطا در حذف خرید:", err.response?.data);
      alert("خطا در حذف خرید.");
    }
  };
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      await putUpdateExpence(
        activeBuilding.buildingId,
        editing.id,
        Number(editing.category),
        editing.title,
        Number(editing.amount)
      );
      alert("خرید با موفقیت ویرایش شد.");
      setEditing(null);
      const response = await getExpencseList(activeBuilding.buildingId);
      setExpenses(response.data);
    } catch (err) {
      console.error("خطا در ویرایش خرید:", err.response?.data);
      alert("خطا در ویرایش خرید.");
    }
  };

  const startEditing = (item) => {
    let category = item.category;
    if (typeof category === "string") {
      const categoryValues = {
        Maintenance: 0,
        Security: 1,
        Utilities: 2,
        Management: 3,
        Other: 4,
      };

      category = categoryValues[category];
    }

    setEditing({
      ...item,
      category: Number(category),
      amount: item.amount,
      title: item.title || "",
    });
  };

  return (
    <main className="mainglobalinpage">
      <Backbutton />

      <h1 className="globalpageheader">
        {editing ? "ویرایش خرید" : "لیست خریدها"}
      </h1>

      {editing ? (
        <div className="globalpageform">
          <Select
            label="دسته‌بندی"
            options={categoryOptions}
            value={editing.category}
            onChange={(val) =>
              setEditing((prev) => ({
                ...prev,
                category: Number(val),
              }))
            }
          />

          <Input
            className="input-label input-textphone"
            type="text"
            value={editing.title}
            onChange={(val) =>
              setEditing((prev) => ({
                ...prev,
                title: val,
              }))
            }
            label="عنوان"
          />

          <Input
            className="input-label input-textphone"
            type="number"
            value={editing.amount}
            onChange={(val) =>
              setEditing((prev) => ({
                ...prev,
                amount: val,
              }))
            }
            label="مبلغ"
          />

          <div className={styles.editButtons}>
            <Button className="simplebutton" onClick={handleUpdate}>
              ذخیره
            </Button>

            <Button
              className="simplebutton"
              onClick={() => setEditing(null)}
            >
              لغو
            </Button>
          </div>
        </div>
      ) : (
        <ul className="globalpageform">
          {expenses.map((item) => (
            <Glassybackground key={item.id}>
              <li className={styles.liststyle}>
                <div className="globallightbackground">
                  <h2 className="globalpageheader">
                    {categoryMap[item.category] || item.category}
                  </h2>

                  <div className={styles.listrow}>
                    <p>{item.title}</p>
                    <p>{item.amount} تومان</p>
                  </div>
                </div>

                <div className={styles.btn}>
                  <Button
                    className="simplebutton"
                    onClick={() => startEditing(item)}
                  >
                    ویرایش
                  </Button>

                  <Button
                    className="simplebutton"
                    onClick={() => handleDelete(item.id)}
                  >
                    حذف
                  </Button>
                </div>
              </li>
            </Glassybackground>
          ))}
        </ul>
      )}
    </main>
  );
}

export default ShowNewCost;