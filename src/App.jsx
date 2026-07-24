import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*
        <Route element={<Layout />}>
          <Route path="/" element={<RequestOtp />} />
          <Route path="/verify" element={<VerifyOtp />} />
        </Route>
        <Route element={<Welcomelayout />}>
          <Route path="/welcome" element={<Welcome />} />
        </Route>
*/}

        <Route element={<Otherlayout />}>
          <Route path="/Managerprofile" element={<Managerprofile />} />
          <Route path="/Buildinginfo" element={<Buildinginfo />} />
          <Route path="/Changing" element={<Changing />} />
          <Route path="/Newowner" element={<Newowner />} />
          <Route path="/Showmembers" element={<Showmembers/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
