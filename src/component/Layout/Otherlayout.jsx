import "./Layout.css";
import Footer from "../../component/footer/footer";
import Background from "../../component/Background/Background";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { geImage } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";

function Otherlayout() {
  const { activeBuilding } = useBuilding();
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const buildingId = activeBuilding?.buildingId;
    if (!buildingId) {
      setBackgroundImage("");
      return;
    }

    let isMounted = true;

    geImage(buildingId)
      .then((res) => {
        if (!isMounted) return;
        const imageUrl = res?.data?.imageUrl;
        if (imageUrl) {
          setBackgroundImage(imageUrl);
        } else {
          setBackgroundImage("");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.log("خطا در دریافت عکس:", err?.response?.data);
        setBackgroundImage("");
      });

    return () => {
      isMounted = false;
    };
  }, [activeBuilding?.buildingId]);

  return (
    <div className="app">
      <div className="mobile-container">
        <Background image={backgroundImage}>
          <main className="main-content">
            <Outlet />
          </main>
        </Background>
        <Footer />
      </div>
    </div>
  );
}

export default Otherlayout;