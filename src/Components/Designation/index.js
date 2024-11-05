import { Alert, Autocomplete, Avatar, Box, Button, CircularProgress, Divider, Drawer, FormControl, Grid, IconButton, InputAdornment, InputBase, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { right } from '@popperjs/core';
import CustomDrawer from '../CustomComponents/drawer';
import CustomSelect from '../CustomComponents/customSelect';
import DatanotFound from '../CustomComponents/datanotfound';
import { useFetchData } from '../EmployeeTable/customHook';
import URL from '../Global/Utils/url_route';
import axios from 'axios';

const DesignationMaster = () => {

    const [openModal, setOpenModal] = useState(false);
    const [searchInuputData, setSearchInputData] = useState(null);
    const [leadeName, setLeadName] = useState(null);
    const [designationName, setDesignationName] = useState(null)
    const [billableStatus, setBillableStatus] = useState(null);
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [reload, setReload] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }


    const searchData = { "searchData": searchInuputData }

    const designationsURL = `${URL}designations`
    const employeeUrl = `${URL}todolist/employee`;

    const { data: designationData, error: designationError, loading: designationLoading } = useFetchData(designationsURL, searchData, searchInuputData , reload);

    const { data: employeeData, loading: employeeLoading, error: employeeError } = useFetchData(employeeUrl);

    const employeeMap = (data) => {
        if (data) {
            return data.map((item) => ({
                label: item.f_name + " " + item.l_name,
                value: item.f_name + " " + item.l_name
            }))

        } else {
            return [{
                label: 'Loading data',
                value: 'Loading data'
            }, {
                label: 'Loading data',
                value: 'Loading data'
            }
            ]
        }
    }

    // handleCreate


    const handleCreate = async () => {

        let url = `${URL}department`;

        const apiPostData = {
            "designationName": designationName,
            "leadeName": leadeName,
            "billable": billableStatus
        }

        try {

            const response = await axios.post(designationsURL, apiPostData)

            if (response?.data?.status === 1) {


                setBillableStatus(null);
                setDesignationName(null);
                setLeadName(null);

                setShowSnackbar(true)
                setSnackbarMessage(1)
                setOpenModal(false);
                setReload(!reload);

            } else {

                setShowSnackbar(true);
                setSnackbarMessage(0);

            }

        } catch (error) {
            console.error(error, 'This is the error in the uploadfile')
            setShowSnackbar(true)
            setSnackbarMessage(0)
        }
    }


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
                            onChange={(e) => setSearchInputData(e.target.value)}
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


                {designationLoading && (

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
                            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress />
                            </Grid>

                        </Grid>

                    </Box>

                )}


                {!designationLoading && (

                    designationData?.data?.length > 0 ? (
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                                <TableHead sx={{ height: 50 }}>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: 18 }}>Designation Name</TableCell>
                                        <TableCell sx={{ fontSize: 18 }}>Lead Name</TableCell>
                                        <TableCell sx={{ fontSize: 18 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {designationData?.data?.map((item) => (
                                        <TableRow key={item.id} style={{ cursor: 'pointer' }}>
                                            <TableCell sx={{ padding: 2 }}>
                                                <Typography sx={{ fontWeight: 400, fontSize: 20 }}>
                                                    {item.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontWeight: 400 }}>
                                                    {item.manager}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontWeight: 400 }}>
                                                    {item.billable === 0 ? 'Billable' : 'Non - Billable'}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <DatanotFound />
                    )
                )}

            </Grid>


            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(!showSnackbar)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    zIndex: 99999,
                }}
            >
                <Alert
                    onClose={() => setShowSnackbar(!showSnackbar)}
                    severity={snackbarMessage === 1 ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage === 1 ? ' Executed Successfully ' : 'Something went Wrong !'}
                </Alert>
            </Snackbar>


            <CustomDrawer title={'Add new Department'} open={openModal} close={handleCloseModal} handleCreate={handleCreate}>

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
                                value={designationName || ''}
                                onChange={(e) => setDesignationName(e.target.value)}
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
                                Manager
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>

                            <Autocomplete
                                disablePortal
                                value={leadeName}
                                options={employeeMap(employeeData?.data)}
                                onChange={(e, value) => setLeadName(value?.value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Manager"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                height: '50px',
                                                fontSize: '14px',
                                            },
                                            '& .MuiInputLabel-root': {
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

                    <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <Grid item xs={4}>
                            <Typography>
                                Billable Status
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                value={billableStatus}
                                onChange={(e) => setBillableStatus(e.target.value)}
                                sx={{
                                    height: '50px',
                                    width: '100%',
                                    fontSize: '14px',
                                    '& .MuiSelect-root': {
                                        height: '50px',

                                    },
                                    '& .MuiInputLabel-root': {
                                        top: '-8px',
                                        fontSize: '14px',
                                    },
                                    '& .MuiInputLabel-shrink': {
                                        top: 0,
                                    },
                                }}
                                displayEmpty
                            >
                                <MenuItem value={0}>Billable</MenuItem>
                                <MenuItem value={1}>Non Billable</MenuItem>
                            </Select>

                        </Grid>
                    </Grid>


                </Grid>

            </CustomDrawer>


        </Grid>
    )
}

export default DesignationMaster;
