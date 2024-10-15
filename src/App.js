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
import Employee from "./Components/EmployeeTable";
import EmployeeTable1 from "./Components/EmployeeTable";
import TeamMaster from "./Components/Team";
import DeparmentMaster from "./Components/Departments";
import DesignationMaster from "./Components/Designation";
import { SharedProvider } from "./Context";


function App() {

  const user_id = sessionStorage.getItem("user_id");

  return (
    <div >
      <SharedProvider>
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
              <Route
                path="/dashboard/employee-master"
                element={<Employee />}
              />
              <Route path="/dashboard/employee-master2" element={<EmployeeTable1 />} />

              <Route path="/dashboard/department" element={<DeparmentMaster />} />

              <Route path="/dashboard/team" element={<TeamMaster />} />
              <Route path="/dashboard/designation" element={<DesignationMaster />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </SharedProvider>
    </div>
  );
}


export default App;
