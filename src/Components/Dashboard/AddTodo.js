import React, { useState } from 'react';
import {
    Drawer, TextField, MenuItem, Button, Typography, FormControl, InputLabel, Select, Box
} from '@mui/material';
import TaskTimingPicker from './time';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// import Datetime from 'react-datetime';

const drawerWidth = 600;


const Department = [
    { id: '1', name: 'Software Development' },
    { id: '2', name: 'IT support Helpdesk' },
    { id: '3', name: 'HR Executive' },
    { id: '4', name: 'Front desk' },
    { id: '5', name: 'Admin & Facility' },
    { id: '6', name: 'Business Development' },
]

const Teams = [
    { id: '1', name: 'One' },
    { id: '2', name: 'Two' },
    { id: '3', name: 'Three' },
    { id: '4', name: 'Four' },
    { id: '5', name: 'Five' },
    { id: '6', name: 'Six' },
    { id: '7', name: 'Seven' }
]

const Assgine = [
    { id: '1', name: 'Sathis kumar R' },
    { id: '2', name: 'Rohit V' },
    { id: '3', name: 'Siddhalingaiyah' },
    { id: '4', name: 'Suresh' },
    { id: '5', name: 'Dilip' },
    { id: '6', name: 'Sampath' },
]

const AddTodo = ({ value }) => {

    console.log(value, 'important one buddy')
    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    // if(value === 1){
    //     const state 
    // }

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        department: value === '1' ? userinfo.user_role : '',
        team: value === '1' ? userinfo.user_role : '',
        assignee: value === '1' ? userinfo.user_name : '',
        startDateTime: dayjs(),
        endDateTime: dayjs().add(1, 'hour')
    });



    const AuthorizedPerson = userinfo.user_role


    const [open, setOpen] = useState(false);



    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
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

        return {
            hours,
            minutes,
            seconds
        };
    }


    const isFormIncomplete = () => {
        return Object.values(formState).some(value => value === '' || value === null);
    };

    const handleSend = () => {
        // try {
        //     const response = await axios.post('', formState);

        //     if (response.status === 200) {
        //         setFormState({
        //             name: '',
        //             description: '',
        //             department: '',
        //             team: '',
        //             assignee: '',
        //             tat: '',
        //         });
        //         toggleDrawer();
        //     } else {
        //         console.error('Failed to save data');
        //     }
        // } catch (error) {
        //     console.error('Error saving data:', error);
        // }
        // console.log(formState, '34343434343')
        // console.log(formState.startDateTime)
        // console.log(formState.endDateTime)

        if (formState.startDateTime && formState.endDateTime) {
            const difference = calculateTimeDifference(formState.startDateTime, formState.endDateTime);
            console.log(difference, 'so much important sathis ')
        }

        console.log(formState, 'state action must be seen')

        setFormState({
            name: '',
            description: '',
            department: '',
            team: '',
            assignee: '',
            startDateTime: dayjs(new Date()),
            endDateTime: dayjs().add(1, 'hour')
        });

        toggleDrawer();

    };

    return (
        <>
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
                                    {Department.map((item) => (
                                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
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
                                        <MenuItem key={items.name} value={items.name}>{items.name}</MenuItem>
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
                                    {Assgine.map((item) => (
                                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                    ))}
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
                            {/* <Button variant="contained" onClick={handleSend}> */}
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );


    // return (
    //     <>
    //         <Button variant="contained" onClick={toggleDrawer}>Add Todo</Button>
    //         <Drawer
    //             anchor="right"
    //             open={open}
    //             onClose={toggleDrawer}
    //             sx={{ width: drawerWidth, flexShrink: 0 }}
    //         >
    //             <Box
    //                 sx={{ width: drawerWidth, p: 5, marginTop: 4 }}
    //                 role="presentation"
    //             >
    //                 <Typography variant="h6" gutterBottom>
    //                     Task
    //                 </Typography>
    //                 <TextField
    //                     fullWidth
    //                     label="Name"
    //                     name="name"
    //                     value={formState.name}
    //                     onChange={handleChange}
    //                     margin="normal"
    //                 />
    //                 <TextField
    //                     fullWidth
    //                     label="Description"
    //                     name="description"
    //                     value={formState.description}
    //                     onChange={handleChange}
    //                     multiline
    //                     rows={4}
    //                     margin="normal"
    //                 />
    //                 <FormControl fullWidth margin="normal">
    //                     <InputLabel>Department</InputLabel>
    //                     <Select
    //                         name="department"
    //                         value={formState.department}
    //                         onChange={handleChange}
    //                         label="Department"
    //                     >
    //                         {Department.map((item) => (

    //                             <MenuItem value={item.name}>{item.name}</MenuItem>
    //                         ))}
    //                     </Select>
    //                 </FormControl>
    //                 <FormControl fullWidth margin="normal">
    //                     <InputLabel>Team</InputLabel>
    //                     <Select
    //                         name="team"
    //                         value={formState.team}
    //                         onChange={handleChange}
    //                         label="Team" Department
    //                     >
    //                         {
    //                             Teams.map((items) => (
    //                                 <MenuItem value={items.name}>{items.name}</MenuItem>
    //                             ))
    //                         }

    //                     </Select>
    //                 </FormControl>
    //                 <FormControl fullWidth margin="normal">
    //                     <InputLabel>Assignee</InputLabel>
    //                     <Select
    //                         name="assignee"
    //                         value={formState.assignee}
    //                         onChange={handleChange}
    //                         label="Assignee"
    //                     >

    //                         {Assgine.map((item) => (
    //                             <MenuItem value={item.name}>{item.name}</MenuItem>
    //                         ))}

    //                     </Select>
    //                 </FormControl>

    //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                     <Box sx={{ padding: 2,display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
    //                         <DateTimePicker
    //                             label="Start Date & Time"
    //                             value={startDateTime}
    //                             onChange={(newValue) => setStartDateTime(newValue)}
    //                             renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2 }} />}
    //                         />
    //                         <DateTimePicker
    //                             label="End Date & Time"
    //                             value={endDateTime}
    //                             onChange={(newValue) => setEndDateTime(newValue)}
    //                             renderInput={(params) => <TextField  {...params} sx={{ marginBottom: 2 }} />}
    //                         />

    //                     </Box>
    //                 </LocalizationProvider>

    //                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
    //                     <Button variant="outlined" onClick={toggleDrawer}>
    //                         Cancel
    //                     </Button>
    //                     <Button variant="contained" onClick={handleSend}>
    //                         Send
    //                     </Button>
    //                 </Box>
    //             </Box>
    //         </Drawer>
    //     </>
    // );
};

export default AddTodo;
