import { Navigate } from "react-router-dom";
import { useBuilding } from "../../context/Buildingcontext";
import "../../../src/global.css";
export function Rolecomponent({ allowedRoles, children }) {
  const { userRole, loading, activeBuilding } = useBuilding();
  console.log("نقش فعلی کاربر:", userRole);
  if (loading) {
    return <div className="loading-Rolecomponent">در حال بارگذاری</div>;
  }
  if (!activeBuilding) {
    return children;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
}
