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
export const logout = () => {
  return api.post(`/Auth/logout`);
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
export const myRole = (buildingId) => {
  return api.get(`Building/${buildingId}/my-role`);
};
export const setCurrentBuilding = (data) => {
  return api.post("/Building/current-building", data);
};

export const getCurrentBuilding = () => {
  return api.get("/Building/current-building");
};
export const postTransferManager = (buildingId) => {
  return api.post(`/Building/${buildingId}/transfer-manager`);
};
export const owners = (
  buildingId,
  ownerPhoneNumber,
  block,
  floor,
  unitNumber,
) => {
  return api.post(`/Unit/${buildingId}/owners`, {
    ownerPhoneNumber,
    block,
    floor,
    unitNumber,
  });
};

export const tenants = (
  buildingId,
  tenantPhoneNumber,
  block,
  floor,
  unitNumber,
  startDate,
) => {
  return api.post(`/Unit/${buildingId}/tenants`, {
    buildingId,
    tenantPhoneNumber,
    block,
    floor,
    unitNumber,
    startDate,
  });
};

export const getUnits = (buildingId) => {
  return api.get(`/Unit/${buildingId}`);
};

export const getMyTenant = (buildingId) => {
  return api.get(`/Unit/${buildingId}/my-tenants`);
};

export const removeowner = (buildingId, block, floor, unitNumber) => {
  return api.delete(`/Unit/remove-owner`, {
    data: {
      buildingId,
      block,
      floor,
      unitNumber,
    },
  });
};

export const removetenant = (buildingId, block, floor, unitNumber) => {
  return api.delete(`/Unit/remove-tenant`, {
    data: {
      buildingId,
      block,
      floor,
      unitNumber,
    },
  });
};

{
  /*export const editOwner = (payload) => {
  return api.put(`/Unit/edit-owner`, {
    request: payload,
  });
};*/
}
{
  /*
export const editTenant = (payload) => {
  return api.put(`/Unit/edit-tenant`, {
    request: payload,
  });
};
*/
}
export const getActivePrimaryOwners = (buildingId) => {
  return api.get(`/Unit/${buildingId}/active-primary-owners`);
};
export const getcomembers = (buildingId) => {
  return api.get(`/Unit/${buildingId}/comembers`);
};

export const removeOneOwner = (data) => {
  return api.delete("/Unit/remove-one-owner", { data });
};

export const removeOneTenant = (data) => {
  return api.delete("/Unit/remove-one-tenant", { data });
};

export const setAnnouncement = (buildingId, title, description, priority) => {
  return api.post(`/Announcement`, {
    buildingId,
    title,
    description,
    priority,
  });
};

export const getShowancmt = (buildingId) => {
  return api.get(`/Announcement/${buildingId}`);
};

export const readAnnouncement = (announcementId) => {
  return api.post(`/Announcement/${announcementId}/read`);
};

export const deleteAnnouncement = (announcementId) => {
  return api.delete(`/Announcement/${announcementId}`);
};

export const Newrepair = (buildingId, title, description, priority) => {
  return api.post(`/RepairReport`, {
    buildingId,
    title,
    description,
    priority,
  });
};

export const Showrepair = (buildingId) => {
  return api.get(`/RepairReport/${buildingId}`);
};

//charge

export const getMyunits = (buildingId) => {
  return api.get(`/Unit/${buildingId}/my-units`);
};

export const postRates = (buildingId, year, month, amount) => {
  return api.post(`/Charge/${buildingId}/rates`, {
    buildingId,
    year,
    month,
    amount,
  });
};

export const getRates = (buildingId) => {
  return api.get(`/Charge/${buildingId}/rates`);
};

export const postPayCharge = (chargeId) => {
  return api.post(`/Charge/${chargeId}/pay`);
};

export const putSharedCost = (buildingId, data) => {
  return api.put(`/Charge/${buildingId}/shared-costs`, data);
};

export const getSharedCost = (buildingId) => {
  return api.get(`/Charge/${buildingId}/shared-costs`);
};

export const getcurretncharge = (unitId) => {
  return api.get(`/Charge/unit/${unitId}/current`);
};

export const postCreateExpense = (buildingId, category, title, amount) => {
  return api.post(`/Charge/create-expense`, {
    buildingId,
    category,
    title,
    amount,
  });
};

export const getExpencseList = (buildingId) => {
  return api.get(`/Charge/${buildingId}/expense`);
};

export const deleteExpence = (buildingId, expenseId) => {
  return api.delete(`/Charge/${buildingId}/delete-expense/${expenseId}`);
};
export const getExpenseSummary = (buildingId) => {
  return api.get(`/Charge/${buildingId}/expense-summary`);
};

export const putUpdateExpence = (
  buildingId,
  expenseId,
  category,
  title,
  amount,
) => {
  return api.put(`/Charge/update-expense`, {
    buildingId,
    expenseId,
    category,
    title,
    amount,
  });
};

export const getPaid = (buildingId) => {
  return api.get(`/Charge/${buildingId}/paid`);
};

export const getDashboardFinancials = (buildingId) => {
  return api.get(`/Charge/${buildingId}/dashboard-financials`);
};

//poll
export const Newpoll = (
  buildingId,
  title,
  description,
  audience,
  deadline,
  options,
) => {
  return api.post(`/Poll`, {
    buildingId,
    title,
    description,
    audience,
    deadline,
    options,
  });
};

export const getActivePolls = (buildingId) => {
  return api.get(`/Poll/${buildingId}/ActivePolls`);
};

export const getInActivePolls = (buildingId) => {
  return api.get(`/Poll/${buildingId}/InActivePolls`);
};

export const postVote = (pollId, optionId) => {
  return api.post(`/Poll/Vote`, {
    pollId: pollId,
    optionId: optionId,
  });
};

export const getMyvote = (pollId) => {
  return api.get(`/Poll/${pollId}/my-vote`);
};

export const postResavation = (buildingId, facilityType, date) => {
  return api.post(`/Reservation`, {
    buildingId,
    facilityType,
    date,
  });
};

export const getReservedDates = (buildingId) => {
  return api.get(`/Reservation/reserved-dates?buildingId=${buildingId}`);
};

export const getMyResevation = () => {
  return api.get(`Reservation/my`);
};

export const putUserprofile = (firstName, lastName) => {
  return api.put(`/User/profile`, {
    firstName,
    lastName,
  });
};

export const getUserprofile = () => {
  return api.get(`/User/profile`);
};

//service
export const postCreatLocalService = (
  buildingId,
  category,
  title,
  description,
  providerName,
  contactPhone,
  workingHours,
) => {
  return api.post(`/BuildingServices/create-local-service`, {
    buildingId,
    category,
    title,
    description,
    providerName,
    contactPhone,
    workingHours,
  });
};
export const getLocalService = (buildingId) => {
  return api.get(`/BuildingServices/${buildingId}/get-local-service-list`);
};

export const getLocalServiceDitail = (localServiseId) => {
  return api.get(
    `/BuildingServices/${localServiseId}/get-local-service-details`,
  );
};
export const postLocalRate = (localServiceId, score) => {
  return api.post(`/BuildingServices/rate-local-service`, {
    localServiceId,
    score,
  });
};

export const postListingService = (formData) => {
  return api.post("/BuildingServices/create-listing", formData);
};

export const getListingList = (buildingId) => {
  return api.get(`/BuildingServices/${buildingId}/get-listing-list`);
};

export const getListingDetail = (listingId) => {
  return api.get(`/BuildingServices/${listingId}/get-listing-details`);
};

export const getMyListing = (buildingId) => {
  return api.get(`/BuildingServices/${buildingId}/get-my-listing`);
};

export const delMyListing = (listingId) => {
  return api.delete(`/BuildingServices/${listingId}/delete-listing`);
};

export const postCreatGroupBuy = (
  buildingId,
  title,
  minimumQuantity,
  price,
  deadline,
) => {
  return api.post(`/BuildingServices/create-group-buying`, {
    buildingId,
    title,
    minimumQuantity,
    price,
    deadline,
  });
};

export const getGroupBuy = (buildingId) => {
  return api.get(
    `/BuildingServices/${buildingId}/get-building-group-buyings`,
  );
};
