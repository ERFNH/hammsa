import Backbutton from "../../component/Backbutton/Backbutton";
import { getDashboardFinancials } from "../../api/auth";
import { useEffect, useState } from "react";
function FinanceReport() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardFinancials();
      } catch (err) {
        console.err("خطا", err);
        console.log(response?.data)
      } finally {
        setLoading(false);
      }
    };
  });
  return (
    <main>
      <Backbutton />
    </main>
  );
}
export default FinanceReport;
