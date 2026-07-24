import axios from "axios";

const api = axios.create({
  baseURL: "https://api.ham3a.ir/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const sendOtp = (phoneNumber) => {
  return api.post("/Auth/send-otp", {
    phoneNumber,
  });
};

export const verifyOtp = (phoneNumber, code) => {
  return api.post("/Auth/verify-otp", {
    phoneNumber,
    code,
  });
};

export const createBuilding = (formData) => {
  return api.post("/Building", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyBuilding = () => {
  return api.get("/Building/my-buildings");
};

export const getBuildingDetails = (id) => {
  return api.get(`/Building/${id}`);
};

export const updateBuilding = (id, data) => {
  return api.put(`/Building/${id}`, data);
};

export const owners = (
  buildingId,
  ownerPhoneNumber,
  block,
  floor,
  unitNumber,
  isResident,
) => {
  return api.post(`/Unit/${buildingId}/owners`, {
    ownerPhoneNumber,
    block,
    floor,
    unitNumber,
    isResident,
  });
};

export const getUnits = (buildingId) => {
  return api.get(`/Unit/${buildingId}`);
};
