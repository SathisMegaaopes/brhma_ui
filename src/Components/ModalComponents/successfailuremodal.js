
import React, { useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

const SuccessFailureModal = ({ open, handleClose, status, successmsg, errormsg }) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                handleClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [open, handleClose]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(5px)',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: 400,
                    height: 300,
                    background: status === 1
                        ? 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(0,128,0,1) 100%)'
                        : 'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(139,0,0,1) 100%)',
                    color: 'white',
                    borderRadius: '15px',
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)',
                    animation: 'slideIn 0.5s ease-out',
                    '@keyframes slideIn': {
                        from: { opacity: 0, transform: 'translateY(-20px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                    },
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>

                {status === 1 ? (
                    <CheckCircleIcon
                        sx={{
                            fontSize: 80,
                            mb: 2,
                            animation: 'pulse 1.5s infinite',
                            '@keyframes pulse': {
                                // '0%': { transform: 'scale(1)', boxShadow: '0 0 10px rgba(0, 255, 0, 0.7)' },
                                // '50%': { transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(0, 255, 0, 1)' },
                                // '100%': { transform: 'scale(1)', boxShadow: '0 0 10px rgba(0, 255, 0, 0.7)' },
                                '0%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.1)' },
                                '100%': { transform: 'scale(1)'},
                            },
                        }}
                    />
                ) : (
                    <ErrorIcon
                        sx={{
                            fontSize: 80,
                            mb: 2,
                            animation: 'pulse 1.5s infinite',
                            '@keyframes pulse': {
                                '0%': { transform: 'scale(1)'},
                                '50%': { transform: 'scale(1.1)'},
                                '100%': { transform: 'scale(1)' },
                                // '0%': { transform: 'scale(1)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.7)' },
                                // '50%': { transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(255, 0, 0, 1)' },
                                // '100%': { transform: 'scale(1)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.7)' },
                            },
                        }}
                    />
                )}

                <Typography id="modal-title" variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    {status === 1 ? 'Success' : 'Failure'}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2, fontSize: 18, fontStyle: 'italic' }}>
                    {status === 1 ? successmsg : errormsg}
                </Typography>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                        mt: 2,
                        px: 4,
                        py: 1,
                        fontSize: '16px',
                        borderRadius: '25px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.4)',
                        },
                    }}
                >
                    OK
                </Button>
            </Box>
        </Modal>
    );
};

export default SuccessFailureModal;


