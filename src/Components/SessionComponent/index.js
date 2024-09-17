import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, Switch, switchClasses, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useScrollTrigger } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../Global/Utils/url_route'

const UserSession = () => {


    //import change pannanum , athu enna na , select la kamikura data va backend la irunthu fetch pannitu vanthu kamikanum , ithu than antha task , marantharatha da Sathis uhhhhhhhhh..............


    // const [openBreakModal, setOpenBreakModal] = useState(localStorage.getItem('isBreakOpen') === 'true' || false)
    // const [breakType, setBreakType] = useState(localStorage.getItem('breakType') || '')
    // const [onBreak, setOnBreak] = useState(localStorage.getItem('onBreak') === 'true' || false)


    const [openBreakModal, setOpenBreakModal] = useState(false)
    const [breakType, setBreakType] = useState('')
    const [onBreak, setOnBreak] = useState(false)
    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));
    const [SessionData, setSessionData] = useState([])
    const [breaksName, setBreaksName] = useState([])
    const [breakStatus, setBreakStatus] = useState([])
    const [reRender , setRender ] = useState(false)




    React.useEffect(() => {

        const fetchData = async () => {
            try {
                const url = `${URL}breaks`;
                const username = userinfo.user_name;

                const response = await axios.get(url, {
                    params: {
                        id: username
                    }
                });

                const { breakStatus, breakMasterData, data } = response.data;

                setBreakStatus(breakStatus);
                setBreaksName(breakMasterData);
                setSessionData(data);

                StatusFunction(breakStatus);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [reRender]);


    const StatusFunction = (breakStatusData) => {
        const data = breakStatusData.filter((item) => item.status === 1);
        if (data.length !== 0) {
            setOnBreak(true);
            setOpenBreakModal(true);
            setBreakType(data[0].type);
        }
    };



    const handleClose = () => {
        setOpenBreakModal(!openBreakModal)
        setBreakType('')
    }

    const handleOpen = () => setOpenBreakModal(!openBreakModal)

    const handleBreak = (e) => {
        setBreakType(e.target.value)
    }


    const handleConfirmBreak = async () => {

        let url = `${URL}breaks`;


        try {
            const response = await axios.put(url, {
                "breakType": breakType,
                "emp_id": userinfo.user_name,
                "breakEnd": 0
            })

            const data = JSON.stringify(response.data.data)

        } catch (err) {
            console.log(err)
        }
        setOnBreak(!onBreak)

    }



    const handleCloseBreak = async () => {

        let url = `${URL}breaks`

        try {
            const response = await axios.put(url, {
                "breakType": breakType,
                "emp_id": userinfo.user_name,
                "breakEnd": 1
            })

            const data = JSON.stringify(response.data.data)

        } catch (error) {
            console.log(error)
        }


        setOpenBreakModal(!openBreakModal)
        setBreakType('')
        setOnBreak(!onBreak)
        setRender(!reRender)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '11px' }}>Today's Activity</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '11px' }}>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>Logged Hours</Typography></TableCell>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>{SessionData?.loggedhours}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>Non-Productive Hours</Typography></TableCell>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>{SessionData?.nonproductivehours}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>15 Mins Break 1</Typography></TableCell>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>{SessionData?.firstBreak}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>15 Mins Break 2</Typography></TableCell>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>{SessionData?.secondBreak}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>30 Mins Break</Typography></TableCell>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>{SessionData?.thirdBreak}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>Meetings Session</Typography></TableCell>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>{SessionData?.meetingBreak}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>Feedback Session</Typography></TableCell>
                                    <TableCell sx={{ padding: '11px' }} align='left'><Typography variant='body2'>{SessionData?.feedbackBreak}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={handleOpen}
                    >
                        Break
                    </Button>
                </Grid>
            </Grid>


            <ModalComponent
                breakType={breakType}
                handleBreak={handleBreak}
                handleClose={handleClose}
                Open={openBreakModal}
                handleConfirmBreak={handleConfirmBreak}
                onBreak={onBreak}
                handleCloseBreak={handleCloseBreak}
                breaksName={breaksName}
                breakStatus={breakStatus}
            />
        </>
    )
}

export default UserSession

