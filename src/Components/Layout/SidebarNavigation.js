import React, { useState } from "react";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { useLocation } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useNavigate } from "react-router-dom";
import CandidateInterview from "../CandidateInterview";
import MOSDashboard from "../Dashboard";
import MOSCandidate from "../Candidate";
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmployeeTable from "../EmployeeTable";
import { useSharedContext } from "../../Context";



const SidebarContainer = styled('div')(({ isOpen, isActive }) => ({
    height: "100%",
    width: isOpen ? "280px" : "60px",
    position: "fixed",
    zIndex: 3,
    left: 0,
    backgroundColor: isOpen ? "#808080" : "#272727",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "width 0.5s, background-color 0.5s",
    whiteSpace: "nowrap",
    boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
}));

const MainContainer = styled('div')(() => ({
    padding: "16px",
    marginLeft: "40px",
}));

const SidebarIcon = styled(IconButton)(({ theme, isOpen, isActive }) => ({
    color: isActive ? 'White' : isOpen ? "#B6B6B4" : "#B6B6B4",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: 'center',
    padding: "25px 15px",
    fontSize: "20px",
    transition: "color 0.5s",
    "&:hover": {
        color: isOpen ? "white" : "#f1f1f1",
    },
}));


function Sidebar() {

    const { sharedTab, setSharedTab } = useSharedContext();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tasks');

    const navigate = useNavigate();

    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    const AuthorizedPerson = userinfo.user_role

    React.useEffect(() => {
        if (sharedTab.active === 1) {
            setActiveTab('particularEmployee')
        } else {
            setActiveTab('tasks')
        }
    }, [sharedTab.active])

    React.useEffect(() => {
        // localStorage.setItem('activeTab', activeTab);
        switch (activeTab) {
            case 'tasks':
                navigate("/dashboard");
                break;
            case 'CandidateEvaluation':
                navigate("/dashboard/evalution");
                break;
            case 'CandidateDatabase':
                navigate("/dashboard/candidate-master");
                break;
            case 'particularEmployee':
                navigate(sharedTab.TabUrl);
                break;
            case 'EmployeeMaster':
                navigate('/dashboard/employee-master');
                break;
            default:
                navigate("/");
        }
    }, [activeTab, navigate]);


    const handleMouseEnter = () => {
        setIsOpen(true);
    };


    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    
    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSharedTab({
            Tabname: null,
            TabUrl: null,
            active: 0,
            backendUrl: null
        })
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'tasks':
                return <MOSDashboard />;
            case 'CandidateEvaluation':
                return <CandidateInterview />;
            case 'CandidateDatabase':
                return <MOSCandidate />;
            case 'particularEmployee':

                const employid = queryParams.get('employid');
                const fromdate = queryParams.get('fromdate');
                const todate = queryParams.get('todate');

                return <MOSCandidate emp_id={employid} fromDate={fromdate} toDate={todate} />;
            case 'EmployeeMaster':
                return <EmployeeTable />

            default:
                return <MOSDashboard />;
        }
    };


    return (
        <>
            <SidebarContainer
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isOpen={isOpen}
            >
                <SidebarIcon disableRipple aria-label="tasks" isOpen={isOpen} onClick={() => handleTabChange('tasks')} isActive={activeTab === 'tasks'} >
                    <AddTaskIcon sx={{ fontSize: 30 }} />
                    {isOpen && <span>&nbsp;&nbsp;&nbsp;Dashboard</span>}
                </SidebarIcon>
                <SidebarIcon disableRipple aria-label="CandidateEvaluation" isOpen={isOpen} onClick={() => handleTabChange('CandidateEvaluation')} isActive={activeTab === 'CandidateEvaluation'} >
                    <PersonSearchSharpIcon sx={{ fontSize: 35 }} />
                    {isOpen && <span>&nbsp;&nbsp;&nbsp;Candidate Evaluation</span>}
                </SidebarIcon>
                {AuthorizedPerson === 1 ?
                    <SidebarIcon disableRipple aria-label="CandidateDatabase" isOpen={isOpen} onClick={() => handleTabChange('CandidateDatabase')} isActive={activeTab === 'CandidateDatabase'} >
                        <StorageRoundedIcon sx={{ fontSize: 30 }} />
                        {isOpen && <span>&nbsp;&nbsp;&nbsp;Candidate Database</span>}
                    </SidebarIcon> : ''}

                {AuthorizedPerson === 1 &&
                    <SidebarIcon disableRipple aria-label="EmployeeMaster" isOpen={isOpen} onClick={() => handleTabChange('EmployeeMaster')} isActive={activeTab === 'EmployeeMaster'} >
                        <SupervisorAccountIcon sx={{ fontSize: 30 }} />
                        {isOpen && <span>&nbsp;&nbsp;&nbsp;Employee Table</span>}
                    </SidebarIcon>}

            </SidebarContainer>
            <MainContainer>
                {renderContent()}
            </MainContainer>
        </>
    );
}




export default Sidebar;



