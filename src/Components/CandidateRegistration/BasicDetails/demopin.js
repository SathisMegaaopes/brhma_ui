import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import pincode from "pincode-distance";
import { Grid } from '@mui/material';

import Alert from '@mui/material/Alert';


const BasicModal = () => {
    const [zipCode, setZipCode] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        let timer;
        if (message) {
            timer = setTimeout(() => {
                setMessage('');
                setTitle('');
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [message]);



    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const handleCalculateDistance = async () => {
        try {
            const Pincode = new pincode();
            const distance = Pincode.getDistance("560043", zipCode);
            let roundedDistance = Math.round(distance);

            if (roundedDistance === -1) {
                setTitle('error');
                setMessage('Please check your Pin Code...');
            } else if (roundedDistance < 15) {
                setTitle('success');
                setMessage(`You have a Cab facility. The distance is ${roundedDistance} km.`);
            } else {
                setTitle('warning');
                setMessage(`Sorry! You don't have a cab facility. The distance is ${roundedDistance} km.`);
            }
        } catch (error) {
            setTitle('error');
            setMessage('An error occurred while calculating the distance.');
        }

    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
            <Grid>
                <TextField
                    size='small'
                    label="Enter Zip Code"
                    variant="outlined"
                    value={zipCode}
                    error={zipCode === '' ? true : false}
                    onChange={handleZipCodeChange}
                    onBlur={handleCalculateDistance}

                />
            </Grid>
            <Grid>
                {message !== '' ?
                    <Alert severity={title}
                        sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '100%', md: '100%' },
                            height: 'auto',
                            maxHeight: { xs: '40px', sm: '40px', md: '40px' },
                            fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' },
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: { xs: '0.5rem 1rem', sm: '0.5rem 1rem', md: '0.5rem 1rem' },
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                            backgroundColor: title === 'error'
                                ? '#f5c6cb'
                                : title === 'warning'
                                    ? '#ffeeba'
                                    : '#c3e6cb',
                            color: title === 'error'
                                ? '#721c24'
                                : title === 'warning'
                                    ? '#856404'
                                    : '#155724',

                        }}
                    >
                        {message}
                    </Alert> : ''}
            </Grid>
        </div>
    );
};

export default BasicModal;
