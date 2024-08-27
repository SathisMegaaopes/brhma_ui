import React, { useEffect, useState } from 'react';
import {
    Drawer, TextField, MenuItem, Button, Typography, FormControl, InputLabel, Select, Box
} from '@mui/material';
import TaskTimingPicker from './time';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import URL from "../Global/Utils/url_route.js";
import axios from "axios"
import SuccessFailureModal from './successfailuremodal.js';

const drawerWidth = 600;


const AddTodo = ({ value }) => {

    const importantValue = value;

    const [departments, setDepartments] = useState([]);

    const [departid, setdepartid] = useState(null);

    const [Teams, setTeams] = useState([]);

    const [teamID, setteamID] = useState(null);

    const [employee, setEmployee] = useState([])

    const [employeeID, setEmployeeID] = useState(null)

    const [openModal, setOpenModal] = useState(false)

    const [addtskstatus, setaddtaskstats] = useState(null)

    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        department: value === '1' ? userinfo.user_role : '',
        team: value === '1' ? userinfo.user_role : '',
        assignee: value === '1' ? userinfo.user_name : '',
        startDateTime: dayjs(),
        endDateTime: dayjs().add(1, 'hour')
    });


    useEffect(() => {
        let url = `${URL}todolist/employee`;
        axios.get(url, {
            params: {
                id: teamID
            }
        })
            .then((response) => {
                const fetchedEmployees = response.data.data;

                setEmployee(fetchedEmployees);
                console.log(fetchedEmployees);

                if (importantValue === '1') {
                    const getLoggedUserDetails = fetchedEmployees.find((item) => item["Emp ID"] === userinfo.user_details.emp_id);

                    if (getLoggedUserDetails) {
                        console.log('this is executed');

                        setdepartid(getLoggedUserDetails.Department);
                        setteamID(getLoggedUserDetails.Team);
                        setEmployeeID(getLoggedUserDetails["Emp ID"]);

                        setFormState((prevState) => ({
                            ...prevState,
                            department: getLoggedUserDetails.Department,
                            team: getLoggedUserDetails.Team,
                            assignee: getLoggedUserDetails["Emp ID"]
                        }));
                    }
                }

                console.log(formState);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });


    }, [teamID])


    useEffect(() => {

        let url = `${URL}todolist/department`

        axios.get(url)
            .then((response) => {
                setDepartments(response.data.data)
            })
            .catch();

    }, [])


    useEffect(() => {

        let url = `${URL}todolist/teams`;
        axios.get(url, {
            params: {
                id: departid
            }
        })
            .then((response) => {
                setTeams(response.data.data)
            })
            .catch();

    }, [departid])


    const AuthorizedPerson = userinfo.user_role

    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(!openModal)
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));


        if (name === 'department') {
            const departmentlist = departments.filter((item) => item.name === value)
            setdepartid(departmentlist[0].id);
        }

        if (name === 'team') {
            const teamlist = Teams.filter((item) => item.name === value)
            setteamID(teamlist[0].id)
        }

        if (name === 'assignee') {
            const employeelist = employee.filter((item) => item.f_name === value)
            setEmployeeID(employeelist[0]["Emp ID"])
        }

    };

    const handleDateChange = (name, newValue) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };


    function calculateTimeDifference(startTime, endTime) {
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();

        let diff = end - start;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);
        const seconds = Math.floor(diff / 1000);

        const final = `${hours}-${minutes}-${seconds}`

        // return {
        //     hours,
        //     minutes,
        //     seconds
        // };

        return final;

    }

    const isFormIncomplete = () => {
        return Object.values(formState).some(value => value === '' || value === null);
    };

    const handleSend = async () => {

        let url = `${URL}todolist`;

        const userID = userinfo.user_name
        const status = 0;
        const tatValue = calculateTimeDifference(formState.startDateTime, formState.endDateTime);
        const taskname = formState.name;
        const taskdes = formState.description;

        try {
            const response = await axios.post(url, { taskname, taskdes, departid, teamID, employeeID, status, tatValue, userID });
            // console.log(response.data.status,'response important')
            setaddtaskstats(response.data.status)
            setOpenModal(true)

        } catch (error) {

            console.error('Error saving data:', error);

        } finally {
            toggleDrawer();

            setFormState({
                name: '',
                description: '',
                department: value === '1' ? userinfo.user_role : '',
                team: value === '1' ? userinfo.user_role : '',
                assignee: value === '1' ? userinfo.user_name : '',
                startDateTime: dayjs(new Date()),
                endDateTime: dayjs().add(1, 'hour'),
            });


        }
        // task_name , task_description , task_dept , task_team , task_assignee , status , tat , created_by , created_at ;

    };

    return (
        <>
            <SuccessFailureModal 
            open={openModal} 
            handleClose={handleCloseModal} 
            status={addtskstatus} 
            successmsg={"Task added Successfully"}
            errormsg={"Something went wrong, Please try again !"}

            />

            <Button variant="text" onClick={toggleDrawer} sx={{ fontSize: 'xs' }}>Add Task</Button>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                sx={{ width: drawerWidth, flexShrink: 0 }}
            >
                <Box
                    sx={{ width: drawerWidth, p: 5, marginTop: 4 }}
                    role="presentation"
                >
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                        Task
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    {AuthorizedPerson === 1 && value === '2' ?
                        <>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Department</InputLabel>
                                <Select
                                    name="department"
                                    value={formState.department}
                                    onChange={handleChange}
                                    label="Department"
                                >
                                    {departments.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Team</InputLabel>
                                <Select
                                    name="team"
                                    value={formState.team}
                                    onChange={handleChange}
                                    label="Team"
                                >
                                    {Teams.map((items) => (
                                        <MenuItem key={items.id} value={items.name}>{items.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Assignee</InputLabel>
                                <Select
                                    name="assignee"
                                    value={formState.assignee}
                                    onChange={handleChange}
                                    label="Assignee"
                                >
                                    {employee.length > 0 ? (
                                        employee.map((item) => (
                                            <MenuItem key={item.id} value={item.f_name}>{item.f_name}</MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No employees available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </>
                        : ' '}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
                            <DateTimePicker
                                label="Start Date & Time"
                                value={formState.startDateTime}
                                onChange={(newValue) => handleDateChange('startDateTime', newValue)}
                                renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2 }} />}
                            />
                            <DateTimePicker
                                label="End Date & Time"
                                value={formState.endDateTime}
                                onChange={(newValue) => handleDateChange('endDateTime', newValue)}
                                renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2 }} />}
                            />
                        </Box>
                    </LocalizationProvider>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" onClick={toggleDrawer}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSend} disabled={isFormIncomplete()}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );

};

export default AddTodo;
