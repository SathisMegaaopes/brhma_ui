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
    TextField,
} from '@mui/material';
import URL from '../Global/Utils/url_route';
import Fade from '@mui/material/Fade';
import axios from 'axios';

import AddTodo from './AddTodo';

import TimelapseSharpIcon from '@mui/icons-material/TimelapseSharp';
import { Description } from '@mui/icons-material';
import SuccessFailureModal from './successfailuremodal';
import ConfirmationModal from './confirmationModal';

const Todolist = () => {

    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    const username = userinfo.user_name;

    const user_role = userinfo.user_role;

    const tat = 2;

    const [mytodoList, setMyTodoList] = useState([])

    const [othertasks, setOthertasks] = useState([])

    // console.log(mytodoList, 'othertasks')

    const [timeLeft, setTimeLeft] = useState(0);

    const [color, setColor] = useState('inherit');

    const [select, setSelect] = React.useState('');


    const [open, setOpen] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    console.log(selectedTask, 'this is the selected task..')

    const [referesh, setRefresh] = useState(false)

    const [stsupdateml, setStsupdateml] = useState(false)

    const [updateStatus, setUpdateStatus] = useState(null)

    const [comment, setComment] = useState(null);



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


    const formatTimeFromSeconds = (seconds) => {

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = secs.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };


    // if(selectedTask){
    // if (selectedTask.task_assignee === userinfo.user_name) {
    //     console.log('yes it issssssssssssssssssssssssssss')
    // }
    // }

    // selectedTask ? selectedTask.task_assignee === userinfo.user_name ?  console.log('yes it issssssssssssssssssssssssssss') : console.log(' no it is not ') : console.log('not comming inside')


    // selectedTask ? selectedTask.task_assignee.toString() === userinfo.user_name ?  console.log('yes it issssssssssssssssssssssssssss') : console.log(typeof(userinfo.user_name)) : console.log('not comming inside')


    const handleClose = () => {
        setOpen(false);
        
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

    const statustonumber = (status) => {
        switch (status) {
            case 'open':
                return 0;
            case 'in-progress':
                return 1
            case 'completed':
                return 2
            case 'onhold':
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
            console.log(response)
            setUpdateStatus(response.data.status)
        } catch (error) {
            console.log(`Error in updation on the client side`, error)
        } finally {
            setOpen(false)
            setRefresh(!referesh)
            setStsupdateml(open)
        }

    }


    const Timer = ({ initialSeconds }) => {
        const [timeRemaining, setTimeRemaining] = useState(initialSeconds);

        useEffect(() => {
            if (timeRemaining <= 0) return;

            const timerId = setInterval(() => {
                setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);

            return () => clearInterval(timerId);
        }, [timeRemaining]);


        const percentageRemaining = (timeRemaining / initialSeconds) * 100;


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


        return (
            <div style={{ color: textColor, marginLeft: '-12px' }}>
                <span>{timeRemaining > 0 ? formatTimeFromSeconds(timeRemaining) : '- - -'}</span>
            </div>
        );
    };


    return (
        // <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', height: '65vh', width: '60vh' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '0px auto', maxHeight: 350, padding: '0px' }} >
                    <Table stickyHeader >

                        <TableHead>
                            <TableRow>
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
                                                        {/* {formatTimeFromSeconds(todo.tat)} */}
                                                        <Timer initialSeconds={todo.tat} />
                                                    </>
                                                </div>

                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 4, fontStyle: 'italic', color: 'gray', fontSize: '1.2rem' }}>
                                            No tasks currently available
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>

                <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '10px auto', maxHeight: 350, paddingTop: '0px' }} >
                    <Table stickyHeader >
                        <TableHead>
                            {userinfo.user_role === 1 ?
                                <TableRow>
                                    <TableCell sx={{ padding: '12px', textAlign: 'center', paddingLeft: '95px' }} colSpan={2}>
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
                                    <TableCell sx={{ padding: '12px', textAlign: 'center', paddingLeft: '0px' }} colSpan={4}>
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
                                <TableCell align="center" sx={{ padding: '6px' }} >
                                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                        Description
                                    </Typography>
                                </TableCell>
                                {userinfo.user_role === 1 ?
                                    <TableCell align="center" sx={{ padding: '6px' }} >
                                        <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#1F3F49' }}>
                                            Assignee
                                        </Typography>
                                    </TableCell> : ''}
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
                            {othertasks.length > 0 ?
                                (othertasks.map((todo) => (
                                    <TableRow
                                        key={todo.id}
                                        sx={{
                                            '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' },
                                            '&:hover': { backgroundColor: '#e0f7fa' },
                                        }}
                                        // onClick={handleOpen(todo.id)}
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
                                                    <span>{todo.task_name.length > 16 ? `${todo.task_name.slice(0, 19)}...` : todo.task_name}</span>
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>

                                        {userinfo.user_role === 1 ?
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
                                                    To : {todo.task_assignee.length > 7 ? `${todo.Asignee.slice(0, 9)}...` : todo.task_assignee}
                                                </Typography>
                                            </TableCell> : ''}

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
                                                        {/* {formatTimeFromSeconds(todo.tat)} */}
                                                        <Timer initialSeconds={todo.tat} />
                                                    </>
                                                </div>

                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 4, fontStyle: 'italic', color: 'gray', fontSize: '1.2rem' }}>
                                            No tasks currently available
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>


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
                                        <Timer initialSeconds={selectedTask.tat} />
                                    </Typography>
                                </div>

                            </div>

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
                                                <MenuItem value="open">Open</MenuItem>
                                                <MenuItem value="in-progress">In Progress</MenuItem>
                                                <MenuItem value="completed">Completed</MenuItem>
                                                <MenuItem value="onhold">On hold</MenuItem>
                                                <MenuItem value="done">Done</MenuItem>
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
                                                    <MenuItem value="onhold">On hold</MenuItem>
                                                    <MenuItem value="done">Done</MenuItem>
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
                                                    <MenuItem value="in-progress">In Progress</MenuItem>
                                                    <MenuItem value="completed">Completed</MenuItem>
                                                </Select>
                                            </FormControl>

                                        )}
                            </div>
                            {selectedTask.status !== 0 ?
                                <div style={{ marginBottom: '16px' }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '0px' }}
                                    >
                                        Comments:
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
                                </div> : ''}


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
                                    style={{ backgroundColor: '#007bff', color: '#ffffff' }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleUpdate(selectedTask.id)
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal >
        </Container >

    )

}

export default Todolist