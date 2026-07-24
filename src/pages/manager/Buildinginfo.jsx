import "./Buildinginfo.css";
import "../../global.css";
import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Switch from "../../component/Switch/Switch";
import Backbutton from "../../component/Backbutton/Backbutton";
import {
  getBuildingDetails,
  updateBuilding,
  createBuilding,
} from "../../api/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilding } from "../../context/Buildingcontext";

function Buildinginfo() {
  const { activeBuilding } = useBuilding();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [blockCount, setBlockCount] = useState("");
  const [floorCount, setFloorCount] = useState("");
  const [unitCount, setUnitCount] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hasGym, setHasGym] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [hasMeetingHall, setHasMeetingHall] = useState(false);
  const [hasRoofGarden, setHasRoofGarden] = useState(false);
  const [image, setImage] = useState(null);

  React.useEffect(() => {
    if (activeBuilding?.id) {
      getBuildingDetails(activeBuilding.id)
        .then((response) => {
          const fullData = response.data;
          setName(fullData.name || "");
          setBlockCount(fullData.blockCount || "");
          setFloorCount(fullData.floorCount || "");
          setUnitCount(fullData.unitCount || "");
          setPostalCode(fullData.postalCode || "");
          setAddress(fullData.address || "");
          setLatitude(fullData.latitude || null);
          setLongitude(fullData.longitude || null);
          setHasGym(fullData.hasGym || false);
          setHasPool(fullData.hasPool || false);
          setHasMeetingHall(fullData.hasMeetingHall || false);
          setHasRoofGarden(fullData.hasRoofGarden || false);
        })
        .catch((err) => {
          console.error("خطا در دریافت ساختمان:", err);
        });
    }
  }, [activeBuilding]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(position);
        alert("لوکیشن ثبت شد.");
      },
      () => {
        alert("دسترسی به موقعیت مکانی داده نشد.");
      },
    );
  };

  const Submit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (activeBuilding?.id) {
        const buildingData = {
          name: name,
          blockCount: parseInt(blockCount) || 0,
          floorCount: parseInt(floorCount) || 0,
          unitCount: parseInt(unitCount) || 0,
          postalCode: postalCode || null,
          address: address || null,
          latitude: latitude ? parseFloat(latitude) : 0,
          longitude: longitude ? parseFloat(longitude) : 0,
          hasGym: hasGym,
          hasPool: hasPool,
          hasMeetingHall: hasMeetingHall,
          hasRoofGarden: hasRoofGarden,
        };

        response = await updateBuilding(activeBuilding.id, buildingData);
      } else {
        const formData = new FormData();

        formData.append("Name", name);
        formData.append("BlockCount", blockCount);
        formData.append("FloorCount", floorCount);
        formData.append("UnitCount", unitCount);
        formData.append("PostalCode", postalCode);
        formData.append("Address", address);
        formData.append("Latitude", latitude ?? 0);
        formData.append("Longitude", longitude ?? 0);
        formData.append("HasGym", hasGym);
        formData.append("HasPool", hasPool);
        formData.append("HasMeetingHall", hasMeetingHall);
        formData.append("HasRoofGarden", hasRoofGarden);

        if (image) {
          formData.append("Image", image);
        }

        response = await createBuilding(formData);
      }

      console.log(response.data);
      alert("اطلاعات با موفقیت ثبت شد.");

      setTimeout(() => {
        navigate("/Managerprofile");
      }, 1000);
    } catch (error) {
      console.log(error);
      alert("ثبت اطلاعات با خطا مواجه شد.");
    }
  };

  return (
    <form className="Buildinginfo" onSubmit={Submit}>
      <Backbutton />
      <div>
        <h2>اطلاعات ساختمان</h2>
      </div>
      <div className="forminput">
        <Input
          className="input-textphone "
          label="نام ساختمان"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="تعداد بلوک"
          type="number"
          className="input-number"
          value={blockCount}
          onChange={(e) => setBlockCount(e.target.value)}
        />
        <Input
          label="تعداد طبقات"
          type="number"
          className="input-number"
          value={floorCount}
          onChange={(e) => setFloorCount(e.target.value)}
        />
        <Input
          label="تعداد واحدها"
          type="number"
          className="input-number"
          value={unitCount}
          onChange={(e) => setUnitCount(e.target.value)}
        />
        <Input
          label="کدپستی"
          type="number"
          className="post inputinfo"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Input
          className="input-textphone"
          label="آدرس"
          type="textarea"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <Button
        type="button"
        className="simplebutton-wh-co"
        onClick={getLocation}
      >
        انتخاب لوکیشن
      </Button>
      <Switch
        id="gym"
        label="سالن ورزشی"
        checked={hasGym}
        onChange={(e) => setHasGym(e.target.checked)}
      />
      <Switch
        id="pool"
        label="استخر، سونا و جکوزی"
        checked={hasPool}
        onChange={(e) => setHasPool(e.target.checked)}
      />
      <Switch
        id="meeting"
        label="سالن اجتماعات"
        checked={hasMeetingHall}
        onChange={(e) => setHasMeetingHall(e.target.checked)}
      />
      <Switch
        id="roof"
        label="روف گاردن"
        checked={hasRoofGarden}
        onChange={(e) => setHasRoofGarden(e.target.checked)}
      />
      <div className="fileinput">
        <input
          id="fileimage"
          type="file"
          label=" آپلود تصویر ساختمان"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="fileimage">آپلود تصویر ساختمان</label>
      </div>

      <Button type="submit" className="simplebutton-wh">
        ثبت
      </Button>
    </form>
  );
}
export default Buildinginfo;
