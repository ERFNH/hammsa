import { postCreatGroupBuy } from "../../api/auth";
import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Backbutton from "../../component/Backbutton/Backbutton";
import Datepick from "../../component/Datepick/Datepick";
import { useBuilding } from "../../context/Buildingcontext";
import "../../global.css";
import {  useState } from "react";
function GroupService() {
  const { activeBuilding } = useBuilding();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    console.log(activeBuilding.buildingId);
    try {
      await postCreatGroupBuy(
        activeBuilding.buildingId,
        title,
        Number(minimumQuantity),
        Number(price),
        deadline,
      );
      alert("خرید گروهی ثبت شد");
      setTitle("")
      setPrice("")
      setDeadline(null)
      setMinimumQuantity("")
    } catch (err) {
      alert("خطا در ثبت");
    }
  };
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">ثبت خرید گروهی</h1>
      <Backbutton />
      <form className="globalpageform" onSubmit={submit}>
        <Input
          value={title}
          onChange={setTitle}
          type="text"
          label="عنوان"
          className="input-textphone"
        />
        <Input
          value={price}
          onChange={setPrice}
          type="number"
          label="قیمت"
          className="input-textphone"
        />
        <Datepick value={deadline} onChange={setDeadline} label="مهلت خرید" />
        <Input
          value={minimumQuantity}
          onChange={setMinimumQuantity}
          type="number"
          label="حداقل تعداد خرید"
          className="input-label input-number"
        />
        <Button className="simplebutton-wh position-fx" type="submit">
          ثبت
        </Button>
      </form>
    </main>
  );
}
export default GroupService;
