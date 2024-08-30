import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';


const ConfirmationModal = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#F8F9FA',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
        }}
      >
        <Typography id="modal-title" variant="h5" component="h2" mb={2} sx={{ color: '#333' }}>
          {title}
        </Typography>
        <Typography id="modal-description" mb={3} sx={{ color: '#555' }}>
          {description}
        </Typography>
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #56ab2f, #a8e063)', 
              '&:hover': { background: 'linear-gradient(135deg, #3b7a1e, #8bc34a)' }, 
              color: '#FFF',
              boxShadow: '0px 4px 12px rgba(88, 172, 53, 0.5)',
            }}
            onClick={onConfirm}
          >
            Yes, Continue
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #e52d27, #ff6a5f)',
              '&:hover': { background: 'linear-gradient(135deg, #c1271a, #ff5347)' }, 
              color: '#FFF',
              boxShadow: '0px 4px 12px rgba(230, 45, 39, 0.5)',
            }}
            onClick={onClose}
          >
            No, Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
