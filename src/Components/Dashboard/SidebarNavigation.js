
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";


import AddTaskIcon from '@mui/icons-material/AddTask';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { Outlet, useNavigate } from "react-router-dom";
import CandidateInterview from "../CandidateInterview";
import MOSDashboard from ".";
import MOSCandidate from "../Candidate";

import StorageRoundedIcon from '@mui/icons-material/StorageRounded';

import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';


const SidebarContainer = styled('div')(({ isOpen, isActive }) => ({
    height: "100%",
    width: isOpen ? "280px" : "60px",
    position: "fixed",
    zIndex: 1,
    left: 0,
    backgroundColor: isOpen ? "#76b5c5" : "#1e81b0",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "width 0.5s, background-color 0.5s",
    whiteSpace: "nowrap",
    boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
}));

const MainContainer = styled('div')(() => ({
    padding: "16px",
    marginLeft: "85px",
}));

const SidebarIcon = styled(IconButton)(({ theme, isOpen, isActive }) => ({
    color: isActive ? 'black' : isOpen ? "#f1f1f1" : "#eeeee4",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: 'center',
    padding: "25px 15px",
    // marginTop:'10px',
    fontSize: "20px",
    transition: "color 0.3s",
    "&:hover": {
        color: isOpen ? "#343640" : "#f1f1f1",
    },
}));

// color: isOpen ? "#f1f1f1" : isActive ? 'black' : isActive ? 'red' : "#eeeee4",

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tasks');
    const navigate = useNavigate();

    // const handleMouseEnter = () => {
    //     setIsOpen(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsOpen(false);
    // };

    // const handleTabChange = (tab) => {
    //     setActiveTab(tab);
    //     switch (tab) {
    //         case 'tasks':
    //             navigate("/dashboard");
    //             break;
    //         case 'CandidateEvaluation':
    //             navigate("/dashboard/evalution");
    //             break;
    //         case 'CandidateDatabase':
    //             navigate("/dashboard/candidate-master");
    //             break;
    //         case 'inprogress-3':
    //             // Add a route for this case if necessary
    //             // navigate("/dashboard");
    //             break;
    //         default:
    //             navigate("/");
    //     }
    // };

    // const renderContent = () => {
    //     switch (activeTab) {
    //         case 'tasks':
    //             return <MOSDashboard />;
    //         case 'CandidateEvaluation':
    //             return <CandidateInterview />;
    //         case 'CandidateDatabase':
    //             return <MOSCandidate />;
    //         case 'inprogress-3':
    //             // return <MOSDashboard />;
    //             return <div>
    //                 <h2>Feature Under Development</h2>
    //                 <p>This feature is currently under development.</p>
    //             </div>

    //         default:
    //             return <MOSDashboard />;
    //     }
    // };

    React.useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
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
            case 'inprogress-3':
                // Add a route for this case if necessary
                // navigate("/dashboard");
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
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'tasks':
                return <MOSDashboard />;
            case 'CandidateEvaluation':
                return <CandidateInterview />;
            case 'CandidateDatabase':
                return <MOSCandidate />;
            case 'inprogress-3':
                return <div>
                    <h2>Feature Under Development</h2>
                    <p>This feature is currently under development.</p>
                </div>;
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
                    {isOpen && <span>&nbsp;&nbsp;&nbsp;Tasks</span>}
                </SidebarIcon>
                <SidebarIcon disableRipple aria-label="CandidateEvaluation" isOpen={isOpen} onClick={() => handleTabChange('CandidateEvaluation')} isActive={activeTab === 'CandidateEvaluation'} >
                    {/* <HourglassEmptyIcon /> */}
                    <PersonSearchSharpIcon sx={{ fontSize: 35 }} />
                    {isOpen && <span>&nbsp;&nbsp;&nbsp;Candidate Evaluation</span>}
                </SidebarIcon>
                <SidebarIcon disableRipple aria-label="CandidateDatabase" isOpen={isOpen} onClick={() => handleTabChange('CandidateDatabase')} isActive={activeTab === 'CandidateDatabase'} >
                    <StorageRoundedIcon sx={{ fontSize: 30 }} />
                    {isOpen && <span>&nbsp;&nbsp;&nbsp;Candidate Database</span>}
                </SidebarIcon>
                <SidebarIcon disableRipple aria-label="inprogress-3" isOpen={isOpen} onClick={() => handleTabChange('inprogress-3')} isActive={activeTab === 'inprogress-3'} >
                    <HourglassEmptyIcon sx={{ fontSize: 30 }} />
                    {isOpen && <span>&nbsp;&nbsp;&nbsp;In Progress 3</span>}
                </SidebarIcon>
            </SidebarContainer>
            <MainContainer>
                {renderContent()}
            </MainContainer>
        </>
    );
}


export default Sidebar;



