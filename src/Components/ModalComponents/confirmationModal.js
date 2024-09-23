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
        <Box display="flex" justifyContent="space-around" gap={3}>
          <Button
            variant="outlined"
            onClick={onConfirm}
            fullWidth
            color='success'
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            fullWidth
            color='error'
          >
            No
          </Button>
        </Box>
      </Box>

    </Modal>
  );
};

export default ConfirmationModal;
