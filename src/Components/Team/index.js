import {
    Autocomplete, Box, Button, CircularProgress, Grid, IconButton,
    InputBase, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, Typography,
    Snackbar, Alert
} from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomDrawer from '../CustomComponents/drawer';
import DatanotFound from '../CustomComponents/datanotfound';
import URL from '../Global/Utils/url_route';
import { useFetchData } from '../EmployeeTable/customHook';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const TeamMaster = () => {
    const [openModal, setOpenModal] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [teamName, setTeamName] = useState(null);
    const [department, setDepartment] = useState(null);
    const [manager, setManager] = useState(null);
    const [teamLead, setTeamLead] = useState(null);
    const [members, setMembers] = useState([]);
    // { 'label': 'Kannan R', 'value': 'Kannan R' }, { 'label': 'Adarsh B M', 'value': 'Adarsh B M' }
    // Intha mari than , backend la irunthu varanum seriya , so don't be lazy dude eh .....
    const [teamDescription, setTeamDescription] = useState(null);
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [addMode, setAddMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editmodeID, setEditModeId] = useState(null);
    const [reload, setReload] = useState(false);


    const handleOpenModal = () => {
        setAddMode(true)
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setTeamName(null);
        setDepartment(null);
        setManager(null);
        setTeamLead(null);
        setMembers(null);
        setTeamDescription(null);

        setViewMode(false);
        setEditMode(false);
        setAddMode(false);
    }

    const employeeUrl = `${URL}todolist/employee`;
    const departmentUrl = `${URL}todolist/department`;
    const teamUrl = `${URL}team`;


    const { data: employeeData, loading: employeeLoading, error: employeeError } = useFetchData(employeeUrl);

    const { data: departmentData, loading: departmentLoading, error: departmentError } = useFetchData(departmentUrl);

    const { data: teamData, loading: teamLoading, error: teamError } = useFetchData(teamUrl,
        { searchData: searchData }, searchData, reload);


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


    const mapOptions = (data) => {

        if (data) {
            return data.map(item => ({
                label: item?.name,
                value: item?.name
            }));
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


    const handleCreate = async (mode) => {

        const teamUrl2 = `${URL}team`;

        const apiPostData = {
            "teamName": teamName,
            "department": department,
            "manager": manager,
            "teamLead": teamLead,
            "members": members,
            "teamDescription": teamDescription,
            "mode": mode,
            "editmodeID": editmodeID,
        }

        try {

            const response = await axios.post(teamUrl2, apiPostData);

            if (response?.data?.status === 1) {
                setTeamName(null);
                setDepartment(null);
                setManager(null);
                setTeamLead(null);
                setMembers(null);
                setTeamDescription(null);
                setShowSnackbar(true)
                setSnackbarMessage(1)
                setOpenModal(false);
                setReload(!reload);

            } else {
                setShowSnackbar(true);
                setSnackbarMessage(0);
            }

        } catch (error) {
            console.error(error, 'This is the error in the uploadfile');
            setShowSnackbar(true);
            setSnackbarMessage(0);
        }
    }



    //mode === 1 => Edit , mode === 0 => View

    const handleUpdateData = async (id, mode) => {

        let url = `${URL}team/${id}`

        try {
            const response = await axios.get(url);

            if (response?.data?.status === 1) {
                if (mode === 1) {
                    setEditMode(true)
                    setOpenModal(true)
                    setEditModeId(id)

                } else if (mode === 0) {
                    setViewMode(true)
                    setOpenModal(true)

                } else {
                    setShowSnackbar(true);
                    setSnackbarMessage(0);
                    setOpenModal(false)

                    setTeamName(null);
                    setDepartment(null);
                    setManager(null);
                    setTeamLead(null);
                    setTeamDescription(null);
                }

                setTeamName(response?.data?.data[0]?.name);
                setDepartment(response?.data?.data[0]?.department);
                setManager(response?.data?.data[0]?.manager);
                setTeamLead(response?.data?.data[0]?.teamLead);
                // setMembers(response?.data?.data[0]?.);
                setTeamDescription(response?.data?.data[0]?.description);

            } else {
                setShowSnackbar(true);
                setSnackbarMessage(0);
            }

        } catch (error) {
            setShowSnackbar(true);
            setSnackbarMessage(0);
        }

    }



    return (

        // height: 'calc(86vh - 1px)' //Important da Sathis uh , itha use panni than , height ah crct ah define panna mudiyum da , so ne patuku delete panniratha da sathis uhhhh

        <Grid container sx={{ width: '100%', paddingLeft: 6, paddingTop: 3 }}>

            <Grid container xs={12} sx={{ backgroundColor: '', paddingRight: 4 }}>

                <Grid item xs={3}>
                    <Typography
                        variant='h5'
                        component='h1'
                    >
                        Teams Details
                    </Typography>
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
                            placeholder="Search Team Names"
                            inputProps={{ 'aria-label': 'search team names' }}
                            onChange={(e) => {
                                setSearchData(e.target.value)
                            }}
                        />
                    </Paper>

                </Grid>

                <Grid item xs={2} sx={{ backgroundColor: '', textAlign: 'right' }}>
                    <Button variant='outlined' onClick={handleOpenModal}>
                        Add New Team
                    </Button>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ paddingTop: 2, paddingRight: 4 }} >

                {teamLoading && (

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

                {teamError && (

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

                                <Typography variant='h6'>
                                    Something went wrong ... Please infrom to your Software Developer ...
                                </Typography>

                            </Grid>

                        </Grid>

                    </Box>
                )}

                {teamData?.data?.length > 0 && !teamLoading ?

                    <TableContainer component={Paper} variant="outlined" >

                        <Table size='small'>
                            <TableHead sx={{ height: 50 }}>
                                <TableRow>

                                    <TableCell sx={{ fontSize: 18 }}> Team Name</TableCell>

                                    <TableCell sx={{ fontSize: 18 }}>Description</TableCell>

                                    <TableCell sx={{ fontSize: 18 }}>Lead Name</TableCell>

                                    <TableCell sx={{ fontSize: 18, textAlign: 'center' }}>Actions</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody >

                                {teamData.data?.map((item, index) => (

                                    <TableRow key={item.id} style={{ cursor: 'pointer' }} >

                                        <TableCell sx={{ padding: 2 }} onClick={() => {
                                        }}>
                                            <Typography
                                                sx={{ fontWeight: 400, fontSize: 20 }}
                                                onClick={() => {
                                                    handleUpdateData(item.id, 0)
                                                }}
                                            >
                                                {item.name} Team
                                            </Typography>

                                            <Typography sx={{ color: 'gray' }}>
                                                MegaaOpes Solutions Private Limited
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography sx={{ fontWeight: 400 }}>
                                                {item.description}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography sx={{ fontWeight: 400 }}>
                                                {item.teamLead}
                                            </Typography>
                                        </TableCell>


                                        <TableCell sx={{ textAlign: 'center' }} >
                                            <Button
                                                onClick={() => {
                                                    handleUpdateData(item.id, 1);
                                                }}

                                            >
                                                <ModeEditIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <DatanotFound />
                }
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


            <CustomDrawer title={'Add new Department'} open={openModal} close={handleCloseModal} handleCreate={handleCreate} viewMode={viewMode} editMode={editMode} addMode={addMode} >


                {viewMode && (

                    <Grid container>

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, mt: 3 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Team Name
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>

                                <Typography variant='h6'>
                                    {teamName}
                                </Typography>

                            </Grid>

                        </Grid>

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Parent Department
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>

                                <Typography variant='h6'>
                                    {department}
                                </Typography>

                            </Grid>

                        </Grid>

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Manager
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>

                                <Typography variant='h6'>
                                    {manager}
                                </Typography>

                            </Grid>

                        </Grid>

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Team Lead
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>

                                <Typography variant='h6'>
                                    {teamLead}
                                </Typography>

                            </Grid>

                        </Grid>

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Team Description
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>

                                <Typography variant='h6'>
                                    {teamDescription}
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>

                )}


                {addMode || editMode ? (

                    <Grid container >

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 0 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Name
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    label="Enter Team Name"
                                    variant="outlined"
                                    value={teamName || ''}
                                    onChange={(e) => setTeamName(e.target.value)}
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
                                    Department
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Autocomplete
                                    disablePortal
                                    value={department || ''}
                                    options={mapOptions(departmentData?.data)}
                                    onChange={(e, value) => setDepartment(value.value)}
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

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Manager
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Autocomplete
                                    disablePortal
                                    value={manager || ''}
                                    options={employeeMap(employeeData?.data)}
                                    onChange={(e, value) => setManager(value.value)}
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

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Team Lead
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Autocomplete
                                    disablePortal
                                    value={teamLead || ''}
                                    options={employeeMap(employeeData?.data)}
                                    onChange={(e, value) => setTeamLead(value.value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
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
                                {/* <CustomSelect /> */}

                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    value={members || []}
                                    options={employeeMap(employeeData?.data)}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(e, value) => setMembers(value)}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Employee"
                                            placeholder="Search or Select"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    // height: '50px',
                                                    fontSize: '14px',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    top: '0px',
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

                        <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                            <Grid item xs={4}>
                                <Typography>
                                    Description
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    label="Mention description "
                                    value={teamDescription || ''}
                                    variant="outlined"
                                    onChange={(e) => setTeamDescription(e.target.value)}
                                    multiline
                                    rows={3}
                                    sx={{
                                        mb: 2,
                                        '& .MuiInputBase-root': {
                                            // height: 45,
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

                    </Grid>

                ) : ''}

            </CustomDrawer>

        </Grid>


    )
}

export default TeamMaster;
