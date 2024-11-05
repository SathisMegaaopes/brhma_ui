import React, { useEffect, useState } from "react";
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
import EmployeeTable1 from "../EmployeeTable";
import { useSharedContext } from "../../Context";
// import EmployeeForm from "../EmployeeTable/employeeForm";
import EmployeeForm from "../EmployeeOnboard";
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import DeparmentMaster from "../Departments";
import TeamMaster from "../Team";
import DesignationMaster from "../Designation";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';





const SidebarContainer = styled('div')(({ isopen, isactive }) => ({
    height: "100%",
    width: isopen ? "280px" : "60px",
    position: "fixed",
    zIndex: 3,
    left: 0,
    backgroundColor: isopen ? "#749BC2" : "#749BC2",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "width 0.5s, background-color 0.5s",
    whiteSpace: "nowrap",
    // boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
}));

const MainContainer = styled('div')(() => ({
    padding: "16px",
    marginLeft: "40px",
}));

const SidebarIcon = styled(IconButton)(({ theme, isopen, isactive }) => ({
    color: isactive ? 'White' : isopen ? "#91C8E4" : "#91C8E4",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: 'center',
    padding: "25px 15px",
    fontSize: "20px",
    transition: "color 0.5s",
    "&:hover": {
        color: isopen ? "white" : "#f1f1f1",
    },
}));



function Sidebar() {
    const { sharedTab, setSharedTab, employeeAddTab, setEmployeeAddTab } = useSharedContext();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [isopen, setIsOpen] = useState(false);

    const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('activeTab') || 'info');

    // const [activeTab, setActiveTab] = useState('info');


    const navigate = useNavigate();
    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));
    const AuthorizedPerson = userinfo.user_role;

    React.useEffect(() => {

        if (activeTab !== 'EmployeeMaster2') {
            setEmployeeAddTab((prev) => ({
                ...prev,
                candidateId: null,
                status: 0
            }))
        }

    }, [activeTab])

    React.useEffect(() => {
        if (sharedTab.active === 1) {
            setActiveTab('particularEmployee')
        } else if (employeeAddTab.status === 1) {
            setActiveTab('EmployeeMaster2')
        } else if (employeeAddTab.status === 2) {
            setActiveTab('EmployeeMaster')
        }

    }, [sharedTab.active, employeeAddTab])

    useEffect(() => {
        sessionStorage.setItem("activeTab", activeTab);
        switch (activeTab) {
            case 'info':
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
            case 'EmployeeMaster2':
                navigate(`/dashboard/employee-master2`);
                break;
            case 'Team':
                navigate('/dashboard/team');
                break;
            case 'Department':
                navigate('/dashboard/department');
                break;
            case 'Designation':
                navigate('/dashboard/designation');
                break;
            default:
                navigate("/");
        }
    }, [activeTab, navigate]);


    const renderContent = () => {
        switch (activeTab) {
            case 'info':
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
                return <EmployeeTable />;
            case 'EmployeeMaster2':
                // return <EmployeeForm />; 
                return <EmployeeForm />;
            case 'Department':
                return <DeparmentMaster />;
            case 'Team':
                return <TeamMaster />;
            case 'Designation':
                return <DesignationMaster />;
            default:
                return <MOSDashboard />;
        }
    };

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
        });
    };

    return (
        <>
            <SidebarContainer
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isopen={isopen}
            >
                <SidebarIcon
                    disableRipple
                    aria-label="info"
                    isopen={isopen}
                    onClick={() => handleTabChange('info')}
                    isactive={activeTab === 'info'}
                >
                    <AddTaskIcon sx={{ fontSize: 30 }} />
                    {isopen && <span>&nbsp;&nbsp;&nbsp;Dashboard</span>}
                </SidebarIcon>
                <SidebarIcon
                    disableRipple
                    aria-label="CandidateEvaluation"
                    isopen={isopen}
                    onClick={() => handleTabChange('CandidateEvaluation')}
                    isactive={activeTab === 'CandidateEvaluation'}
                    style={{ marginTop: '-20px' }}
                >
                    <PersonSearchSharpIcon sx={{ fontSize: 35 }} />
                    {isopen && <span>&nbsp;&nbsp;&nbsp;Candidate Evaluation</span>}
                </SidebarIcon>
                {AuthorizedPerson === 1 && (
                    <SidebarIcon
                        disableRipple
                        aria-label="CandidateDatabase"
                        isopen={isopen}
                        onClick={() => handleTabChange('CandidateDatabase')}
                        isactive={activeTab === 'CandidateDatabase'}
                        style={{ marginTop: '-20px' }}
                    >
                        <StorageRoundedIcon sx={{ fontSize: 30 }} />
                        {isopen && <span>&nbsp;&nbsp;&nbsp;Candidate Database</span>}
                    </SidebarIcon>
                )}
                {AuthorizedPerson === 1 && (
                    <SidebarIcon
                        disableRipple
                        // aria-label="EmployeeMaster"
                        isopen={isopen}
                        // onClick={() => handleTabChange('EmployeeMaster')}
                        // isactive={activeTab === 'EmployeeMaster'}
                        style={{ marginTop: '-20px' }}
                    >
                        <CorporateFareIcon sx={{ fontSize: 30 }} />
                        {isopen && <span>&nbsp;&nbsp;&nbsp;Organisation</span>}
                    </SidebarIcon>
                )}

                <div style={{ marginLeft: '45px', marginTop: '0px' }}>

                    <SidebarIcon
                        disableRipple
                        aria-label="EmployeeMaster"
                        isopen={isopen}
                        onClick={() => handleTabChange('EmployeeMaster')}
                        isactive={activeTab === 'EmployeeMaster'}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginTop: '-30px' }}
                    >
                        <SupervisorAccountIcon sx={{ fontSize: 20 }} />
                        {isopen && <span>&nbsp;&nbsp;&nbsp;Employee</span>}
                    </SidebarIcon>

                    <SidebarIcon
                        disableRipple
                        aria-label="Department"
                        isopen={isopen}
                        onClick={() => handleTabChange('Department')}
                        isactive={activeTab === 'Department'}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginTop: '-30px' }}
                    >
                        <BusinessIcon sx={{ fontSize: 20 }} />
                        {isopen && <span>&nbsp;&nbsp;&nbsp;Department</span>}
                    </SidebarIcon>

                    <SidebarIcon
                        disableRipple
                        aria-label="Team"
                        isopen={isopen}
                        onClick={() => handleTabChange('Team')}
                        isactive={activeTab === 'Team'}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginTop: '-30px' }}
                    >
                        <GroupsIcon sx={{ fontSize: 20 }} />
                        {isopen && <span>&nbsp;&nbsp;&nbsp;Team</span>}
                    </SidebarIcon>



                    <SidebarIcon
                        disableRipple
                        aria-label="Designation"
                        isopen={isopen}
                        onClick={() => handleTabChange('Designation')}
                        isactive={activeTab === 'Designation'}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginTop: '-30px' }}
                    >
                        <BadgeIcon sx={{ fontSize: 20 }} />
                        {isopen && <span>&nbsp;&nbsp;&nbsp;Designation</span>}
                    </SidebarIcon>
                </div>


            </SidebarContainer>
            <MainContainer>
                {renderContent()}
            </MainContainer>
        </>
    );
}




export default Sidebar;













