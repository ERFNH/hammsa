import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Backbutton from "../../component/Backbutton/Backbutton";
import { getResidentDitail, postRegisterRes } from "../../api/auth";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import "../../global.css";
import Button from "../../component/Button/Button";
function ResidentServiceDetail() {
  const { eventId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const response = await getResidentDitail(eventId);
        setItem(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [eventId]);
  const handleSubmit = async () => {
    try {
      await postRegisterRes(eventId);
      alert("با موفقیت ثبت نام شد");
    } catch (err) {
      console.error("خطا در ثبت نام:", err);
      alert("خطا در ثبت نام");
    }
  };
  const getCategoryName = (categoryId) => {
    const categories = {
      1: "آشپزی",
      2: "آموزشی",
      3: "زیبایی",
      4: "فنی",
      5: "ورزشی",
      6: "کتابخوانی",
      7: "والدین",
    };
    return categories[categoryId] || "سایر";
  };
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">جزئیات رویداد</h1>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : !item ? (
        <p className="loadingtext">رویداد مورد نظر یافت نشد</p>
      ) : (
        <>
          <div className="cart globalcenterpage">
            <Glassybackground>
              <p className="cartrow">
                <strong> :ایجادکننده</strong> {item.organizerFullName}
              </p>
              <p className="cartrow">
                <strong>:دسته بندی</strong> {getCategoryName(item.category)}
              </p>
              <p className="cartrow">
                <strong>:عنوان</strong> {item.title}
              </p>
              <p className="cartrow">
                <strong>:توضیحات</strong> {item.description}
              </p>
              <p className="cartrow">
                <strong className="longText">:زمان برگزاری</strong>
                <div className="longText">{item.eventTime}</div>
              </p>
              <p className="cartrow">
                
                <strong>:شماره تماس</strong> {item.contactPhone}
              </p>
              <p className="cartrow">
                <strong>:مکان</strong> {item.location}
              </p>
              <p className="cartrow">
                <strong>:هزینه ثبت نام</strong>تومان {item.registrationFee}
              </p>
              {!item.isMine && (
                <Button className="glassybutton" onClick={handleSubmit}>
                  ثبت نام
                </Button>
              )}
            </Glassybackground>
          </div>
        </>
      )}
    </main>
  );
}
export default ResidentServiceDetail;
