import React, { useState } from "react";
import "./Similarnewform.css"
import Input from "../../component/Input/Input";
import Select from "../../component/Select/Select";
import Button from "../../component/Button/Button";
function Similarnewform({ pageTitle, onSubmit }) {
  const [subject, setSubject] = useState("");
  const [discription, setdiscription] = useState("");
  const [priority, setPriority] = useState("");
  const handleSubmit = () => {
    onSubmit({ subject, discription, priority });
  };
  return (
    <main className="main-announcment">
      <h1 className="announcment-header">{pageTitle}</h1>
      <div className="announcment-input">
        <Input
          className="input-textphone"
          label="عنوان"
          type="text"
          value={subject}
          onChange={setSubject}
        />
        <Input
          className="input-textphone"
          label="توضیحات"
          type="textarea"
          value={discription}
          onChange={setdiscription}
        />
        <Select
          label="اولویت"
          value={priority}
          onChange={(val) => setPriority(Number(val))}
          options={[
            { value: 1, label: "مهم" },
            { value: 2, label: "عادی" },
          ]}
        />
        <Button
          type="submit"
          className="simplebutton-wh position-fx"
          onClick={handleSubmit}
        >
          ثبت
        </Button>
      </div>
    </main>
  );
}

export default Similarnewform;