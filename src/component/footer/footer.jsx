import { NavLink } from "react-router-dom";
import "./footer.css";
import Home from "../../assets/icons/home.svg?react";
import Profile from "../../assets/icons/profile.svg?react";
import Message from "../../assets/icons/message.svg?react";
import FinancialAffairs from "../../assets/icons/financialaffairs.svg?react";
import ShoppingCart from "../../assets/icons/shoppingcart.svg?react";
function footer() {
  return (
    <footer className="footer">
      <NavLink
        to="/managerprofile"
        className={({ isActive }) =>
          isActive ? "footer-link active" : "footer-link"
        }
      >
        <Profile className="icon" />
      </NavLink>
      <Message />
      <FinancialAffairs />
      <ShoppingCart />
      <NavLink
        to="/welcome"
        className={({ isActive }) =>
          isActive ? "footer-link active" : "footer-link"
        }
      >
        <Home className="icon" />
      </NavLink>
    </footer>
  );
}
export default footer;
