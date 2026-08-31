import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Buildingcontrol } from "./context/Buildingcontext";
import { Rolecomponent } from "./component/Rolecomponent/Rolecomponent";
import { Roles } from "./constants/Roles";
import Layout from "./component/Layout/Layout";
import Otherlayout from "./component/Layout/Otherlayout";
import Welcomelayout from "./component/Layout/Welcomelayout";
import RequestOtp from "./pages/auth/Requestotp";
import VerifyOtp from "./pages/auth/Verifyotp";
import Welcome from "./pages/Welcome";
import Managerprofile from "./pages/manager/Managerprofile";
import Buildinginfo from "./pages/manager/Buildinginfo";
import Changing from "./pages/manager/Changing";
import Newowner from "./pages/manager/Newowner";
import Showmembers from "./pages/manager/Showmembers";
import Newannouncement from "./pages/manager/Newannouncement";
import Showancmt from "./pages/Showancmt";
import Newrepair from "./pages/Newrepair";
import Showrepair from "./pages/manager/Showrepair";
import Poll from "./pages/manager/Poll";
import Showpoll from "./pages/Showpoll";
import Reservation from "./pages/Resevation";
import Showresevation from "./pages/Showresevation";
import Publicprofile from "./pages/Publicprofile";
import Costspage from "./pages/manager/Costs/Costspage";
import Newcost from "./pages/manager/Costs/Newcost";
import Setcharge from "./pages/manager/Costs/Setcharge";
import Ownerprofile from "./pages/owner/Ownerprofile";
import Financepage from "./pages/Finance/Financepage";
import Tenantprofile from "./pages/tenant/Tenantprofile";
import Showtanant from "./pages/owner/Showtanant";
import Newtenant from "./pages/owner/Newtenant";
import Transfer from "./pages/manager/Transfer";
import NewCowner from "./pages/owner/NewCowner";
import NewCotenant from "./pages/tenant/NewCotenant";
import ShowCoMember from "./component/ShowCoMember/ShowCoMember";
import FixCost from "./pages/manager/Costs/FixCost";
import ShowFixCost from "./pages/Finance/ShowFixCost";
import ShowNewCost from "./pages/manager/Costs/ShowNewCost";
import ShowTransaction from "./pages/manager/ShowTransaction";
import FinanceReport from "./pages/Finance/FinanceReport";
import ShowServPage from "./pages/ShowService/ShowServPage";
import SubmitServPage from "./pages/SubmitService/SubmitServPage";
import LocalService from "./pages/SubmitService/LocalService";
import ShowLocalService from "./pages/ShowService/ShowLocalService";
import ListingService from "./pages/SubmitService/ListingService";
import LocalServiceDetail from "./pages/ShowService/LocalServiceDetail";
import ShowListingService from "./pages/ShowService/ShowListingService";
import ListingDetail from "./pages/ShowService/ListingDetail";
import MyListing from "./pages/SubmitService/MyListing";
import GroupService from "./pages/SubmitService/GroupService";
import ShowGroupSerive from "./pages/ShowService/ShowGroupSerive";
import ResisdentService from "./pages/SubmitService/ResisdentService";
import MyGroupBuy from "./pages/SubmitService/MyGroupBuy";
import JoinGroupBuy from "./pages/SubmitService/JoinGroupBuy";
import ShowResidentService from "./pages/ShowService/ShowResidentService";
import ResidentServiceDetail from "./pages/ShowService/ResidentServiceDetail";
import MyResident from "./pages/SubmitService/MyResident";
import JoinResident from "./pages/SubmitService/JoinResident";
import PaymentStatus from "./pages/manager/PaymentStatus";
import ChalengePage from "./pages/Chalenge/ChalengePage";
import ChalengRegister from "./pages/Chalenge/ChalengRegister"
function App() {
  return (
    <BrowserRouter>
      <Buildingcontrol>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<RequestOtp />} />
            <Route path="/verify" element={<VerifyOtp />} />
          </Route>
          <Route element={<Welcomelayout />}>
            <Route path="/Welcome" element={<Welcome />} />
          </Route>

          <Route element={<Otherlayout />}>
            <Route
              path="/Managerprofile"
              element={
                <Rolecomponent allowedRoles={[Roles.manager]}>
                  <Managerprofile />
                </Rolecomponent>
              }
            />
            {/*<Route path="/Managerprofile" element={<Managerprofile />} />*/}
            <Route path="/Buildinginfo" element={<Buildinginfo />} />
            <Route path="/Changing" element={<Changing />} />
            <Route path="/Newowner" element={<Newowner />} />
            <Route path="/Showmembers" element={<Showmembers />} />
            <Route path="/PaymentStatus/:unitId" element={<PaymentStatus />} />
            <Route path="/Newannouncement" element={<Newannouncement />} />
            <Route path="/Showancmt" element={<Showancmt />} />
            <Route path="/Newrepair" element={<Newrepair />} />
            <Route path="/Showrepair" element={<Showrepair />} />
            <Route path="/ShowTransaction" element={<ShowTransaction />} />
            <Route path="/Poll" element={<Poll />} />
            <Route path="/Showpoll" element={<Showpoll />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route path="/Showresevation" element={<Showresevation />} />
            <Route path="/Transfer" element={<Transfer />} />
            <Route path="/Publicprofile" element={<Publicprofile />} />
            <Route path="/Costspage" element={<Costspage />} />
            <Route path="/Newcost" element={<Newcost />} />
            <Route path="/ShowNewCost" element={<ShowNewCost />} />
            <Route path="/Setcharge" element={<Setcharge />} />
            {/* <Route path="/ownerprofile" element={<Ownerprofile />} />*/}
            <Route path="/NewCowner" element={<NewCowner />} />
            <Route
              path="/Ownerprofile"
              element={
                <Rolecomponent allowedRoles={[Roles.owner]}>
                  <Ownerprofile />
                </Rolecomponent>
              }
            />
            <Route path="/Showtanant" element={<Showtanant />} />
            <Route path="/Newtenant" element={<Newtenant />} />
            <Route path="/ShowCoMember" element={<ShowCoMember />} />
            <Route path="/Financepage" element={<Financepage />} />
            <Route path="/FixCost" element={<FixCost />} />
            <Route path="/FinanceReport" element={<FinanceReport />} />
            <Route path="/ShowFixCost" element={<ShowFixCost />} />
            <Route path="/Tenantprofile" element={<Tenantprofile />} />
            {/*
            <Route
              path="/Tenantprofile"
              element={
                <Rolecomponent allowedRoles={[Roles.tenant]}>
                  <Tenantprofile />
                </Rolecomponent>
              }
            />*/}
            <Route path="/NewCotenant" element={<NewCotenant />} />
            <Route path="/ShowServPage" element={<ShowServPage />} />
            <Route path="/ShowLocalService" element={<ShowLocalService />} />
            <Route
              path="/LocalServiceDetail/:id"
              element={<LocalServiceDetail />}
            />
            <Route
              path="/ShowListingService"
              element={<ShowListingService />}
            />
            <Route path="/ShowGroupSerive" element={<ShowGroupSerive />} />
            <Route
              path="/ShowResidentService"
              element={<ShowResidentService />}
            />
            <Route
              path="/ResidentServiceDetail/:eventId"
              element={<ResidentServiceDetail />}
            />
            <Route path="/SubmitServPage" element={<SubmitServPage />} />
            <Route path="/MyGroupBuy" element={<MyGroupBuy />} />
            <Route path="/JoinGroupBuy" element={<JoinGroupBuy />} />
            <Route path="/ListingDetail/:id" element={<ListingDetail />} />
            <Route path="/LocalService" element={<LocalService />} />
            <Route path="/ListingService" element={<ListingService />} />
            <Route path="/MyListing" element={<MyListing />} />
            <Route path="/GroupService" element={<GroupService />} />
            <Route path="/ResisdentService" element={<ResisdentService />} />
            <Route path="/MyResident" element={<MyResident />} />
            <Route path="/JoinResident" element={<JoinResident />} />
            <Route path="/ChalengePage" element={<ChalengePage />} />
            <Route path="/ChalengRegister" element={<ChalengRegister />} />
          </Route>
        </Routes>
      </Buildingcontrol>
    </BrowserRouter>
  );
}
export default App;
