import Backbutton from "../../component/Backbutton/Backbutton";
import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Select from "../../component/Select/Select";
import "../../global.css";
function ResisdentService() {
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">ثبت رویداد </h1>
      <form className="globalpageform">
        <Select
          label="دسته بندی"
          options={[
            { value: 1, label: "آشپزی" },
            { value: 2, label: "" },
            { value: 3, label: "" },
            { value: 4, label: "" },
            { value: 5, label: "" },
            { value: 6, label: "" },
          ]}
        />
        <Input label="عنوان" type="text" className="input-textphone" />
        <Button className="simplebutton-wh position-fx" type="submit">
          ثبت
        </Button>
      </form>
    </main>
  );
}
export default ResisdentService;
