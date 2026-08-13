import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentBuilding, myRole } from "../api/auth";
const Buildingcontext = createContext();
export function Buildingcontrol({ children }) {
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const buildingRes = await getCurrentBuilding();
        const buildingData = buildingRes?.data;
        if (isMounted) {
          setActiveBuilding(buildingData);
        }
        const buildingId = buildingData?.buildingId;
        if (buildingId) {
          const roleRes = await myRole(buildingId);
          const role = typeof roleRes.data === "number" ? roleRes.data : roleRes.data?.role;
          if (isMounted) {
            setUserRole(role);
          }
        } else {
          if (isMounted) setUserRole(null);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
        if (isMounted) {
          setActiveBuilding(null);
          setUserRole(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Buildingcontext.Provider
      value={{
        activeBuilding,
        setActiveBuilding,
        userRole,
        setUserRole,
        loading,
      }}
    >
      {children}
    </Buildingcontext.Provider>
  );
}
export function useBuilding() {
  return useContext(Buildingcontext);
}