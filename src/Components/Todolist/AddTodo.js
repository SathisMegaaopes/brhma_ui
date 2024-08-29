import React, { useEffect, useState } from 'react';
import {
    Drawer, TextField, MenuItem, Button, Typography, FormControl, InputLabel, Select, Box
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import URL from "../Global/Utils/url_route.js";
import axios from "axios"
import SuccessFailureModal from '../ModalComponents/successfailuremodal.js';
import ConfirmationModal from '../ModalComponents/confirmationModal.js';
import { formatMeridiem } from '@mui/x-date-pickers/internals';
import { DateFormater, formatDateTime } from '../Global/Utils/common_data.js';
import { VerticalAlignBottom } from '@mui/icons-material';

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

    const [confirmCancel, setConfirmCancel] = useState(false)

    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        // department: value === '1' ? userinfo.user_role : null,
        // team: value === '1' ? userinfo.user_role : null ,
        // assignee: value === '1' ? userinfo.user_name : null,
        department: null,
        team: null,
        assignee: null,
        startDateTime: null,
        endDateTime: null
    });


    // console.log(formState)



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

                // console.log(formState);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });


    }, [teamID])


    const AuthorizedPerson = userinfo.user_role

    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(!openModal)
        window.location.reload()
    }

    const toggleDrawer = () => {
        // setOpen(!open);

    };

    const handleCloseConfirmationModal = () => {
        setConfirmCancel(false)
        setOpen(true);
    }


    const handleConfirm = () => {
        setConfirmCancel(false)
        setOpen(false)
        setFormState({
            name: null,
            description: null,
            department: value === '1' ? userinfo.user_role : null,
            team: value === '1' ? userinfo.user_role : null,
            assignee: value === '1' ? userinfo.user_name : null,
            startDateTime: null,
            endDateTime: null,
        });

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
            [name]: dayjs(newValue)
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



        return final;

    }

    const calculateTotalDuration = (a, b) => {
        return Math.abs(a.diff(b, 'second'));
    };

    const isFormIncomplete = () => {
        return Object.values(formState).some(value => value === '' || value === null);
    };


    const handleSend = async () => {

        let url = `${URL}todolist`;

        const userID = userinfo.user_name
        const status = 0;

        const taskname = formState.name;
        const taskdes = formState.description;

        const startDate = formatDateTime(formState.startDateTime)
        const endDate = formatDateTime(formState.endDateTime)

        // const tatValue = calculateTotalDuration(formState.startDateTime, formState.endDateTime)

        try {
            const response = await axios.post(url, { taskname, taskdes, departid, teamID, employeeID, status, startDate, endDate, userID });

            setaddtaskstats(response.data.status)
            setOpenModal(true)

        } catch (error) {

            console.error('Error saving data:', error);

        } finally {

            setOpen(false);

            setFormState({
                name: '',
                description: '',
                department: value === '1' ? userinfo.user_role : '',
                team: value === '1' ? userinfo.user_role : '',
                assignee: value === '1' ? userinfo.user_name : '',
                startDateTime: null,
                endDateTime: null,
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

            <Button variant="text" onClick={() => setOpen(true)} sx={{ fontSize: 'xs' }}>Add Task</Button>


            <ConfirmationModal open={confirmCancel} title={"Do you wish to cancel !"} description={"The Content will be lost "} onConfirm={handleConfirm} onClose={handleCloseConfirmationModal} />


            <Drawer
                anchor="right"
                open={open}
                // onClose={toggleDrawer}
                sx={{ width: drawerWidth, flexShrink: 0 }}
            >
                <Box
                    sx={{
                        width: drawerWidth,
                        p: 5,
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}
                    role="presentation"
                >
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                            Task
                        </Typography>
                        <TextField
                            fullWidth
                            label={<span>Name<span style={{ color: 'red' }}> *</span></span>}
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            // label="Description"
                            label={<span>Description<span style={{ color: 'red' }}> *</span></span>}
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        {AuthorizedPerson === 1 && value === '2' && (
                            <>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Department <span style={{ color: 'red' }}> *</span></InputLabel>
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
                                    <InputLabel>Team <span style={{ color: 'red' }}> *</span></InputLabel>
                                    <Select
                                        name="team"
                                        value={formState.team}
                                        onChange={handleChange}
                                        label="Team"
                                        disabled={!Boolean(formState.department)}
                                    >
                                        {Teams.map((items) => (
                                            <MenuItem key={items.id} value={items.name}>{items.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Assignee <span style={{ color: 'red' }}> *</span></InputLabel>
                                    <Select
                                        name="assignee"
                                        value={formState.assignee}
                                        onChange={handleChange}
                                        label="Assignee"
                                        disabled={!Boolean(formState.team)}
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
                        )}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
                                <DateTimePicker
                                    // label="Start Date & Time"
                                    label={<span>Start Date & Time<span style={{ color: 'red' }}> *</span></span>}
                                    value={formState.startDateTime}
                                    onChange={(newValue) => handleDateChange('startDateTime', newValue)}
                                    renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2, flex: 1 }} />}
                                    minDate={dayjs()} // Ensure this is a Day.js object
                                    minTime={formState.startDateTime ? formState.startDateTime : dayjs()}
                                    sx={{ marginLeft: '-15px' }} // Ensure this is a Day.js object
                                />
                                <DateTimePicker
                                    // label="End Date & Time"
                                    label={<span>End Date & Time<span style={{ color: 'red' }}> *</span></span>}
                                    value={formState.endDateTime}
                                    onChange={(newValue) => handleDateChange('endDateTime', newValue)}
                                    renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2, flex: 1 }} />}
                                    minDate={formState.startDateTime ? formState.startDateTime : dayjs()}
                                    minTime={formState.startDateTime && dayjs(formState.startDateTime).isSame(dayjs(), 'day') ? formState.startDateTime : null}
                                    sx={{ marginRight: '-15px' }}
                                />

                            </Box>
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" onClick={() => setConfirmCancel(!confirmCancel)}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSend} disabled={isFormIncomplete()}>
                            Create
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );

};

export default AddTodo;
