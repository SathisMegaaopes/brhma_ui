import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography, useScrollTrigger } from '@mui/material'
import React, { useState } from 'react'

const UserSession = () => {
    const [openBreakModal, setOpenBreakModal] = useState(false)
    const [breakType, setBreakType] = useState('')
    const [onBreak, setOnBreak] = useState(false)


    const handleClose = () => setOpenBreakModal(!openBreakModal)
    const handleOpen = () => setOpenBreakModal(!openBreakModal)

    const handleBreak = (e) => {
        console.log(e.target)
        setBreakType(e.target.value)
    }


    const handleConfirmBreak = () => {
        setOnBreak(!onBreak)
    }


    const handleCloseBreak = () => {
        setOpenBreakModal(!openBreakModal)
        setBreakType('')
        setOnBreak(!onBreak)
    }



    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}> <CardComponent cardTime='06h 39m' cardContent='Logged Hours' /> </Grid>
                <Grid item xs={6}> <CardComponent cardTime='03h 41m' cardContent='Non-Productive Hours' /> </Grid>
                <Grid item xs={6}> <CardComponent cardTime='00h 44m' cardContent='Break Time' /> </Grid>
                <Grid item xs={6}> <CardComponent cardTime='01h 04m' cardContent='Meeting & Feedback' /> </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={handleOpen}
                    >
                        Button
                    </Button>
                </Grid>
            </Grid>


            <ModalComponent breakType={breakType}
                handleBreak={handleBreak}
                handleClose={handleClose}
                Open={openBreakModal}
                handleConfirmBreak={handleConfirmBreak}
                onBreak={onBreak}
                handleCloseBreak={handleCloseBreak}
            />
        </>
    )
}

export default UserSession

function ModalComponent({ breakType, handleBreak, handleClose, Open, handleConfirmBreak, onBreak , handleCloseBreak}) {

    return (

        <Modal
            open={Open}
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
                <>
                    <Typography
                        variant="h6"
                        gutterBottom
                        textAlign="center"
                        style={{ color: '#343a40', marginBottom: '16px' }}
                    >
                        Meeting & Break Scheduler
                    </Typography>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <Typography
                            variant="subtitle1"
                            style={{ color: '#007bff', fontWeight: 'bold' }}
                        >
                            {onBreak ? `Your'e on ${breakType} Break` : 'Select the type of break , you are taking ...'}
                        </Typography>


                        { !onBreak && 
                        <FormControl variant="outlined" size="small" sx={{ marginTop: '20px' }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                label="Status"
                                value={breakType}
                                // name={breakType} 
                                onChange={handleBreak}
                                style={{
                                    width: '200px',
                                    fontSize: '0.875rem',
                                    height: '35px',
                                    backgroundColor: '#ffffff',

                                }}
                            >
                                <MenuItem value="15minsbreak1" >15 Mins Break 1</MenuItem>
                                <MenuItem value="15minsbreak2" >15 Mins Break 2</MenuItem>
                                <MenuItem value="30minsbreak" >30 Mins Break</MenuItem>
                                <MenuItem value="Meetings" >Meeting Session</MenuItem>
                                <MenuItem value="Feedbacks" >Feedback Session</MenuItem>
                            </Select>
                        </FormControl> }
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>

                        { !onBreak && 
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            style={{ backgroundColor: '#6c757d', color: '#ffffff' }}
                            disabled={onBreak === true ? true : false}
                        >
                            Cancel
                        </Button> }

                        {onBreak ?

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
                                onClick={handleCloseBreak}
                            >
                                Done
                            </Button>


                            :
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
                                onClick={handleConfirmBreak}
                            >
                                Add
                            </Button>}
                    </div>

                </>
            </div>
        </Modal >
    )
}


function CardComponent({ cardTime, cardContent }) {

    return (
        <Card sx={{
            // height:'20vh'
        }} >
            <CardContent>
                <Typography gutterBottom variant="h5" align='center' sx={{ mt: 4 }}>
                    {cardTime}
                </Typography>
                <Typography align='center' sx={{ mb: 4, mt: 2, fontSize: '20px' }}>
                    {cardContent}
                </Typography>
            </CardContent>
        </Card>
    )
}