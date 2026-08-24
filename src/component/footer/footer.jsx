import { NavLink } from "react-router-dom";
import "./footer.css";
import Home from "../../assets/icons/home.svg?react";
import Profile from "../../assets/icons/profile.svg?react";
import FinancialAffairs from "../../assets/icons/financialaffairs.svg?react";
import ShoppingCart from "../../assets/icons/shoppingcart.svg?react";
import ListPlus from "../../assets/icons/listPlus.svg?react";
import { useBuilding } from "../../context/Buildingcontext";
import { Roles } from "../../constants/Roles";
import { owners } from "../../api/auth";
function footer() {
  const { userRole, activeBuilding } = useBuilding();
  let profilepath = "/managerprofile";
  if (userRole === Roles.owner) {
    profilepath = "/Ownerprofile";
  }
  if (userRole === Roles.tenant) {
    profilepath = "/Tenantprofile";
  }
  return (
    <footer className="footer">
      <NavLink
        to={profilepath}
        className={({ isActive }) =>
          isActive ? "footer-link active" : "footer-link"
        }
      >
        <Profile className="icon" />
      </NavLink>
      <NavLink
        to="/SubmitServPage"
        className={({ isActive }) =>
          isActive ? "footer-link active" : "footer-link"
        }
      >
        <ListPlus className="icon" />
      </NavLink>
      <NavLink
        to="/Financepage"
        className={({ isActive }) =>
          isActive ? "footer-link active" : "footer-link"
        }
      >
        <FinancialAffairs className="icon" />
      </NavLink>
      <NavLink
        to="/ShowServPage"
        className={({ isActive }) =>
          isActive ? "footer-link active" : "footer-link"
        }
      >
        <ShoppingCart className="icon" />
      </NavLink>
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
