import "./Layout.css";
import Footer from "../../component/footer/footer";
import Background from "../../component/Background/Background";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { geImage } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
function Otherlayout() {
  const { activeBuilding, loading } = useBuilding();
  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    const buildingId = activeBuilding?.buildingId;
    if (!buildingId) return;
    geImage(buildingId)
      .then((res) => {
        //console.log("IMAGE API RESPONSE:", res.data);
        const imageUrl = res?.data?.imageUrl;
        if (imageUrl) {
          //console.log("IMAGE URL:", imageUrl);
          setBackgroundImage(imageUrl);
        }
      })
      .catch((err) => {
        console.log( err.response?.data);
      });
  }, [activeBuilding]);
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
