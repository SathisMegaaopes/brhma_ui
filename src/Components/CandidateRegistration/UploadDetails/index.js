import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Container, Grid } from "@mui/material";
import URL from '../../Global/Utils/url_route.js';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Input = styled('input')({
    display: 'none',
});


const UploadDetails = (props) => {

    const [uploadStatus, setUploadStatus] = useState({
        resumeUploaded: false,
        profileUploaded: false
    })

    const [type, setType] = useState('')
    const [id, setId] = useState(props.id)

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');


    useEffect(() => {
        let timer;
        if (alertMessage) {
            timer = setTimeout(() => {
                setAlertMessage('');
                setAlertSeverity('');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [alertMessage]);

    const handleFileUpload = async (event) => {
        const selectedFile = event.target.files[0];


        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('id', id)
        formData.append('type', type);


        let personal_url = URL + "candidateupload";

        try {
            const response = await axios.post(personal_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (type === 'file') {
                setUploadStatus(prevStatus => ({
                    ...prevStatus,
                    resumeUploaded: true
                }));
            } else if (type === 'image') {
                setUploadStatus(prevStatus => ({
                    ...prevStatus,
                    profileUploaded: true
                }));
            }

            setAlertMessage(`${type} uploaded successfully!`);
            setAlertSeverity('success');

        } catch (error) {
            console.log('An error occurred:', error.message);
            setAlertMessage('Upload failed.');
            setAlertSeverity('error');
        }
    };


    const handleClick = () => {

        props.handleNext();

    }

    return (

        <Container>
            <Grid container spacing={2} marginTop={5} alignItems={'center'} justifyContent={'center'}>
                <Grid container item spacing={2} justifyContent={'center'}>
                    <Grid item>
                        <label htmlFor="file-upload">
                            <Input
                                id="file-upload"
                                type="file"
                                onChange={handleFileUpload}
                            />
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<UploadFileIcon />}
                                sx={{ marginRight: 2 }}
                                onClick={() => setType('file')}
                            >
                                Upload Resume
                            </Button>
                        </label>
                    </Grid>

                    <Grid item>
                        <label htmlFor="image-upload">
                            <Input
                                accept="image/jpeg,image/png"
                                id="image-upload"
                                type="file"
                                onChange={handleFileUpload}
                            />
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<ImageIcon />}
                                onClick={() => setType('image')}
                            >
                                Upload Profile
                            </Button>
                        </label>
                    </Grid>
                </Grid>


                <Grid item xs={12}>
                    <Stack
                        sx={{
                            width: 'fit-content',
                            margin: 'auto',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '20px'
                        }}
                        spacing={2}
                    >
                        {alertMessage && (
                            <Alert
                                severity={alertSeverity}
                                sx={{
                                    width: '100%',
                                    maxWidth: { xs: '100%', sm: '100%', md: '100%' },
                                    height: 'auto',
                                    maxHeight: { xs: '40px', sm: '40px', md: '40px' },
                                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' },
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: { xs: '0.5rem 1rem', sm: '0.5rem 1rem', md: '0.5rem 1rem' },
                                    overflow: 'hidden',
                                    boxSizing: 'border-box',
                                    backgroundColor: alertSeverity === 'error'
                                        ? '#f5c6cb'
                                        : '#c3e6cb',
                                    color: alertSeverity === 'error'
                                        ? '#721c24'
                                        : '#155724',
                                }}
                            >
                                {alertMessage}
                            </Alert>
                        )}
                    </Stack>
                </Grid>

                <Grid item xs={12} marginTop={5}>
                    <Button
                        variant='contained'
                        color='success'
                        disableElevation
                        fullWidth
                        onClick={handleClick}
                        disabled={!uploadStatus.resumeUploaded || !uploadStatus.profileUploaded}
                    >
                        NEXT
                    </Button>
                </Grid>
            </Grid>
        </Container>

    );
};

export default UploadDetails;
