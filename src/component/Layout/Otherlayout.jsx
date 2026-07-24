import "./Layout.css";
import Footer from "../../component/footer/footer";
import Background from "../../component/Background/Background";
import BuildingImage from "../../assets/images/buildingimage.png";
import { Outlet } from "react-router-dom";

function Otherlayout() {
  return (
    <div className="app">
      <div className="mobile-container">
        <Background image={BuildingImage}>
          <main className="main-content">
            <Outlet />
          </main>
        </Background>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Otherlayout;