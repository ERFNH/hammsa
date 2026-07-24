import "./Layout.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app">
      <div className="mobile-container">
          <main className="main-content">
            <Outlet />
          </main>
      </div>
    </div>
  );
}

export default Layout;