import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Modal,
    Tooltip,
    TextField,
    Grid,
} from '@mui/material';
import URL from '../Global/Utils/url_route';
import Fade from '@mui/material/Fade';
import axios from 'axios';

import AddTodo from './AddTodo';

import TimelapseSharpIcon from '@mui/icons-material/TimelapseSharp';
import SuccessFailureModal from '../ModalComponents/successfailuremodal';
import { formatDateTime } from '../Global/Utils/common_data';

const Todolist = () => {

    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));
    const username = userinfo.user_name;
    const user_role = userinfo.user_role;
    const tat = 2;
    const [mytodoList, setMyTodoList] = useState([])
    const [othertasks, setOthertasks] = useState([])
    const [timeLeft, setTimeLeft] = useState(0);
    const [color, setColor] = useState('inherit');
    const [select, setSelect] = React.useState(null);
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [referesh, setRefresh] = useState(false)
    const [stsupdateml, setStsupdateml] = useState(false)
    const [updateStatus, setUpdateStatus] = useState(null)
    const [comment, setComment] = useState('');


    console.log(othertasks, 'othertasks')

    const handleChange = (event, id) => {
        setSelect(event.target.value);

    };

    const handleUploadStatusModal = () => {
        setStsupdateml(!stsupdateml)

    }

    useEffect(() => {

        let url = URL + "todolist"

        axios.get(url, {
            params: {
                id: username,
                role: user_role
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    setMyTodoList(response.data.data.assignedToMe)
                    setOthertasks(response.data.data.otherTasks)
                } else {
                    console.log("ERROR : ", JSON.stringify(response.message));
                }
            })
            .catch()
            .finally()
    }, [referesh])


    const handleClose = () => {
        setOpen(false);
        setSelect(null);
        setComment('')

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
                return <span style={{ color: 'red' }}>Re-open</span>;
            case 4:
                return <span style={{ color: '#008631' }}>Done</span>;
            default:
                return <span style={{ color: '#808080' }}>Unknown Status</span>;
        }
    }

    const statustonumber = (status) => {
        switch (status) {
            case 'open':
                return 0;
            case 'in-progress':
                return 1
            case 'completed':
                return 2
            case 'reopen':
                return 3
            case 'done':
                return 4
            default:
                return 0
        }
    }


    const handleUpdate = async (id) => {

        let url = `${URL}todolist`;

        const status = statustonumber(select)



        try {
            const response = await axios.put(url, { id, status, username, comment })
            setUpdateStatus(response.data.status)
        } catch (error) {
            console.log(`Error in updation on the client side`, error)
        } finally {
            setOpen(false)
            setRefresh(!referesh)
            setStsupdateml(open)
            setSelect(null)
        }

    }

    const Timer = ({ status, endDate }) => {


        const [timeRemaining, setTimeRemaining] = useState(0);

        useEffect(() => {
            if (status !== 1 || !endDate) {
                setTimeRemaining(0);
                return;
            }

            const calculateTimeRemaining = () => {
                const now = new Date();
                const formattedEndDate = endDate.replace(' ', 'T');
                const end = new Date(formattedEndDate);

                if (isNaN(end.getTime())) {
                    console.error('Invalid endDate format:', endDate);
                    return 0;
                }

                const diffInSeconds = Math.floor((end - now) / 1000);
                return Math.max(diffInSeconds, 0);
            };

            setTimeRemaining(calculateTimeRemaining());

            const timerId = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    const newTimeRemaining = calculateTimeRemaining();
                    return Math.max(newTimeRemaining, 0);
                });
            }, 1000);

            return () => clearInterval(timerId);
        }, [status, endDate]);

        const percentageRemaining = endDate && !isNaN(new Date(endDate).getTime())
            ? (timeRemaining / ((new Date(endDate) - new Date()) / 1000)) * 100
            : 0;

        let textColor = 'black';
        if (percentageRemaining <= 10) {
            textColor = 'red';
        } else if (percentageRemaining <= 30) {
            textColor = 'orange';
        } else if (percentageRemaining <= 100) {
            textColor = 'green';
        } else if (percentageRemaining == 0) {
            textColor = 'black';
        }

        const formatTimeFromSeconds = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            // return `${hours}h ${minutes}m ${secs}s`;
            return `${hours}h ${minutes}m ${secs}s`;
        };

        return (
            <div style={{ color: textColor, marginLeft: '-12px' }}>
                <span>{status !== 0 && timeRemaining > 0 ? formatTimeFromSeconds(timeRemaining) : '- - - - - - - '}</span>
            </div>
        );
    };



    return (

        <>
            <Grid container sx={{ gap: 2, height: '80vh' }}>
                {/* <Box sx={{ backgroundColor: 'white', width: '100%', maxHeight: '0vh' }}> */}
                <Box sx={{ backgroundColor: 'white', width: '100%', height: '50%', overflow: 'auto' }}>
                    <TableContainer component={Paper} >
                        <Table stickyHeader >

                            <TableHead >
                                <TableRow >
                                    <TableCell sx={{ padding: '12px', textAlign: 'center', paddingLeft: '100px', zIndex: 0 }} colSpan={2}>
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
                                    <TableCell align="center" sx={{ padding: '6px', zIndex: 0 }} colSpan={1} >
                                        <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                            Task Name
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
                                {mytodoList.length > 0 ?
                                    (mytodoList.map((todo) => (
                                        <TableRow
                                            key={todo.id}
                                            sx={{
                                                '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' },
                                                '&:hover': { backgroundColor: '#e0f7fa' },

                                            }}
                                            onClick={() => {
                                                const id = todo.id
                                                const task = mytodoList.find((tdo) => tdo.id === id);
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
                                                        <span>{todo.task_name.length > 10 ? `${todo.task_name.slice(0, 10)}...` : todo.task_name}</span>
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
                                                            <TimelapseSharpIcon sx={{ marginRight: 'px' }} />
                                                        </>
                                                        <>
                                                            <Timer status={todo.status} endDate={todo.end_dateTime} />
                                                        </>
                                                    </div>

                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 15, fontStyle: 'italic', color: 'gray', fontSize: '1.2rem' }}>
                                                No tasks currently available
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Box>

                {/* <Box sx={{ backgroundColor: 'White', width: '100%', maxHeight: '0vh' }}> */}
                <Box sx={{ backgroundColor: 'white', width: '100%', height: '50%', overflow: 'auto' }}>
                    <TableContainer component={Paper}  >
                        <Table stickyHeader >

                            <TableHead>
                                {userinfo.user_role === 1 ?
                                    <TableRow>
                                        <TableCell sx={{ padding: '12px', textAlign: 'center', paddingLeft: '95px', zIndex: 0 }} colSpan={3}>
                                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                                Assigned Tasks
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px', textAlign: 'right' }} colSpan={4}>
                                            <AddTodo value='2' />
                                        </TableCell>
                                    </TableRow>

                                    :
                                    <TableRow>
                                        <TableCell sx={{ padding: '12px', textAlign: 'center', paddingLeft: '0px', zIndex: 0 }} colSpan={4}>
                                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                                Assigned Tasks
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px', textAlign: 'right' }} colSpan={0}>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableHead>

                            <TableHead >
                                <TableRow>
                                    <TableCell align="center" sx={{ padding: '8px', zIndex: 0 }} >
                                        <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                            Task Name
                                        </Typography>
                                    </TableCell>
                                    {userinfo.user_role === 1 ?
                                        <TableCell align="center" sx={{ padding: '8px', zIndex: 0 }} >
                                            <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                                Assignee
                                            </Typography>
                                        </TableCell> :
                                        <TableCell align="center" sx={{ padding: '8px', zIndex: 0 }} >
                                            <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                                Assigned By
                                            </Typography>
                                        </TableCell>}
                                    <TableCell align="center" sx={{ padding: '8px', zIndex: 0 }} >
                                        <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                            Status
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '8px', zIndex: 0 }} >
                                        <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                            Timer
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {othertasks.length > 0 ?
                                    (othertasks.map((todo) => (
                                        <TableRow
                                            key={todo.id}
                                            sx={{
                                                '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' },
                                                '&:hover': { backgroundColor: '#e0f7fa' },
                                            }}
                                            onClick={() => {
                                                const id = todo.id
                                                const task = othertasks.find((tdo) => tdo.id === id);
                                                setSelectedTask(task);
                                                setOpen(true);
                                            }}
                                        >
                                            <TableCell align="center" sx={{ padding: '12px' }}>

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
                                                        <span>{todo.task_name.length > 10 ? `${todo.task_name.slice(0, 10)}...` : todo.task_name}</span>
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>

                                            {userinfo.user_role === 1 ?
                                                <TableCell align="center" sx={{ padding: '4px' }}>
                                                    <Typography
                                                        sx={{
                                                            padding: 0.5,
                                                            fontWeight: 'normal',
                                                            color: '#3f51b5',
                                                            fontSize: '0.9rem',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        To : {todo.task_assignee.length > 9 ? `${todo.task_assignee.slice(0, 9)}...` : todo.task_assignee}
                                                    </Typography>
                                                </TableCell> :

                                                <TableCell align="center" sx={{ padding: '4px' }}>
                                                    <Typography
                                                        sx={{
                                                            padding: 0.5,
                                                            fontWeight: 'normal',
                                                            color: '#3f51b5',
                                                            fontSize: '0.9rem',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {todo.created_by.length > 9 ? `${todo.created_by.slice(0, 9)}...` : todo.created_by}
                                                    </Typography>
                                                </TableCell>

                                            }

                                            <TableCell align="center" sx={{ padding: '4px' }}>
                                                <Typography
                                                    sx={{
                                                        padding: 0.5,
                                                        fontWeight: 'normal',
                                                        color: '#3f51b5',
                                                        fontSize: '0.9rem',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {handleStatus(todo.status)}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align='center' sx={{ padding: '4px' }}>
                                                <Typography variant="subtitle2" color={color} sx={{
                                                    padding: 0.5,
                                                    fontSize: '0.9rem',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                }}>

                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: 14 }}>
                                                        <>
                                                            <TimelapseSharpIcon sx={{ marginTop: '-2px' }} />
                                                        </>
                                                        <>
                                                            <Timer status={todo.status} endDate={todo.end_dateTime} />
                                                        </>
                                                    </div>

                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 14.8, fontStyle: 'italic', color: 'gray', fontSize: '1.2rem', height: '100%' }}>
                                                No tasks currently available
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Box>

            </Grid >


            <SuccessFailureModal
                open={stsupdateml}
                handleClose={handleUploadStatusModal}
                status={updateStatus}
                successmsg={"Task updated successfully"}
                errormsg={"Something went wrong, Please try again !"}
            />


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
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Typography variant="subtitle1" style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '10px' }}>
                                    Task Name:
                                </Typography>
                                <Typography variant="body1" style={{ color: '#495057', wordWrap: 'normal', marginTop: '-10px' }}>
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

                                <div style={{ flex: 1, alignItems: 'center', gap: '20px' }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: '#28a745', fontWeight: 'bold' }}
                                    >
                                        Start Date & Time :
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        style={{ color: '#495057' }}
                                    >
                                        {formatDateTime(selectedTask.start_dateTime)}
                                    </Typography>
                                </div>

                                <div style={{ flex: 1, alignItems: 'center', gap: '30px', textAlign: 'center' }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: '#dc3545', fontWeight: 'bold' }}
                                    >
                                        End Date & Time :
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        style={{ color: '#495057' }}
                                    >
                                        {formatDateTime(selectedTask.end_dateTime)}
                                    </Typography>
                                </div>

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

                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '30px', textAlign: 'center' }}>
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
                                        <Timer status={selectedTask.status} endDate={selectedTask.end_dateTime} />
                                    </Typography>
                                </div>

                            </div>

                            {selectedTask.status !== 4 ?
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: '#007bff', fontWeight: 'bold' }}
                                    >
                                        Status: {handleStatus(selectedTask.status)}
                                    </Typography>


                                    {selectedTask.task_assignee.toString() === userinfo.user_name &&
                                        selectedTask.created_by.toString() === userinfo.user_name
                                        ? (
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
                                                    {selectedTask.status === 0 && <MenuItem value="in-progress">In Progress</MenuItem>}
                                                    {selectedTask.status === 1 || selectedTask.status === 3 ? <MenuItem value="completed">Completed</MenuItem> : null}
                                                    {selectedTask.status === 2 && <MenuItem value="reopen">Re-open</MenuItem>}
                                                    {selectedTask.status === 2 && <MenuItem value="done">Done</MenuItem>}
                                                    {![0, 1, 2, 3].includes(selectedTask.status) && <MenuItem value="" disabled>No Status Available</MenuItem>}
                                                </Select>
                                            </FormControl>


                                        ) : (userinfo.user_role === 1 &&
                                            selectedTask.task_assignee.toString() !== userinfo.user_name &&
                                            selectedTask.created_by.toString() === userinfo.user_name)
                                            ? (
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
                                                        {selectedTask.status === 2 && <MenuItem value="reopen">Re-open</MenuItem>}
                                                        {selectedTask.status === 2 && <MenuItem value="done">Done</MenuItem>}
                                                        {![2].includes(selectedTask.status) && <MenuItem value="" disabled>No Status Available</MenuItem>}
                                                        {/* <MenuItem value="reopen">Re-open</MenuItem> */}
                                                        {/* <MenuItem value="done">Done</MenuItem> */}
                                                    </Select>
                                                </FormControl>
                                            ) : (

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
                                                        {selectedTask.status === 0 && <MenuItem value="in-progress">In Progress</MenuItem>}
                                                        {selectedTask.status === 1 && <MenuItem value="completed">Completed</MenuItem>}
                                                        {selectedTask.status === 3 && <MenuItem value="completed">Completed</MenuItem>}

                                                        {![0, 1, 3].includes(selectedTask.status) && <MenuItem value="" disabled>No Status Available</MenuItem>}
                                                    </Select>
                                                </FormControl>

                                            )}
                                </div>
                                : ''}

                            {(selectedTask.status !== 4 && selectedTask.status !== 0) && (
                                <div style={{ marginBottom: '16px' }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '0px' }}
                                    >
                                        Add Comment:
                                    </Typography>
                                    <TextField
                                        label="Add a comment"
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        fullWidth
                                        style={{ marginTop: '8px' }}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                            )}


                            {selectedTask.complete_comments ?
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxHeight: '100px', overflowY: 'auto', marginBottom: '10px' }}>

                                    <>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: '#dc3545', fontWeight: 'bold' }}
                                        >
                                            Comments :
                                        </Typography>
                                    </>
                                    <>

                                        <div style={{ maxWidth: '80%', alignSelf: 'flex-start', marginBottom: '16px' }}>
                                            <span style={{ color: '#2a9d8f', fontWeight: 'bold' }}> Completed comments  :  </span>
                                            {selectedTask.complete_comments}
                                        </div>
                                        {selectedTask.reopen_comments && (
                                            <div style={{ maxWidth: '80%', alignSelf: 'flex-start', marginBottom: '16px' }}>
                                                <span style={{ color: '#7161ef', fontWeight: 'bold' }}>Re-open comments: </span>
                                                {selectedTask.reopen_comments}
                                            </div>
                                        )}
                                        {selectedTask.done_comments ?
                                            <div style={{ maxWidth: '80%', alignSelf: 'flex-start', marginBottom: '16px' }}>
                                                <span style={{ color: '#2c0735', fontWeight: 'bold' }}>Done comments  : </span>
                                                {selectedTask.done_comments}
                                            </div>
                                            : ''}
                                    </>
                                </div>
                                : ''}


                            {selectedTask.status !== 4 ?
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
                                        sx={{
                                            backgroundColor: '#007bff',
                                            color: '#ffffff',
                                            '&:disabled': {
                                                backgroundColor: '#A9A9A9',
                                                color: '#FFFFFF80',
                                            },
                                        }}
                                        disabled={selectedTask.status === 0 ? !Boolean(select) : (!Boolean(select) || !comment.trim())}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleUpdate(selectedTask.id);
                                        }}
                                    >
                                        Update Task
                                    </Button>
                                </div>
                                : ''}
                        </>
                    )}
                </div>
            </Modal >
        </>
    )

}

export default Todolist