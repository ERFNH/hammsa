import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const financePages = ["/Financepage", "/ShowFixCost", "/FinanceReport"];
  const isFinanceActive = financePages.includes(location.pathname);
  const submitServPage = [
    "/submitServPage",
    "/ListingService",
    "/MyListing",
    "/LocalService",
    "/GroupService",
    "/MyGroupBuy",
    "/joinGroupBuy",
    "/ResisdentService",
    "/MyResident",
    "/JoinResident",
  ];
  const isSubmitServePage = submitServPage.includes(location.pathname);

  const ShowServPage = [
    "/ShowServPage",
    "/ShowListingService",
    "/ShowLocalService",
    "/ShowGroupSerive",
    "/ShowResidentService",
  ];
  const isShowServPage = ShowServPage.includes(location.pathname);

  const welcome = [
    "/welcome",
    "/Showpoll",
    "/Newrepair",
    "/Reservation",
    "/Showancmt",
  ];
  const isWelcome = welcome.includes(location.pathname);

  const profilePages = [
    "/managerprofile",
    "/BuildingInfo",
    "/Publicprofile",
    "/Showrepair",
    "/Poll",
    "/Newannouncement",
    "/Costspage",
    "/Newowner",
    "/Transfer",
    "/Changing",
    "/Showmembers",
    "/ShowTransaction",
    "/Ownerprofile",
    "/Tenantprofile",
    "/Publicprofile",
    "/NewCotenant",
    "/ShowCoOwner",
    "/Newtenant",
    "/Showtanant",
    "/NewCowner",
    "/ShowCoOwner",
  ];
  const isProfile = profilePages.includes(location.pathname);
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
        className={`footer-link ${isProfile ? "active" : ""}`}
      >
        <Profile className="icon" />
      </NavLink>

      <NavLink
        to="/SubmitServPage"
        className={`footer-link ${isSubmitServePage ? "active" : ""}`}
      >
        <ListPlus className="icon" />
      </NavLink>

      <NavLink
        to="/Financepage"
        className={`footer-link ${isFinanceActive ? "active" : ""}`}
      >
        <FinancialAffairs className="icon" />
      </NavLink>

      <NavLink
        to="/ShowServPage"
        className={`footer-link ${isShowServPage ? "active" : ""}`}
      >
        <ShoppingCart className="icon" />
      </NavLink>

      <NavLink
        to="/welcome"
        className={`footer-link ${isWelcome ? "active" : ""}`}
      >
        <Home className="icon" />
      </NavLink>
    </footer>
  );
}
export default footer;
