import "./Showmembers.css";
import Backbutton from "../../component/Backbutton/Backbutton";
import Tabs from "../../component/Tabs/Tabs";
import { getUnits } from "../../api/auth";
import { useBuilding } from "../../context/Buildingcontext";
import { useEffect, useState } from "react";

function Showmembers() {
  const [activeTab, setActiveTab] = useState("owner");
  const { activeBuilding } = useBuilding();
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (activeBuilding?.id) {
      getUnits(activeBuilding.id)
        .then((response) => {
          console.log(response.data);
          setUnits(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeBuilding]);

  return (
    <main className="showmember-main">
      <Backbutton />
      <Tabs
        tabs={[
          { value: "tenant", label: "مستاجرین" },
          { value: "owner", label: "مالکین" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "owner" && (
        <div className="members-container">
          {units.length === 0 ? (
            <p className="loadinf-text">در حال دریافت اطلاعات</p>
          ) : (
            units.map((unit) =>
              unit.members.map((member, index) => (
                <div className="member-card" key={`${unit.unitId}-${index}`}>
                  <div className="member-header">
                    <span>{member.role === 1 ? " ساکن" : "موجر"}</span>
                    <h3>...</h3>
                  </div>
                  <div className="member-footer">
                    <p className="member-date">
                      {member.startDate.split("T")[0]}
                    </p>
                    <span>
                      بلوک {unit.block} طبقه {unit.floor} واحد {unit.unitNumber}
                    </span>
                    <span>{member.phoneNumber}</span>
                  </div>
                </div>
              )),
            )
          )}
        </div>
      )}
      {activeTab === "tenant" && (
        <div className="members-container">
          <p className="loadinf-text"> مستاجری ثبت نشده است</p>
        </div>
      )}
    </main>
  );
}

export default Showmembers;
