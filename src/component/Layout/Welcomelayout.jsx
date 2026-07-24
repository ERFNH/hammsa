import "./Layout.css";
import Footer from "../../component/footer/footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app">
      <div className="mobile-container">
        <main className="main-welcome">
          <Outlet />
        </main>
        <Footer className="footer" />
      </div>
    </div>
  );
}

export default Layout;
