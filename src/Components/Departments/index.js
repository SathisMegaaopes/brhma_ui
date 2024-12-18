import {
  Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, Grid, IconButton, InputBase,
  Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomDrawer from '../CustomComponents/drawer';
import DatanotFound from '../CustomComponents/datanotfound';
import { useFetchData } from '../EmployeeTable/customHook';
import URL from '../Global/Utils/url_route';
import axios from 'axios'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import debounce from 'lodash.debounce'
import DeleteIcon from '@mui/icons-material/Delete';


const DeparmentMaster = () => {

  const [openModal, setOpenModal] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [departmentName, setDepartmentName] = useState(null);
  const [parentDepartment, setParentDepartment] = useState(null);
  const [departmentDesc, setDepartmentDesc] = useState(null);
  const [leadeName, setLeadName] = useState(null);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [editmodeID, setEditModeId] = useState(null);
  const [reload, setReload] = useState(false);
  const [debounceSearch, setDebounceSearch] = useState(searchData);
  const [deletemodal, setDeletemodal] = useState(false);
  const [deletingId, setDeletingID] = useState(null);


  const handleOpenModal = () => {
    setAddMode(true)
    setOpenModal(true);
  }

  const handleCloseModal = () => {

    setOpenModal(false);
    setDepartmentName(null);
    setParentDepartment(null);
    setLeadName(null);
    setDepartmentDesc(null);

    setViewMode(false);
    setEditMode(false);
    setAddMode(false);



  }


  //mode === 1 => Edit , mode === 0 => View

  const handleUpdateData = async (id, mode) => {

    let url = `${URL}department/${id}`

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
          setDepartmentName(null);
          setParentDepartment(null);
          setLeadName(null);
          setDepartmentDesc(null);


        }
        setDepartmentName(response?.data?.data[0]?.name);
        setParentDepartment(response?.data?.data[0]?.parent_department);
        setLeadName(response?.data?.data[0]?.lead_name);
        setDepartmentDesc(response?.data?.data[0]?.description)

      } else {
        setShowSnackbar(true);
        setSnackbarMessage(0);
      }

    } catch (error) {
      setShowSnackbar(true);
      setSnackbarMessage(0);
    }

  }


  const hanldeDeleteDepartment = async (id) => {

    let url = `${URL}department/delete`;


    try {

      const response = await axios.post(url, { "id": id });

      if (response?.data?.status === 1) {

        setReload(!reload)
        setDeletemodal(false)
        setDeletingID(null);

      } else {

        console.log('Something wrong in the API')

      }

    } catch (error) {

      console.error('Something went wrong in executing function' + error);
      setDeletingID(null);

    }

  }


  const handleCreate = async (mode) => {

    let url = `${URL}department`;

    const apiPostData = {
      "departmentName": departmentName,
      "parentDepartment": parentDepartment,
      "leadeName": leadeName,
      "mode": mode,
      "editmodeID": editmodeID,
      "description": departmentDesc
    }

    try {

      const response = await axios.post(url, apiPostData)

      if (response?.data?.status === 1) {

        setDepartmentName(null);
        setParentDepartment(null);
        setLeadName(null);
        setDepartmentDesc(null);
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

  const departmentUrl = `${URL}department`;
  const employeeUrl = `${URL}todolist/employee`;
  const companyUrl = `${URL}company`


  const debouncedSearchData = debounce((value) => {
    setDebounceSearch(value)
  }, 500)


  const { data: departmentData, loading: departmentLoading, error: departmentError } = useFetchData(departmentUrl,
    { searchData: debounceSearch }, debounceSearch, reload);

  const { data: employeeData, loading: employeeLoading, error: employeeError } = useFetchData(employeeUrl);

  const { data: companyData, loading: companyLoading, error: companyError } = useFetchData(companyUrl);


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



  return (
    <Grid container sx={{ width: '100%', paddingLeft: 6, paddingTop: 3 }}>

      <Dialog
        open={deletemodal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this candidate
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDeletemodal(false);
            setDeletingID(null);
          }}>Disagree</Button>

          <Button onClick={() => hanldeDeleteDepartment(deletingId)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container xs={12} sx={{ backgroundColor: '', paddingRight: 4 }}>

        <Grid item xs={3}>
          <Typography
            variant='h5'
            component='h1'
          >Department Details</Typography>
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
              placeholder="Search Department Names"
              inputProps={{ 'aria-label': 'Search Department Names' }}
              onChange={(e) => {
                debouncedSearchData(e.target.value);
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={2} sx={{ backgroundColor: '', textAlign: 'right' }}>
          <Button variant='outlined' onClick={handleOpenModal}>
            Add Department
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ paddingTop: 2, paddingRight: 4 }} >


        {departmentLoading && (

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


        {departmentError && (

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


        {!departmentLoading && (

          departmentData?.data?.length > 0 ? (

            <TableContainer component={Paper} variant="outlined" >

              <Table size='small'>
                <TableHead sx={{ height: 50 }}>
                  <TableRow>

                    <TableCell sx={{ fontSize: 18 }}> Department Name</TableCell>

                    <TableCell sx={{ fontSize: 18 }}> Description </TableCell>

                    <TableCell sx={{ fontSize: 18 }}>Manager</TableCell>

                    <TableCell sx={{ textAlign: 'center', fontSize: 18 }}>Actions</TableCell>

                  </TableRow>
                </TableHead>

                <TableBody >

                  {departmentData?.data?.map((item, index) => (

                    <TableRow key={item.id}

                      style={{ cursor: 'pointer' }} >

                      <TableCell sx={{ padding: 2 }}>

                        <Typography sx={{ fontWeight: 400, fontSize: 20 }} onClick={() => {
                          handleUpdateData(item.id, 0)
                        }}>
                          {item.name} Department
                        </Typography>


                        <Typography sx={{ color: 'gray' }}>
                          {item.parent_department}
                        </Typography>

                      </TableCell>

                      <TableCell>

                        <Typography sx={{ fontWeight: 400 }}>
                          {item.description}
                        </Typography>

                      </TableCell>

                      <TableCell>

                        <Typography sx={{ fontWeight: 400 }}>
                          {item.lead_name}
                        </Typography>

                      </TableCell>

                      <TableCell sx={{ textAlign: 'center' }} >

                        <Button onClick={
                          () => {
                            handleUpdateData(item.id, 1);
                          }}

                        >
                          <ModeEditIcon />
                        </Button>

                        <Button onClick={
                          () => {
                            setDeletingID(item.id);
                            setDeletemodal(true)
                          }}
                          color='error'
                        >
                          <DeleteIcon />
                        </Button>

                      </TableCell>


                    </TableRow>

                  ))}

                </TableBody>


              </Table>

            </TableContainer>

          )
            :
            (
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
          {snackbarMessage === 1 ? ' Successfully Completed ' : 'Something went Wrong !'}
        </Alert>
      </Snackbar>

      <CustomDrawer title={'Add new Department'} editTitle={'Update Department Details'} open={openModal} close={handleCloseModal} handleCreate={handleCreate} viewMode={viewMode} editMode={editMode} addMode={addMode} >


        {viewMode && (

          <Grid container>

            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, mt: 3 }}>
              <Grid item xs={4}>
                <Typography>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={8}>

                <Typography variant='h6'>
                  {departmentName}
                </Typography>

              </Grid>
            </Grid>

            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <Grid item xs={4}>
                <Typography>
                  Organisation
                </Typography>
              </Grid>
              <Grid item xs={8}>

                <Typography variant='h6'>
                  {parentDepartment}
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
                  {leadeName}
                </Typography>

              </Grid>
            </Grid>


            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <Grid item xs={4}>
                <Typography>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={8}>

                <Typography variant='h6'>
                  {departmentDesc}
                </Typography>

              </Grid>
            </Grid>


          </Grid>

        )}

        {addMode || editMode ? (

          <Grid container>

            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, mt: 3 }}>
              <Grid item xs={4}>
                <Typography>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={departmentName || ''}
                  onChange={(e) => setDepartmentName(e.target.value)}
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
                  Organisation
                </Typography>
              </Grid>
              <Grid item xs={8}>

                <Autocomplete
                  disablePortal
                  value={parentDepartment}
                  options={mapOptions(companyData?.data)}
                  onChange={(e, value) => setParentDepartment(value.value)}
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
                  onChange={(e, value) => setLeadName(value.value)}
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

            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Grid item xs={4}>
                <Typography>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={departmentDesc || ''}
                  variant="outlined"
                  onChange={(e) => setDepartmentDesc(e.target.value)}
                  multiline
                  rows={3}
                  sx={{
                    mb: 2,
                    '& .MuiInputBase-root': {
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


      </CustomDrawer >

    </Grid>
  )
}

export default DeparmentMaster