function ModalComponent({ breakType, handleBreak, handleClose, Open, handleConfirmBreak, onBreak, handleCloseBreak, breaksName, breakStatus }) {

    const StatusValue = (value) => {
        let StatusName;
        switch (value) {
            case 1:
                StatusName = "Short Break 1"
                break;
            case 2:
                StatusName = "Short Break 2"
                break;
            case 3:
                StatusName = " Long Break "
                break;
            case 4:
                StatusName = " Meeting Session Break "
                break;
            case 5:
                StatusName = " Feedback Session Break"
                break;
            default:
                StatusName = "Unkown Session Break"
        }
        return StatusName;
    }


    return (

        <Modal open={Open}>
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
                <Typography
                    variant="h6"
                    gutterBottom
                    textAlign="center"
                    style={{ color: '#343a40', marginBottom: '16px' }}
                >
                    Meeting & Break Scheduler
                </Typography>

                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ marginBottom: '30px' }}>
                    {onBreak && (
                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle1"
                                style={{ color: '#007bff', fontWeight: 'bold' }}
                            >
                                {`You're on ${StatusValue(breakType)}`}
                            </Typography>
                        </Grid>
                    )}

                    {!onBreak && (
                        <Grid item xs={12} >
                            <FormControl variant="outlined" size="small" sx={{ padding: '0px' }}>
                                <InputLabel >Status</InputLabel>
                                <Select
                                    label="Status"
                                    value={breakType}
                                    onChange={handleBreak}
                                    fullWidth
                                    style={{
                                        width: '300px',
                                        fontSize: '0.875rem',
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    {/* {breakStatus.map((item2) => {
                                        {
                                            breaksName.map((item) => (
                                                <MenuItem disabled={item2.status === 2} key={item.id} value={item.id}>
                                                    {item.break_type}
                                                </MenuItem>
                                            ))
                                        }
                                    })} */}
                                    {breaksName.map((item) => {
                                        const breakStatusItem = breakStatus.find((status) => status.breakName === item.break_type);
                                        const isDisabled = breakStatusItem && breakStatusItem.status === 2;

                                        return (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                                disabled={isDisabled}
                                            >
                                                {item.break_type}
                                            </MenuItem>
                                        );
                                    })}


                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                </Grid>

                <Grid container spacing={2}>
                    {!onBreak && (
                        <Grid item xs={6}>
                            <Button variant="outlined" color='error' onClick={handleClose} fullWidth>
                                Cancel
                            </Button>
                        </Grid>
                    )}

                    {onBreak ? (
                        <Grid item xs={12}>
                            <Button variant="outlined" color='success' onClick={handleCloseBreak} fullWidth>
                                     Back to Work
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item xs={6}>
                            <Button variant="outlined" onClick={handleConfirmBreak} fullWidth>
                                Add
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </div>
        </Modal>

    )
}


function CardComponent({ cardTime, cardContent }) {


    { /* <Grid item xs={6}> <CardComponent cardTime='06h 39m' cardContent='Logged Hours' /> </Grid>
    <Grid item xs={6}> <CardComponent cardTime='03h 41m' cardContent='Non-Productive Hours' /> </Grid>
    <Grid item xs={6}> <CardComponent cardTime='00h 44m' cardContent='Break Time' /> </Grid>
    <Grid item xs={6}> <CardComponent cardTime='01h 04m' cardContent='Meeting & Feedback' /> </Grid> */ }

    return (

        <Card variant='outlined' >
            <CardContent >
                <Typography gutterBottom variant="h3" align='center'
                    sx={{
                        color: '#545454'
                    }}>
                    {cardTime}
                </Typography>
                <Typography align='center' variant='h5' sx={{
                    color: '#737373'
                }} >
                    {cardContent}
                </Typography>
            </CardContent>
        </Card>

    )
}










{/* <MenuItem disabled={disableSelection.break1End === 1} value={1}>
                                        15 Mins Break 1
                                    </MenuItem>
                                    <MenuItem disabled={disableSelection.break2End === 1} value={2}>
                                        15 Mins Break 2
                                    </MenuItem>
                                    <MenuItem disabled={disableSelection.break3End === 1} value={3}>
                                        30 Mins Break
                                    </MenuItem>
                                    <MenuItem value={4}>Meeting Session</MenuItem>
                                    <MenuItem value={5}>Feedback Session</MenuItem> */}