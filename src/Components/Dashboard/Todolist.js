import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    Typography,
    Button,
    Box,
    Grid,
    Stack,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Modal,
    Tooltip,
    tooltipClasses,
    styled,
} from '@mui/material';
import URL from '../Global/Utils/url_route';
import Fade from '@mui/material/Fade';
import axios from 'axios';

import AddTodo from './AddTodo';

import TimelapseSharpIcon from '@mui/icons-material/TimelapseSharp';
import { Description } from '@mui/icons-material';

const Todolist = () => {

    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    const username = userinfo.user_name;

    const tat = 2;

    const [todoList, setTodoList] = useState([])

    const [timeLeft, setTimeLeft] = useState(0);
    const [color, setColor] = useState('inherit');

    const [select, setSelect] = React.useState('open');


    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);



    const handleChange = (event, id) => {
        setSelect(event.target.value);

        const changedOne = myassingedTasks.filter((item) => item.id === id)

        // console.log(changedOne)
    };


    useEffect(() => {

        let url = URL + "todolist"

        axios.get(url, {
            params: {
                id: username
            }
        })
            .then((response) => {
                // console.log(response.data.status)
                if (response.data.status === 1) {
                    setTodoList(response.data.data.todolist)
                } else {
                    console.log("ERROR : ", JSON.stringify(response.message));
                }
            })
            .catch()
            .finally()
    }, [])





    // useEffect(() => {
    //     const storedEndTime = localStorage.getItem('endTime');
    //     if (storedEndTime) {
    //         const endTime = parseInt(storedEndTime, 10);
    //         const now = Date.now();
    //         const timeRemaining = Math.max(Math.floor((endTime - now) / 1000), 0);
    //         setTimeLeft(timeRemaining);
    //     } else {
    //         const endTime = Date.now() + tat * 60 * 60 * 1000;
    //         localStorage.setItem('endTime', endTime.toString());
    //         setTimeLeft(tat * 60 * 60);
    //     }
    // }, [tat]);



    // useEffect(() => {
    //     if (timeLeft <= 0) {
    //         setColor('red');
    //     } else if (timeLeft <= tat * 60 * 60 * 0.2) {
    //         setColor('orange');
    //     } else {
    //         setColor('green');
    //     }
    // }, [timeLeft, tat]);



    // useEffect(() => {

    //     const interval = setInterval(() => {
    //         setTimeLeft((prev) => {
    //             if (prev <= 0) {
    //                 clearInterval(interval);
    //                 localStorage.removeItem('endTime');
    //                 return 0;
    //             }
    //             return prev - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);




    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        // return `${hours}h ${minutes}m ${secs < 10 ? '0' : ''}${secs}s`;
        return `${hours}h ${minutes}m`;
    };

    const todos = [
        {
            id: 1, task: 'Follow up with the customer regarding their recent inquiry.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'Software', Asignee: 'self',
            Tat: '2hrs',
            status: 1,
        },
        {
            id: 2, task: 'Resolve billing issues for customer accounts.', Description: 'Free For Up To 10 Users — Confluence™ Is Your Remote-Friendly Team Workspace Where Knowledge And Collaboration Meet. Collaborate On Projects And Plans Across Teams, All In One Place', department: 'IT', Asignee: 'Siddhalingaiyah',
            Tat: '6hrs',
            status: 0,
        }, {
            id: 3, task: 'Provide technical support for service-related issues.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'self',
            Tat: '8hrs',
            status: 4,
        },
        {
            id: 4, task: 'Let me guess who are all capable persons', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'Suresh',
            Tat: '8hrs',
            status: 2,
        },
        {
            id: 5, task: 'Schedule callbacks for unresolved customer concerns.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'self',
            Tat: '8hrs',
            status: 3,
        }, {
            id: 6, task: 'Update customer information in the CRM system.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'Dilip',
            Tat: '8hrs',
            status: 3,
        },
        {
            id: 7, task: 'Follow up with the customer regarding their recent inquiry.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'Dhoni',
            Tat: '8hrs',
            status: 4,
        },
        {
            id: 8, task: 'Follow up with the customer regarding their recent inquiry.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'Dhoni',
            Tat: '8hrs',
            status: 1,
        },
        {
            id: 9, task: 'Follow up with the customer regarding their recent inquiry.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'Dhoni',
            Tat: '8hrs',
            status: 0,
        },
        {
            id: 10, task: 'Follow up with the customer regarding their recent inquiry.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'Dhoni',
            Tat: '8hrs',
            status: 0,
        },
        {
            id: 11, task: 'Provide technical support for service-related issues.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'self',
            Tat: '8hrs',
            status: 4,
        },
        {
            id: 12, task: 'Provide technical support for service-related issues.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'self',
            Tat: '8hrs',
            status: 4,
        },
        {
            id: 13, task: 'Provide technical support for service-related issues.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'self',
            Tat: '8hrs',
            status: 4,
        },
        // {
        //     id: 14, task: 'Provide technical support for service-related issues.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'self',
        //     Tat: '8hrs',
        //     status: 4,
        // },
        // {
        //     id: 15, task: 'Provide technical support for service-related issues.', Description: 'Follow up with the customer regarding their recent inquiry.', department: 'HR', Asignee: 'self',
        //     Tat: '8hrs',
        //     status: 4,
        // },
    ];

    const myallTasks = todos.filter((item) => item.Asignee === 'self');


    const myassingedTasks = todos.filter((item) => item.Asignee !== 'self')




    const handleClose = () => {
        setOpen(false);
        setSelectedTask(null);
    };



    const handleStatus = (status) => {
        switch (status) {
            case 0:
                return <span style={{ color: 'black' }}>Open</span>;
            case 1:
                return <span style={{ color: 'blue' }}>In progress</span>;
            case 2:
                return <span style={{ color: '#83f28f' }}>Completed</span>;
            case 3:
                return <span style={{ color: 'red' }}>On Hold</span>;
            case 4:
                return <span style={{ color: '#008631' }}>Done</span>;
            default:
                return <span style={{ color: '#808080' }}>Unknown Status</span>;
        }
    }

    // console.log(typeof(todoList[0].tat), 'The whole tasks..')

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>


            <>

                <TableContainer component={Paper} sx={{ maxWidth: 500, margin: '0px auto', maxHeight: 350, padding: '0px' }} >
                    <Table stickyHeader >
                        <TableHead>
                            <TableRow>
                                {/* <TableCell sx={{ padding: '4px' }} /> */}
                                <TableCell sx={{ padding: '12px', textAlign: 'center', paddingLeft: '100px' }} colSpan={2}>
                                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                        MyTasks
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'right' }}>
                                    <AddTodo value='1' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead >

                            <TableRow>
                                <TableCell align="center" sx={{ padding: '6px' }} colSpan={1} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Description
                                    </Typography>
                                </TableCell>
                                {/* <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Assigned To
                                    </Typography>
                                </TableCell> */}
                                <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Timer
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {todoList.map((todo) => (
                                <TableRow
                                    key={todo.id}
                                    sx={{
                                        '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' },
                                        '&:hover': { backgroundColor: '#e0f7fa' },

                                    }}
                                    onClick={() => {
                                        const id = todo.id
                                        const task = todoList.find((tdo) => tdo.id === id);
                                        setSelectedTask(task);
                                        setOpen(true);
                                    }}
                                >
                                    <TableCell align="center" sx={{ padding: '12px' }} colSpan={1}>

                                        <Tooltip
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 600 }}
                                            arrow
                                            placement="top"
                                            title={<span style={{ fontSize: '17px' }}>{todo.task_name}</span>}
                                        >
                                            <Typography
                                                sx={{
                                                    padding: 0.5,
                                                    fontWeight: 'normal',
                                                    color: '#3f51b5',
                                                    fontSize: '0.9rem',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <span>{todo.task_name.length > 30 ? `${todo.task_name.slice(0, 40)}...` : todo.task_name}</span>
                                            </Typography>

                                        </Tooltip>

                                    </TableCell>


                                    <TableCell align="center" sx={{ padding: '4px' }}>
                                        <Typography
                                            sx={{
                                                padding: 0.5,
                                                fontWeight: 'normal',
                                                color: '#3f51b5',
                                                fontSize: '0.9rem',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                // textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {handleStatus(todo.status)}
                                        </Typography>
                                    </TableCell>


                                    <TableCell align='justify' sx={{ padding: '4px' }}>
                                        <Typography variant="subtitle2" color={color} sx={{
                                            padding: 0.5,
                                            fontSize: '0.9rem',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                        }}>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: 6 }}>
                                                <>
                                                    <TimelapseSharpIcon />
                                                </>
                                                <>
                                                    {formatTime(tat)}
                                                </>
                                            </div>

                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>


                    </Table>
                </TableContainer>
            </>

            <>
                <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '10px auto', maxHeight: 350, paddingTop: '0px' }} >
                    <Table stickyHeader >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: '12px', textAlign: 'center', paddingLeft: '100px' }} colSpan={3}>
                                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                        Assigned Tasks
                                    </Typography>
                                </TableCell>
                                {userinfo.user_role === 1 ?
                                    <TableCell sx={{ padding: '0px', textAlign: 'right' }}>
                                        <AddTodo value='2' />
                                    </TableCell>
                                    :
                                    <TableCell sx={{ padding: '4px', textAlign: 'right' }}>
                                        {/* <AddTodo /> */}
                                    </TableCell>
                                }
                            </TableRow>
                        </TableHead>


                        <TableHead >

                            <TableRow>
                                <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Description
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Assignee
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Timer
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {myassingedTasks.map((todo) => (
                                <TableRow
                                    key={todo.id}
                                    sx={{
                                        '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' },
                                        '&:hover': { backgroundColor: '#e0f7fa' },
                                    }}
                                    // onClick={handleOpen(todo.id)}
                                    onClick={() => {
                                        const id = todo.id
                                        const task = todos.find((tdo) => tdo.id === id);
                                        setSelectedTask(task);
                                        setOpen(true);
                                    }}
                                >
                                    <TableCell align="justify" sx={{ padding: '12px' }}>

                                        <Tooltip
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 600 }}
                                            arrow
                                            placement="top"
                                            title={<span style={{ fontSize: '17px' }}>{todo.task}</span>}
                                        >
                                            <Typography
                                                sx={{
                                                    padding: 0.5,
                                                    fontWeight: 'normal',
                                                    color: '#3f51b5',
                                                    fontSize: '0.9rem',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <span>{todo.task.length > 16 ? `${todo.task.slice(0, 19)}...` : todo.task}</span>
                                            </Typography>

                                        </Tooltip>

                                    </TableCell>

                                    <TableCell align="justify" sx={{ padding: '4px' }}>
                                        <Typography
                                            sx={{
                                                padding: 0.5,
                                                fontWeight: 'normal',
                                                color: '#3f51b5',
                                                fontSize: '0.9rem',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                // textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            To : {todo.Asignee.length > 7 ? `${todo.Asignee.slice(0, 9)}...` : todo.Asignee}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center" sx={{ padding: '4px' }}>
                                        <Typography
                                            sx={{
                                                padding: 0.5,
                                                fontWeight: 'normal',
                                                color: '#3f51b5',
                                                fontSize: '0.9rem',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                // textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {handleStatus(todo.status)}
                                        </Typography>
                                    </TableCell>


                                    <TableCell align='justify' sx={{ padding: '4px' }}>
                                        <Typography variant="subtitle2" color={color} sx={{
                                            padding: 0.5,
                                            fontSize: '0.9rem',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                        }}>

                                            {todo.status !== 4 ?
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: 6 }}>
                                                    <>
                                                        <TimelapseSharpIcon />
                                                    </>
                                                    <>
                                                        {formatTime(timeLeft)}
                                                    </>
                                                </div> :
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: 6, color: 'black' }}>
                                                    <> - -  - </>
                                                </div>
                                            }

                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>


                    </Table>
                </TableContainer>
            </>


            <Modal
                open={open}
                onClose={handleClose}
            >
                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#ffffff',
                        width: '500px',
                        margin: 'auto',
                        marginTop: '5%',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {selectedTask && (
                        <>
                            <Typography
                                variant="h6"
                                gutterBottom
                                textAlign="center"
                                style={{ color: '#343a40', marginBottom: '16px' }}
                            >
                                Task Details
                            </Typography>

                            <div style={{ marginBottom: '16px' }}>
                                <Typography
                                    variant="subtitle1"
                                    style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '8px' }}
                                >
                                    Task Name:
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{ color: '#495057', wordWrap: 'break-word' }}
                                >
                                    {selectedTask.task_name}
                                </Typography>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <Typography
                                    variant="subtitle1"
                                    style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '8px' }}
                                >
                                    Description:
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{ color: '#495057', wordWrap: 'break-word' }}
                                >
                                    {selectedTask.task_description}
                                </Typography>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '16px' }}>

                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: '#28a745', fontWeight: 'bold' }}
                                    >
                                        Assignee:
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        style={{ color: '#495057' }}
                                    >
                                        {selectedTask.task_assignee}
                                    </Typography>
                                </div>

                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: '#dc3545', fontWeight: 'bold' }}
                                    >
                                        Time Left:
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        style={{ color: '#495057' }}
                                    >
                                        {formatTime(timeLeft)}
                                    </Typography>
                                </div>

                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <Typography
                                    variant="subtitle1"
                                    style={{ color: '#007bff', fontWeight: 'bold' }}
                                >
                                    Status: {handleStatus(selectedTask.status)}
                                </Typography>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        label="Status"
                                        value={select}
                                        onChange={(e) => handleChange(e, selectedTask.id)}
                                        style={{
                                            width: '150px',
                                            fontSize: '0.875rem',
                                            height: '35px',
                                            backgroundColor: '#ffffff',
                                        }}
                                    >
                                        {select === 'open' && <MenuItem value="open">Open</MenuItem>}
                                        {userinfo.user_role === 1 && <MenuItem value="pending">Pending</MenuItem>}
                                        {userinfo.user_role === 1 && <MenuItem value="done">Done</MenuItem>}
                                        {userinfo.user_role !== 1 && <MenuItem value="in-progress">In Progress</MenuItem>}
                                        {userinfo.user_role !== 1 && <MenuItem value="completed">Completed</MenuItem>}
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    style={{ backgroundColor: '#6c757d', color: '#ffffff' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    // onClick={handleSubmit}
                                    style={{ backgroundColor: '#007bff', color: '#ffffff' }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>





        </Container>

    )
}

export default Todolist





{/* <Container
                                                sx={{
                                                    flex: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1
                                                }}
                                            >
                                                {/* <Typography variant="subtitle2">
                                                    Department: {todo.department}
                                                </Typography> */}
{/* <Typography variant="subtitle2">
                                                    Assigned To: {todo.Asignee}
                                                </Typography> */}
{/* <Typography variant="subtitle2" color={color}>
                                                    Time Left: {formatTime(timeLeft)}
                                                </Typography> */}
{/* </Container> */ }

{/* <TableCell align="right">
                                <IconButton color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell> */}



//             <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '10px auto', maxHeight: 600 }} >
//     <Table stickyHeader >
//         <TableHead >
//             <TableRow>
//                 <TableCell align="center" colSpan={2}>
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1F3F49' }}>
//                             My Tasks
//                         </Typography>
//                         {/* <Button variant="contained" color="primary" size="small">
//                     Add Task
//                 </Button> */}
//                         <AddTodo />
//                     </Box>
//                 </TableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//             {myallTasks.map((todo) => (
//                 <TableRow
//                     key={todo.id}
//                     sx={{
//                         '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' },
//                         '&:hover': { backgroundColor: '#e0f7fa' },
//                     }}
//                 >
//                     <TableCell>
//                         <Paper
//                             sx={{
//                                 padding: 0.1,
//                                 display: 'flex',
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between',
//                                 gap: 2,
//                                 boxShadow: 1,
//                                 borderRadius: 1
//                             }}
//                         >
//                             <Container sx={{ flex: 2 }} >
//                                 <Typography
//                                     variant="subtitle2"
//                                     sx={{
//                                         fontWeight: 'normal',
//                                         color: '#3f51b5'
//                                     }}
//                                 >
//                                     {todo.task}
//                                 </Typography>
//                             </Container>

//                             <Container
//                                 sx={{
//                                     flex: 2,
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     gap: 1
//                                 }}
//                             >
//                                 <Typography variant="subtitle2">
//                                     Department: {todo.department}
//                                 </Typography>
//                                 <Typography variant="subtitle2">
//                                     Assigned To: {todo.Asignee}
//                                 </Typography>
//                                 <Typography variant="subtitle2" color={color}>
//                                     {/* TAT: {todo.Tat} */}
//                                     Time Left: {formatTime(timeLeft)}
//                                 </Typography>
//                             </Container>

//                             <Container
//                                 sx={{
//                                     flex: 0,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                 }}
//                             >
//                                 <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//                                     <InputLabel>Status</InputLabel>
//                                     <Select
//                                         label="Status"
//                                         defaultValue="open"
//                                         sx={{
//                                             width: 120,
//                                             fontSize: '0.75rem',
//                                             padding: '0rem',
//                                             height: '40px',
//                                         }}
//                                     >
//                                         <MenuItem value="open">Open</MenuItem>
//                                         <MenuItem value="in-progress">In Progress</MenuItem>
//                                         <MenuItem value="completed">Completed</MenuItem>
//                                         {userinfo.user_role === 1 ? <MenuItem value="done">Done</MenuItem> : ''}
//                                     </Select>
//                                 </FormControl>
//                             </Container>
//                         </Paper>
//                     </TableCell>
//                 </TableRow>
//             ))}
//         </TableBody>
//     </Table>
// </TableContainer>



// <FormControl variant="outlined" sx={{ minWidth: 100 }}>
//     <InputLabel>Status</InputLabel>
//     <Select
//         label="Status"
//         value={select}
//         onChange={(e) => handleChange(e, todo.id)}
//         sx={{
//             width: 120,
//             fontSize: '0.75rem',
//             padding: '0rem',
//             height: '30px',
//         }}
//     >
//         {
//             select === 'open' ?
//                 <MenuItem value="open">open</MenuItem>
//                 : ''
//         }
//         {userinfo.user_role === 1 ? <MenuItem value="pending">Pending</MenuItem> : ''}
//         {userinfo.user_role === 1 ? <MenuItem value="done">Done</MenuItem> : ''}
//         {userinfo.user_role !== 1 ? <MenuItem value="in-progress">In Progress</MenuItem> : ''}
//         {userinfo.user_role !== 1 ? <MenuItem value="completed">Completed</MenuItem> : ''}


//     </Select>
// </FormControl>

