import { Box, Button, Divider, Drawer, TextField, Typography } from '@mui/material'
import React, { Children } from 'react'
import CloCseIcon from '@mui/icons-material/Close';

const CustomDrawer = ({ title, children, open, close, handleCreate, viewMode, editMode }) => {
    return (
        <div>
            <Drawer
                anchor={'right'}
                open={open}
            // onClose={close}
            >

                {/* viewMode */}

                {viewMode ?

                    <Box sx={{ width: 500, height: '100%', display: 'flex', flexDirection: 'column', p: 3, pt: 12 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ pl: 1 }}>
                                Department Details
                            </Typography>
                            <Button disableRipple sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', '&:hover': {
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                },
                            }} onClick={close}>
                                <CloCseIcon />
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 1, my: 2 }}>
                            {children}
                        </Box>

                        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                            <Button sx={{ mr: 1 }} color='error' onClick={close}>
                                Cancel
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleCreate} >
                                Create
                            </Button>
                        </Box> */}
                    </Box>

                    :

                    <Box sx={{ width: 500, height: '100%', display: 'flex', flexDirection: 'column', p: 3, pt: 12 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ pl: 1 }}>
                                {editMode ? 'Update Department Details' : title}
                            </Typography>
                            <Button disableRipple sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', '&:hover': {
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                },
                            }} onClick={close}>
                                <CloCseIcon />
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 1, my: 2 }}>
                            {children}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                            <Button sx={{ mr: 1 }} color='error' onClick={close}>
                                Cancel
                            </Button>
                            <Button variant="outlined" color="primary" onClick={() => handleCreate(editMode ? 1 : 0)} >
                                {editMode ? 'Update' : 'Create'}
                            </Button>
                        </Box>
                    </Box>
                }

                {/* 
                <Box sx={{ width: 500, height: '100%', display: 'flex', flexDirection: 'column', p: 3, pt: 12 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ pl: 1 }}>
                            {title}
                        </Typography>
                        <Button disableRipple sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', '&:hover': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                        }} onClick={close}>
                            <CloCseIcon />
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 1, my: 2 }}>
                        {children}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                        <Button sx={{ mr: 1 }} color='error' onClick={close}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleCreate} >
                            Create
                        </Button>
                    </Box>
                </Box> */}
            </Drawer>

        </div>
    )
}

export default CustomDrawer
