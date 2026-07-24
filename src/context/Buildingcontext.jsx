import { createContext, useContext, useState, useEffect } from "react";
import { getMyBuilding } from "../api/auth";
const Buildingcontext = createContext();
export function Buildingcontrol({ children }) {
  const [activeBuilding, setActiveBuilding] = useState(null);
  useEffect(() => {
    getMyBuilding()
      .then((response) => {
        const buildings = response.data;
        const savedId = localStorage.getItem("activeBuildingId");
        let selectedBuilding;
        if (savedId) {
          selectedBuilding = buildings.find(
            (building) => building.id == savedId,
          );
        }
        if (!selectedBuilding && buildings.length > 0) {
          selectedBuilding = buildings[0];
        }
        setActiveBuilding(selectedBuilding);
        if (selectedBuilding) {
          localStorage.setItem("activeBuildingId", selectedBuilding.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Buildingcontext.Provider value={{ activeBuilding, setActiveBuilding }}>
      {children}
    </Buildingcontext.Provider>
  );
}
export function useBuilding() {
  return useContext(Buildingcontext);
}
