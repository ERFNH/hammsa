import { useState, useEffect } from "react";
import Button from "../../component/Button/Button";
import Search from "../../component/Search/Search";
import "../../global.css";
import Glassybackground from "../../component/Glassybackground/Glassybackground";
import Backbutton from "../../component/Backbutton/Backbutton";
//import { getPaid } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import jsPDF from "jspdf";
import vazirFont from "../../assets/fonts/Vazirmatn-Regular.ttf";
function ShowTransaction() {
  const { activeBuilding } = useBuilding();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  {
    /*
  const mockTransactions = [
    {
      id: 1,
      date: "2025-03-15T14:20:00Z",
      trackingCode: "12345",
      amount: 250000,
      block: 1,
      floor: 3,
      unitNumber: 12,
    },
    {
      id: 2,
      date: "2025-03-15T14:20:00Z",
      trackingCode: "67890",
      amount: 250000,
      block: 1,
      floor: 1,
      unitNumber: 5,
    },
    {
      id: 3,
      date: "2025-03-15T14:20:00Z",
      trackingCode: "11223",
      amount: 250000,
      block: 2,
      floor: 5,
      unitNumber: 8,
    },
    {
      id: 4,
      date: "2025-03-15T14:20:00Z",
      trackingCode: "44556",
      amount: 250000,
      block: 3,
      floor: 2,
      unitNumber: 3,
    },
  ];
  */
  }
  useEffect(() => {
    const fetchData = async () => {
      if (!activeBuilding?.buildingId) return;
      try {
        setLoading(true);
        const response = await getPaid(activeBuilding.buildingId);
        setTransactions(response.data || []);
        //setTransactions(mockTransactions);
      } catch (err) {
        console.error("خطا در دریافت تراکنش‌ها:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeBuilding]);
  const downloadTransactionsPDF = async () => {
    const doc = new jsPDF();
    const font = await fetch(vazirFont).then((res) => res.arrayBuffer());
    const base64Font = btoa(
      new Uint8Array(font).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );
    doc.addFileToVFS("Vazirmatn-Regular.ttf", base64Font);
    doc.addFont("Vazirmatn-Regular.ttf", "Vazirmatn", "normal");
    doc.setFont("Vazirmatn");
    doc.text("تراکنش ها", 180, 20, {
      align: "right",
    });
    filteredTransactions.forEach((item, index) => {
      const y = 40 + index * 37;
      const date = new Date(item.date).toLocaleDateString("fa-IR");
      doc.text(date, 10, y);
      doc.text(`کد پیگیری: ${item.trackingCode}`, 180, y, { align: "right" });
      doc.text(`مبلغ: ${item.amount}`, 180, y + 10, { align: "right" });
      doc.text(
        `بلوک: ${item.block}  طبقه: ${item.floor}  واحد: ${item.unitNumber}`,
        180,
        y + 19,
        { align: "right" },
      );
      doc.line(10, y + 27, 190, y + 27);
    });
    doc.save("transactions.pdf");
  };
  const filteredTransactions = transactions.filter((item) => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;
    const matchesTracking = item.trackingCode
      ?.toLowerCase()
      .includes(searchLower);
    const blockStr = String(item.block || "");
    const floorStr = String(item.floor || "");
    const unitStr = String(item.unitNumber || "");
    const matchesUnit =
      blockStr.includes(searchLower) ||
      floorStr.includes(searchLower) ||
      unitStr.includes(searchLower);
    return matchesTracking || matchesUnit;
  });
  return (
    <main className="mainglobalinpage">
      <Backbutton />
      <div className="searcHeader">
        <h1 className="globalpageheader">تراکنش ها</h1>
        <Search value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="globalpageform" style={{ direction: "rtl" }}>
        {loading ? (
          <p className="loadingtext">در حال دریافت اطلاعات</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="empty-text">هیچ تراکنشی یافت نشد</p>
        ) : (
          filteredTransactions.map((item, index) => (
            <Glassybackground key={item.id || index}>
              <div className="cart">
                <div style={{ direction: "ltr" }}>
                  <span>{new Date(item.date).toLocaleDateString("fa-IR")}</span>
                </div>
                <div>
                  <span>با کد پیگیری </span>
                  <span>{item.trackingCode}</span>
                </div>
                <div className="cartrowflex">
                  <div>
                    <span>بلوک:</span>
                    <span>{item.block}</span>
                  </div>
                  <div>
                    <span>طبقه:</span>
                    <span>{item.floor}</span>
                  </div>
                  <div>
                    <span>واحد:</span>
                    <span>{item.unitNumber}</span>
                  </div>
                </div>
              </div>
            </Glassybackground>
          ))
        )}
      </div>
      <Button className="simplebutton-wh" onClick={downloadTransactionsPDF}>
        دریافت رسید تراکنش
      </Button>
    </main>
  );
}

export default ShowTransaction;
