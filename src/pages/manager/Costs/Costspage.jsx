import styles from "./Costspage.module.css";
import Button from "../../../component/Button/Button";
import Glassybackground from "../../../component/Glassybackground/Glassybackground";
import "../../../global.css";
import { useNavigate } from "react-router-dom";
import { useBuilding } from "../../../context/Buildingcontext";
import { getExpenseSummary } from "../../../api/auth";
import { useEffect, useState } from "react";
function Costs() {
  const navigate = useNavigate();
  const { activeBuilding } = useBuilding();
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    highestExpenseTitle: "",
  });
  useEffect(() => {
    const fetchSummery = async () => {
      if (!activeBuilding?.buildingId) return;
      try {
        const response = await getExpenseSummary(activeBuilding.buildingId);
        //console.log("پاسخ سرور", response);
        setSummary(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSummery();
  }, [activeBuilding]);
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">هزینه ها</h1>
      <Glassybackground>
        <div className={styles.costs}>
          <div className={styles.costsrow}>
            <p className={styles.costsrowbackground}>{summary.totalExpenses.toLocaleString()}</p>
            <span>مخارج این ماه </span>
          </div>
          <div className={`${styles.costsrow} ${styles.costsrowbackground}`}>
            <p>{summary.highestExpenseTitle}</p>
            <span>پرخرج ترین</span>
          </div>
        </div>
      </Glassybackground>
      <div className="buttonglobalstyle">
        <Button className="btntobottom" onClick={() => navigate("/Setcharge")}>
          تعیین شارژ ساختمان
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/FixCost")}>
          هزینه های ثابت ساختمان
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Newcost")}>
          ثبت خرید جدید
        </Button>
        <Button
          className="btntobottom"
          onClick={() => navigate("/ShowNewCost")}
        >
          لیست خریدها
        </Button>
      </div>
    </main>
  );
}
export default Costs;
