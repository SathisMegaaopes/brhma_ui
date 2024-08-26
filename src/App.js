import { Routes, Route, BrowserRouter } from "react-router-dom";

import MegaOpesCandidateRegistration from "./Components/CandidateRegistration";
import CandidateInterview from "./Components/CandidateInterview";
import Page404 from "./Components/Global/Page404";
import MOSCandidate from "./Components/Candidate";
import Landing from "./Components/Global/Landing";
import ThankYou from "./Components/Global/ThankYou";
import MOSLogin from "./Components/Login";
import MOSLayout from "./Components/Layout";
import MOSDashboard from "./Components/Dashboard";

function App() {
  const user_id = sessionStorage.getItem("user_id");
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route
            path="/candidate"
            element={<MegaOpesCandidateRegistration />}
          />

          <Route path="/" element={<Landing />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/login" element={<MOSLogin />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/dashboard" element={<MOSLayout />}>
            <Route index element={<MOSDashboard />} />
            <Route
              path="/dashboard/evalution"
              element={<CandidateInterview />}
            />
            <Route
              path="/dashboard/candidate-master"
              element={<MOSCandidate />}
            />
            {/* //new code */}
            {/* <Route path='/dashboard/candidate-master/:employeeid' element={<MOSCandidate/>}/>  */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
