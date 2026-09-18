import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListingDetail } from "../../api/auth";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import styles from "./ListingDetail.module.css";
import "../../global.css";
function ListingDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const getTypeLabel = (type) => {
    const types = {
      0: "فروش",
      1: "قرض دادن",
      2: "اهدای رایگان",
    };
    return types[type] || type;
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await getListingDetail(id);
        setItem(response.data);
        console.log("Listing detail:", response.data);
        console.log("Image URL:", response.data.imageUrl);
        setItem(response.data);
      } catch (err) {
        console.error("خطا در دریافت جزئیات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);
  return (
    <main className="mainglobalinpage">
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : !item ? (
        <p className="loadingtext">آگهی مورد نظر یافت نشد</p>
      ) : (
        <>
          <h1 className="globalpageheader">جزئیات آگهی</h1>
          <Glassybackground>
            <div className=" globalcenterpage">
              <p className="cartrow">
                <strong>:عنوان</strong> {item.title}
              </p>
              <p className="cartrow">
                <strong>:نوع</strong> {getTypeLabel(item.type)}
              </p>
              <p className="cartrow">
                <strong>:توضیحات</strong> {item.description}
              </p>
              <p className="cartrow">
                <strong>:شماره تماس</strong> {item.contactPhone}
              </p>
              <div className={styles.imagewrapper}>
                <p className={styles.priceBackground}>{item.price} تومان</p>
              </div>
              {item.imageUrl && !item.imageUrl.includes("undefined") && (
                <div className={styles.imagewrapper}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={styles.listingimage}
                  />
                </div>
              )}
            </div>
          </Glassybackground>
        </>
      )}
    </main>
  );
}
export default ListingDetail;
