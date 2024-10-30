import { Autocomplete, Avatar, Box, Menu, MenuItem, Button, CircularProgress, Divider, Drawer, Grid, IconButton, InputAdornment, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomDrawer from '../CustomComponents/drawer';
import DatanotFound from '../CustomComponents/datanotfound';
import URL from '../Global/Utils/url_route';
import { useFetchData } from '../EmployeeTable/customHook';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';


const TeamMaster = () => {

    const [openModal, setOpenModal] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [teamName, setTeamName] = useState(null);
    const [department, setDepartment] = useState(null);
    const [manager, setManager] = useState(null);
    const [teamLead, setTeamLead] = useState(null);
    // const [members, setMembers] = useState([]);
    const [members, setMembers] = useState([{ 'label': 'Kannan R', 'value': 'Kannan R' }, { 'label': 'Adarsh B M', 'value': 'Adarsh B M' }]);
    const [teamDescription, setTeamDescription] = useState(null);

    const [addMode, setAddMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const openOptions = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptions = () => {
        setAnchorEl(null);
    };


    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }


    const employeeUrl = `${URL}todolist/employee`;
    const departmentUrl = `${URL}todolist/department`;
    const teamUrl = `${URL}team`


    const { data: employeeData, loading: employeeLoading, error: employeeError } = useFetchData(employeeUrl);

    const { data: departmentData, loading: departmentLoading, error: departmentError } = useFetchData(departmentUrl);

    const { data: teamData, loading: teamLoading, error: teamError } = useFetchData(teamUrl,
        { searchData: searchData }, searchData
    );


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

    const data = [

        {
            id: 1,
            name: 'Software Team',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Sathis kumar R'
        },
        {
            id: 2,
            name: 'Operations Team',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Kannan R'
        }, {
            id: 3,
            name: 'IT Team',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Shamala Srinivas'
        }, {
            id: 4,
            name: 'Human Resource Team',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Kannan R'
        }, {
            id: 5,
            name: 'Business Development Team',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Sathis kumar R'
        }, {
            id: 6,
            name: 'Admin and Facility Team',
            company: 'MegaaOpes Solutions Private Limited',
            leadname: 'Sathis kumar R'
        },
    ]


    const handleCreate = async (mode) => {


        console.log('Thisis the data ,,,,,, ', teamName, department, manager, teamLead, members, teamDescription)

        let url = `${URL}team`;

        const apiPostData = {
            "teamName": teamName,
            "department": department,
            "manager": manager,
            "teamLead": teamLead,
            "members": members,
            "teamDescription": teamDescription,
        }


        try {

            const response = await axios.post(url, apiPostData)

            // if (response?.data?.status === 1) {

            //     setDepartmentName(null);
            //     setParentDepartment(null);
            //     setLeadName(null);
            //     setShowSnackbar(true)
            //     setSnackbarMessage(1)
            //     setOpenModal(false);

            //     setReload(true);

            // } else {

            //     setShowSnackbar(true);
            //     setSnackbarMessage(0);

            // }


        } catch (error) {

            // console.error(error, 'This is the error in the uploadfile');
            // setShowSnackbar(true);
            // setSnackbarMessage(0);

        }



    }





    //mode === 1 => Edit , mode === 0 => View

    const handleUpdateData = async (id, mode) => {

        // let url = `${URL}department/${id}`

        // try {

        //   const response = await axios.get(url);

        //   if (response?.data?.status === 1) {
        //     if (mode === 1) {
        //       setEditMode(true)
        //       setOpenModal(true)
        //       setEditModeId(id)

        //     } else if (mode === 0) {
        //       setViewMode(true)
        //       setOpenModal(true)

        //     } else {
        //       setShowSnackbar(true);
        //       setSnackbarMessage(0);
        //       setOpenModal(false)
        //       setDepartmentName(null);
        //       setParentDepartment(null);
        //       setLeadName(null);
        //     }
        //     // setOpenModal(true)
        //     setAnchorEl(false)

        //     setDepartmentName(response?.data?.data[0]?.name);
        //     setParentDepartment(response?.data?.data[0]?.parent_department);
        //     setLeadName(response?.data?.data[0]?.lead_name);

        //   } else {
        //     setShowSnackbar(true);
        //     setSnackbarMessage(0);
        //   }

        // } catch (error) {
        //   setShowSnackbar(true);
        //   setSnackbarMessage(0);
        // }

    }



    return (

        // height: 'calc(86vh - 1px)' //Important da Sathis uh , itha use panni than , height ah crct ah define panna mudiyum da , so ne patuku delete panniratha da sathis uhhhh
        <Grid container sx={{ width: '100%', paddingLeft: 6, paddingTop: 3 }}>

            <Grid container xs={12} sx={{ backgroundColor: '', paddingRight: 4 }}>
                <Grid item xs={3}>
                    <Typography
                        variant='h5'
                        component='h1'
                    >Teams Details</Typography>
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

                                    <TableCell sx={{ fontSize: 18 }}>Lead Name</TableCell>

                                    <TableCell sx={{ fontSize: 18 }}>Actions</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody >

                                {teamData.data?.map((item, index) => (

                                    <TableRow key={item.id} style={{ cursor: 'pointer' }} >

                                        <TableCell sx={{ padding: 2 }}>

                                            <Typography sx={{ fontWeight: 400, fontSize: 20 }}>
                                                {item.name} Team
                                            </Typography>


                                            <Typography sx={{ color: 'gray' }}>
                                                {/* {item.company} */}
                                                MegaaOpes Solutions Private Limited
                                            </Typography>

                                        </TableCell>

                                        <TableCell>

                                            <Typography sx={{ fontWeight: 400 }}>
                                                {item.teamLead}
                                            </Typography>


                                        </TableCell>


                                        <TableCell align="center" sx={{ padding: 0 }}>

                                            <IconButton color='primary' sx={{ padding: 0.5, boxShadow: 'none' }} >
                                                <Button
                                                    id="fade-button"
                                                    aria-controls={openOptions ? 'fade-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openOptions ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="fade-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'fade-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleCloseOptions}
                                                    TransitionComponent={Fade}
                                                    sx={{
                                                        '& .MuiPaper-root': {
                                                            border: '1px solid black',
                                                            boxShadow: 'none',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem onClick={() => {

                                                        handleUpdateData(item.id, 0)
                                                    }
                                                    }>
                                                        <Button variant='outlined' color='primary' sx={{ bgcolor: '', width: '100%' }}>
                                                            View
                                                        </Button>
                                                    </MenuItem>

                                                    <MenuItem onClick={
                                                        () => {
                                                            handleUpdateData(item.id, 1)
                                                        }
                                                    }>
                                                        <Button variant='outlined' color='primary' sx={{ bgcolor: '', width: '100%' }}>
                                                            Edit
                                                        </Button>
                                                    </MenuItem>

                                                    <MenuItem onClick={''}>
                                                        <Button variant='outlined' color='primary' sx={{ bgcolor: '', width: '100%' }}>
                                                            Activate
                                                        </Button>
                                                    </MenuItem>

                                                </Menu>

                                            </IconButton>
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

            {/*   handleCreate, viewMode, editMode */}


            <CustomDrawer title={'Add new Department'} open={openModal} close={handleCloseModal} handleCreate={handleCreate} viewMode={viewMode} editMode={editMode} addMode={addMode} >


                {/* <CustomDrawer title={'Add New Team'} open={openModal} close={handleCloseModal} > */}

                <Grid container>


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

            </CustomDrawer>

        </Grid>


    )
}

export default TeamMaster;
