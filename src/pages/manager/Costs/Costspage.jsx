import styles from "./Costspage.module.css";
import Backbutton from "../../../component/Backbutton/Backbutton";
import Button from "../../../component/Button/Button";
import Glassybackground from "../../../component/Glassybackground/Glassybackground";
import "../../../global.css"
import { useNavigate } from "react-router-dom";
function Costs() {
  const navigate = useNavigate();
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <h1 className="globalpageheader">هزینه ها</h1>
      <Glassybackground>
        <div className={styles.costs}>
          <div className={styles.costsrow}>
            <p className={styles.costsrowbackground}>700000 تومان</p>
            <span>مخارج این ماه </span>
          </div>
          <div className={`${styles.costsrow} ${styles.costsrowbackground}`}>
            <p>آسانسور</p>
            <span>پرخرج ترین</span>
          </div>
        </div>
      </Glassybackground>
      <div className="buttonglobalstyle">
        <Button className="btntobottom" onClick={() => navigate("/Setcharge")}>
          تعیین شارژ ساختمان
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Newcost")}>
          ثبت خرید جدید
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/FixCost")}>
          هزینه های ثابت ساختمان
        </Button>
        <Button className="btntobottom" onClick={() => navigate("/Newowner")}>
          لیست خریدها
        </Button>
      </div>
    </main>
  );
}
export default Costs;
