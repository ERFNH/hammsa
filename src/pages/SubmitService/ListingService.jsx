import { useState } from "react";
import Backbutton from "../../component/Backbutton/Backbutton";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import Select from "../../component/Select/Select";
import { useBuilding } from "../../context/Buildingcontext";
import { postListingService } from "../../api/auth";
import "../../global.css";
function ListingService() {
  const { activeBuilding } = useBuilding();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [Image, setImage] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("buildingId", activeBuilding.buildingId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", Number(type));
      formData.append("price", Number(price));
      formData.append("contactPhone", contactPhone);
      if (Image) {
        formData.append("image", Image);
      }
      console.log("FormData:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await postListingService(formData);
      alert("آگهی ثبت شد");
      setType("");
      setTitle("");
      setDescription("");
      setPrice("");
      setContactPhone("");
      setImage(null);
    } catch (err) {
      console.log(" پاسخ سرور:", err.response?.data);
      alert("ثبت آگهی با خطا مواجه شد");
    }
  };
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">ثبت آگهی</h1>
      <form className="globalpageform" onSubmit={submit}>
        <Select
          label="دسته بندی"
          options={[
            { value: 0, label: "فروش" },
            { value: 1, label: "قرض دادن" },
            { value: 2, label: "اهدای رایگان" },
          ]}
          value={type}
          onChange={setType}
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
          type="text"
          className="input-textphone"
          value={description}
          onChange={setDescription}
        />
        <Input
          label="مبلغ"
          type="number"
          className="input-textphone"
          value={price}
          onChange={setPrice}
        />
        <Input
          label="شماره تماس"
          type="number"
          className="input-textphone"
          value={contactPhone}
          onChange={setContactPhone}
        />
        <div className="fileinput">
          <input
            id="fileimage"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="fileimage">آپلود تصویر آگهی</label>
        </div>
        <Button
          className="simplebutton-wh position-fx"
          type="submit"
        >
          ثبت
        </Button>
      </form>
    </main>
  );
}
export default ListingService;