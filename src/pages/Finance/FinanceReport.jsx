import { getDashboardFinancials } from "../../api/auth";
import { useEffect, useState } from "react";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import { useBuilding } from "../../context/Buildingcontext";
import "../../global.css";
import styles from "./FinanceReport.module.css";
import Tabs from "../../component/Tabs/Tabs";
import { LabelList } from "recharts";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function FinanceReport() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const { activeBuilding } = useBuilding();
  const [activeTab, setActiveTab] = useState("monthly");
  const lastFourMonths = dashboard?.monthlyChartData?.slice(-4) || [];
  const lastFourYears = dashboard?.yearlyChartData?.slice(-4) || [];
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding?.buildingId) {
        return;
      }
      try {
        setLoading(true);
        const response = await getDashboardFinancials(
          activeBuilding.buildingId,
        );
        //setDashboard(mockDashboard);
        setDashboard(response.data);
      } catch (err) {
        console.error("خطا:", err);
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding]);

  {
    /* const mockDashboard = {
    currentMonthIncome: 12,
    currentMonthExpenses: 85,
    monthlyChartData: [
      { month: 1, monthName: "فروردین", expenses: 5 },
      { month: 2, monthName: "اردیبهشت", expenses: 8 },
      { month: 3, monthName: "خرداد", expenses: 1 },
      { month: 4, monthName: "تیر", expenses: 7 },
      { month: 5, monthName: "مرداد", expenses: 9 },
      { month: 6, monthName: "شهریور", expenses: 11 },
      { month: 7, monthName: "مهر", expenses: 6 },
      { month: 8, monthName: "آبان", expenses: 12 },
      { month: 9, monthName: "آذر", expenses: 8 },
      { month: 10, monthName: "دی", expenses: 5 },
      { month: 11, monthName: "بهمن", expenses: 7 },
      { month: 12, monthName: "اسفند", expenses: 10 },
    ],
    yearlyChartData: [
      { year: 1402, expenses: 8 },
      { year: 1403, expenses: 1 },
      { year: 1404, expenses: 9 },
      { year: 1405, expenses: 35 },
    ],
  };*/
  }
  return (
    <main className="mainglobalinpage">
      <h1 className="globalpageheader">گزارش مالی</h1>
      {loading ? (
        <p className="loadingtext">در حال دریافت اطلاعات</p>
      ) : !dashboard ? (
        <p className="loadingtext">داده‌ای یافت نشد</p>
      ) : (
        <>
          <Glassybackground>
            <div className={styles.cart}>
              <div className={`cartrow borderbottom ${styles.marginbottom}`}>
                <strong>درآمد کل</strong>
                <span>
                  تومان {dashboard.currentMonthIncome.toLocaleString()}
                </span>
              </div>
              <div className="cartrow">
                <strong>هزینه کل</strong>
                <span>
                  تومان {dashboard.currentMonthExpenses.toLocaleString()}
                </span>
              </div>
            </div>
          </Glassybackground>
          <Tabs
            tabs={[
              { value: "yearly", label: "سالانه" },
              { value: "monthly", label: "ماهانه" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
          {activeTab === "yearly" && (
            <div className={styles.chartwrapper}>
              <ResponsiveContainer height={300}>
                <BarChart data={lastFourYears} barCategoryGap="25%">
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 40]} tickCount={5} />
                  <Tooltip />
                  <Bar
                    dataKey="expenses"
                    fill="#d5b072"
                    radius={[15, 15, 0, 0]}
                    barSize={40}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {activeTab === "monthly" && (
            <div className={styles.chartwrapper}>
              <ResponsiveContainer height={300}>
                <BarChart data={lastFourMonths} barCategoryGap="25%">
                  <XAxis dataKey="monthName" />
                  <YAxis domain={[0, 40]} tickCount={5} />
                  <Tooltip />
                  <Bar
                    dataKey="expenses"
                    fill="#d5b072"
                    radius={[15, 15, 0, 0]}
                    barSize={40}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default FinanceReport;
