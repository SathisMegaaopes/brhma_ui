import { Autocomplete, Avatar, Box, Button, Divider, Drawer, FormControl, Grid, IconButton, InputAdornment, InputBase, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { right } from '@popperjs/core';
import CustomDrawer from '../CustomComponents/drawer';
import CustomSelect from '../CustomComponents/customSelect';
const DesignationMaster = () => {


    const [openModal, setOpenModal] = useState(false);

    // console.log(age)


    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }




    const data = [

        {
            id: 1,
            name: 'Software Developer',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Sathis kumar R'
        },
        {
            id: 2,
            name: 'Operations Manager',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Kannan R'
        }, {
            id: 3,
            name: 'IT Adminstrator',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Shamala Srinivas'
        }, {
            id: 4,
            name: `HR's Executive`,
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Kannan R'
        }, {
            id: 5,
            name: 'Business Development Executive',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Sathis kumar R'
        }, {
            id: 6,
            name: 'Admin and Facility ',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Sathis kumar R'
        },
    ]


    return (
        <Grid container sx={{ width: '100%', paddingLeft: 6, paddingTop: 3 }}>

            <Grid container xs={12} sx={{ backgroundColor: '', paddingRight: 4 }}>
                <Grid item xs={3}>
                    <Typography
                        variant='h5'
                        component='h1'
                    >Designation Details</Typography>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Paper
                        variant='outlined'
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 40, outline: '1px solid' }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <SearchIcon sx={{ color: 'black' }} />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: 'black' }}
                            placeholder="Search Designation Names"
                            inputProps={{ 'aria-label': 'Search Designation Names' }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={2} sx={{ backgroundColor: '', textAlign: 'right' }}>
                    <Button variant='outlined' onClick={handleOpenModal}>
                        Add Desingation
                    </Button>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ paddingTop: 2, paddingRight: 4 }} >

                {data.length > 0 ?

                    <TableContainer component={Paper} variant="outlined" >

                        <Table size='small'>
                            <TableHead sx={{ height: 50 }}>
                                <TableRow>

                                    <TableCell sx={{ fontSize: 18 }}> Desgination Name</TableCell>

                                    <TableCell sx={{ fontSize: 18 }}>Lead Name</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody >

                                {data.map((item, index) => (

                                    <TableRow key={item.id} style={{ cursor: 'pointer' }} >

                                        <TableCell sx={{ padding: 2 }}>

                                            <Typography sx={{ fontWeight: 400, fontSize: 20 }}>
                                                {item.name}
                                            </Typography>

                                        </TableCell>

                                        <TableCell>

                                            <Typography sx={{ fontWeight: 400 }}>
                                                {item.leadname}
                                            </Typography>


                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>


                        </Table>
                    </TableContainer>

                    :

                    <Box
                        sx={{
                            height: '70vh',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Diversity2Icon sx={{ fontSize: 100, marginTop: '-40px', color: 'gray' }} />
                                <Typography variant='h5' sx={{ mt: '30px' }}>Sorry , There is no Team available ....  </Typography>
                            </Grid>

                        </Grid>

                    </Box>

                }
            </Grid>

            <CustomDrawer title={'Add new Department'} open={openModal} close={handleCloseModal}>

                <Grid container>

                    <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, mt: 4 }}>
                        <Grid item xs={4}>
                            <Typography>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                label="Enter Designation Name"
                                variant="outlined"
                                sx={{
                                    mb: 2,
                                    '& .MuiInputBase-root': {
                                        height: 45,
                                        fontSize: '17px',
                                    },
                                    '& .MuiInputLabel-root': {
                                        top: '-4px',
                                        fontSize: '17px',
                                    },
                                    '& .MuiInputLabel-shrink': {
                                        top: 0,
                                    },
                                }}

                            />
                        </Grid>
                    </Grid>


                    <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <Grid item xs={4}>
                            <Typography>
                                Billable Status
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Autocomplete
                                disablePortal
                                value={'Billable'}
                                options={[{ label: 'Billable', value: 'Billable' },
                                { label: 'Non Billable', value: 'Non Billable' }]}
                                // onChange={(e, value) => handleDepartmentChange(e, value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Select Department"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                height: '50px',
                                                fontSize: '14px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                top: '-8px',
                                                fontSize: '14px',
                                            },
                                            '& .MuiInputLabel-shrink': {
                                                top: 0,
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>



                    <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                        <Grid item xs={4}>
                            <Typography>
                                Add Members
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <CustomSelect />
                        </Grid>
                    </Grid>


                </Grid>

            </CustomDrawer>

        </Grid>
    )
}

export default DesignationMaster;
