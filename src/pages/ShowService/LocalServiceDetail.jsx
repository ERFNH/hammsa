import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import { getLocalServiceDitail, postLocalRate } from "../../api/auth";
import Star from "../../assets/icons/Star.svg?react";
import "../../global.css";
import styles from "./LocalServiceDetail.module.css";
function ServiceDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const averageRating = item?.averageRating || 0;
  const ratingCount = item?.ratingCount || 0;
  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${styles.smallStar} ${star <= rating ? styles.filled : ""}`}
        style={{ width: "1.2rem", height: "1.2rem" }}
      />
    ));
  };
  const handleRate = async (star) => {
    setRating(star);
    try {
      await postLocalRate(id, star);
      alert(`امتیاز ${star} با موفقیت ثبت شد.`);
    } catch (err) {
      console.error("خطا در ثبت امتیاز:", err);
      alert("خطا در ثبت امتیاز.");
    }
  };
  const getCategoryName = (categoryId) => {
    const categories = {
      1: "تعمیرات",
      2: "نظافت و خدمات منزل",
      3: "آموزش و کلاس ها",
      4: "حمل و نقل و رفاهی",
      5: "بهداشت و سلامت",
      6: "زیبایی و آرایش",
      7: "حقوقی و اداری",
      8: "ساختمانی و بازسازی",
    };
    return categories[categoryId] || "سایر";
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await getLocalServiceDitail(id);
        setItem(response.data);
      } catch (err) {
        console.error("خطا در دریافت جزئیات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);
  if (loading) return <p className="loadingtext">در حال دریافت اطلاعات</p>;
  return (
    <main className="mainglobalinpage">
      {!item ? (
        <p className="loadingtext">خدمت مورد نظر یافت نشد</p>
      ) : (
        <>
          <h1 className="globalpageheader ">جزئیات خدمت</h1>
          <Glassybackground>
            <div className="cart globalcenterpage">
              <span className={styles.ratingDisplay}>
                {renderStars(Math.round(averageRating))}
              </span>
              <p className="cartrow">
                <strong>دسته بندی:</strong> {getCategoryName(item.category)}
              </p>
              <p className="cartrow">
                <strong>عنوان:</strong> {item.title}
              </p>
              <p className="cartrow">
                <strong>توضیحات:</strong> {item.description}
              </p>
              <p className="cartrow">
                <strong>ارائه‌دهنده:</strong> {item.providerName}
              </p>
              <p className="cartrow">
                <strong>شماره تماس:</strong> {item.contactPhone}
              </p>
              <p className="cartrow">
                <strong>ساعات کاری:</strong> {item.workingHours}
              </p>
              <p className="cartrow">
                <strong>تعداد کاربرانی که رای داده‌اند</strong>
                {ratingCount}
              </p>
            </div>
          </Glassybackground>
          <div className={styles.position}>
            <p className={styles.rete}>ثبت نظر</p>
            <div className={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`${styles.star} ${(hover || rating) >= star ? styles.filled : ""}`}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default ServiceDetail;
