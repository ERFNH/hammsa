import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentBuilding,
  getMyBuilding,
  myRole,
  setCurrentBuilding,
} from "../api/auth";
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
        const myBuildingsRes = await getMyBuilding();
        const buildings = myBuildingsRes?.data || [];
        console.log("ساختمان من ", buildings);
        if (!buildings.length) {
          if (isMounted) {
            setActiveBuilding(null);
            setUserRole(null);
          }
          return;
        }
        let currentBuilding = null;
        try {
          const currentRes = await getCurrentBuilding();
          currentBuilding = currentRes?.data;
        } catch (err) {
          console.log("Current building not found");
        }
        if (!currentBuilding) {
          currentBuilding = buildings[0];

          await setCurrentBuilding({
            buildingId: currentBuilding.buildingId,
          });
        }

        if (isMounted) {
          setActiveBuilding(currentBuilding);
        }

        const buildingId = currentBuilding?.buildingId;

        if (buildingId) {
          const roleRes = await myRole(buildingId);

          const role =
            typeof roleRes.data === "number"
              ? roleRes.data
              : roleRes.data?.role;

          if (isMounted) {
            setUserRole(role);
          }
        }
      } catch (err) {
        console.error("Error fetching building data:", err);

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