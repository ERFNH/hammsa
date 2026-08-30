import Backbutton from "../Backbutton/Backbutton";
import styles from "./FixCostt.module.css";
import Glassybackground from "../Glassybackground/Glassybackground";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "../../global.css"
function FixCostt({
  costs = {},
  onEditCosts,
  onEditIsPay,
  isEditable = false,
}) {
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <section className="headerglobalstyle">
        <h1 className="globalpageheader">هزینه های ثابت ساختمان</h1>
        <Glassybackground>
          <div className="globalpageform">
            <div className={`${styles.sectionrow} borderbottom`}>
              <p>{costs.electricity || 0} تومان</p> <span>برق مشاعات</span>
            </div>
            <div className={`${styles.sectionrow} borderbottom`}>
              <p>{costs.water || 0} تومان</p> <span>آب مشاعات</span>
            </div>
            <div className={`${styles.sectionrow} borderbottom`}>
              <p>{costs.cleaning || 0} تومان</p> <span>نظافت</span>
            </div>
            <div className={styles.sectionrow}>
              <p>{costs.elevator || 0} تومان</p>
              <span>آسانسور</span>
            </div>
            {isEditable && (
              <Button className="simplebutton" onClick={onEditCosts}>
                ویرایش
              </Button>
            )}
          </div>
        </Glassybackground>
      </section>
      <section className="headerglobalstyle">
        <h2 className="globalpageheader">وضعیت پرداخت</h2>
        <Button
          className={`${styles.Button} ${costs.isElectricityPaid ? styles.paid : styles.unpaid}`}
          onClick={() => onEditIsPay("electricity")}
        >
          برق مشاعات
        </Button>
        <Button
          className={`${styles.Button} ${costs.isWaterPaid ? styles.paid : styles.unpaid}`}
          onClick={() => onEditIsPay("water")}
        >
          آب مشاعات
        </Button>
        <Button
          className={`${styles.Button} ${costs.isCleaningPaid ? styles.paid : styles.unpaid}`}
          onClick={() => onEditIsPay("cleaning")}
        >
          نظافت
        </Button>
        <Button
          className={`${styles.Button} ${costs.isElevatorPaid ? styles.paid : styles.unpaid}`}
          onClick={() => onEditIsPay("elevator")}
        >
          آسانسور
        </Button>
      </section>
    </main>
  );
}
export default FixCostt;
