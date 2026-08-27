import "./Layout.css";
import Footer from "../../component/footer/footer";
import Background from "../../component/Background/Background";
import BuildingImage from "../../assets/images/buildingimage.png";
import { Outlet } from "react-router-dom";
import styles from "./Otherlayout.module.css";
function Otherlayout() {
  return (
    <div className="app">
      <div className="mobile-container">
        <Background image={BuildingImage}>
          <main className="main-content">
            <Outlet />
          </main>
        </Background>
        <Footer className={styles.footer} />
      </div>
    </div>
  );
}

export default Otherlayout;
