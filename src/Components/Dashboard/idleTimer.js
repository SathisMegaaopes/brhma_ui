import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { IdleTimerProvider } from 'react-idle-timer';
import axios from "axios";
import URL from "../Global/Utils/url_route";

const CalculateTime = (firstDate, updateCallback) => {
    const startDate = new Date(firstDate);

    const timer = setInterval(() => {
        const endDate = new Date();
        let difference = startDate - endDate;

        if (difference < 0) {
            difference = Math.abs(difference);
        }

        const differenceInSeconds = Math.floor(difference / 1000);
        const hours = Math.floor(differenceInSeconds / 3600);
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const seconds = differenceInSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        updateCallback(formattedTime);
    }, 1000);

    return () => clearInterval(timer);
};



const IdleTimerComponent = ({ setReload, reload }) => {

    const [isIdle, setIsIdle] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const idleTimerRef = useRef(null);
    const [idleStatus, setIdleStatus] = useState(null);
    const [time, setTime] = useState('');
    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    useEffect(() => {
        const url = `${URL}breaks/idle`;

        axios.get(url, {
            params: {
                "emp_id": userinfo.user_name,
            }
        })
            .then((res) => {
                setIdleStatus(res.data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isIdle]);


    useEffect(() => {
        if (idleStatus?.status === 1) {
            setIsIdle(true);
            setModalOpen(true);
        } else if (idleStatus?.status === 0 || idleStatus?.status === 2) {
            setIsIdle(false);
            setModalOpen(false);
        }
    }, [idleStatus]);


    useEffect(() => {
        if (idleStatus?.start) {
            const date = new Date();
            const stopTimer = CalculateTime(idleStatus.start || date, setTime);

            return () => {
                stopTimer();
            };
        }
    }, [idleStatus?.start]);


    const onIdle = async () => {
        const url = `${URL}breaks/idle`;
        try {
            const response = await axios.put(url, {
                "emp_id": userinfo.user_name,
                "type": 0
            });
            if (response.data.status === 1) {
                setIsIdle(true);
                setModalOpen(true);
            }
        } catch (err) {
            console.log("Error occurred in updating the idle Start time: ", err);
        }
    };


    const handleCloseModal = async () => {
        const url = `${URL}breaks/idle`;

        try {
            const response = await axios.put(url, {
                "emp_id": userinfo.user_name,
                "type": 1
            });

            if (response.data.status === 1) {
                setModalOpen(false);
                setIsIdle(false);
                setReload(!reload)
            }
        } catch (error) {
            console.log("Error occurred in updating the idle End Time", error);
        }
    };

    

    return (
        <IdleTimerProvider
            ref={idleTimerRef}
            timeout={1000 * 60 * 5}
            // timeout={1000 * 5}
            onIdle={onIdle}
            debounce={500}
        >
            <Modal open={modalOpen}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}
                >
                    <>
                        <Typography variant="h6" component="h2">
                            {`You were away for ${time}`}
                        </Typography>
                        <Button variant="outlined" color="success" onClick={handleCloseModal} sx={{ mt: 2 }}>
                            Resume
                        </Button>
                    </>
                </Box>
            </Modal>
        </IdleTimerProvider>
    );
};


export default IdleTimerComponent;
