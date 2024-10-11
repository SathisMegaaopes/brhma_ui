import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Autocomplete, Box, Button, Card, Drawer, Grid, List, ListItem, ListItemText, MenuItem, Select, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import URL from '../Global/Utils/url_route';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DateFormater } from '../Global/Utils/common_data';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useSharedContext } from '../../Context';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { useFetchData } from './customHook';

export default function EmployeeTable() {

  const { insertRequest, setInsertRequest, employeeAddTab, setEmployeeAddTab } = useSharedContext();

  const [employeeData, setEmployeedata] = React.useState([]);
  const [data, setData] = React.useState({
    id: 0,
    username: null,
    password: null,
    userrole: null,
    empid: null
  })
  const [drawername, setDrawerName] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [addorUpdate, setaddorUpdate] = React.useState(null)
  const [rerender, serRerender] = React.useState(false)
  const [responseModal, setResponseModal] = React.useState(false)
  const [apiStatus, setApiStatus] = React.useState(null)
  const [showPassword, setShowPassword] = React.useState({});
  const [department, setDepartment] = React.useState('');
  const [departmentList, setDepartmentList] = React.useState([]);

  const [departmentListView, setDepartmentListView] = React.useState(false);


  const url = URL + "employeemaster"


  React.useEffect(() => {
    const response = axios.get(url)
      .then((res) => {
        setEmployeedata(res.data.data)
      })
      .catch((err) => {
        console.log(err, 'This is the error occuring in the frontEnd....')
      })
  }, [rerender])



  const fetchDepartmentUrl = `${URL}employeeonboard/dynamicDepartments`;

  const fetchTeamUrl = `${URL}employeeonboard/dynamicTeams`;

  const fetchDepartment = `${URL}todolist/department`;

  const { data: departData, loading: departDataLoading, error: departDataError } = useFetchData(fetchDepartment);

  // const fetchDepartmentPayload = { value: department }

  // const { data: departmentData, loading: departmentLoading, error: departError } = useFetchData(fetchDepartmentUrl, fetchDepartmentPayload, department);

  // const { data : teamData , loading : teamLoadin}




  React.useEffect(() => {

    if (departData) {

      setDepartmentList(departData?.data)

      // console.log(departData.data, 'Important deudeeeee')

    }


  }, [departData, departmentList])


  const handleChange = (id) => {
    setaddorUpdate(0)
    setDrawerName('Update Credentials')
    const selectedData = employeeData.filter((item) => {
      return item.id === id
    })
    setData({
      'id': selectedData[0].id,
      'username': selectedData[0].user_name,
      'password': selectedData[0].user_pwd,
      'userrole': selectedData[0].user_role,
      'empid': selectedData[0].emp_id,
    })
    setOpen(!open)
  }

  const handleEdit = (id) => {

    setInsertRequest(0);

    setEmployeeAddTab((prev) => ({
      ...prev,
      candidateId: id,
      status: 1
    }));

  }

  const handleValueChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const handleUpdate = () => {

    if (addorUpdate === 0) {

      axios.put(url, data)
        .then((response) => {
          setApiStatus(response?.data?.status === 1 ? 1 : 0)
          setResponseModal(!responseModal)
        })
        .catch((err) => {
          console.log('This is the err in the Frontend', err)
        })
        .finally(() => {
          setData({
            'id': 0,
            'username': null,
            'password': null,
            'userrole': null,
            'empid': null
          })
          serRerender(!rerender)
        })

    } else if (addorUpdate === 1) {
      axios.post(url, data)
        .then((response) => {
          setApiStatus(response?.data?.status === 1 ? 2 : 0)
          setResponseModal(!responseModal)
        })
        .catch((err) => {
          console.log('This is the err in the Frontend', err)
        })
        .finally(() => {
          setData({
            'id': 0,
            'username': null,
            'password': null,
            'userrole': null,
            'empid': null
          })
          serRerender(!rerender)
        })
    }

    setOpen(!open)
  }


  const handleAddUser = () => {
    // setaddorUpdate(1)
    // setDrawerName('Add New User')
    // setOpen(!open)

    setInsertRequest(2);

    setEmployeeAddTab((prev) => ({
      ...prev,
      candidateId: '',
      status: 1
    }));

  }

  const handleClose = () => {
    setOpen(!open)
    setData({
      'id': 0,
      'username': null,
      'password': null,
      'userrole': null,
      'empid': null
    })
  }

  const isFormIncomplete = () => {
    return Object.values(data).some(value => value === '' || value === null);
  };


  const changeintohalf = (password) => {
    const halfLength = Math.ceil(password.length / 2);
    const empty = password.slice(0, halfLength) + '******'
    return empty
  }

  const handleSnackbarClose = () => {
    setResponseModal(!responseModal)
  }


  const togglePasswordVisibility = (index) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };


  // const handleSelectDepartment = (val) => {

  //   console.log(val, 'This is the value ');
  //   setDepartment(val);
  //   setDepartmentListView(false);

  // }


  // const handleAddDepartmentText = (val) => {

  //   setDepartment(val);
  //   setDepartmentListView(true);

  // }

  const mapOptions = (data) => {
    return data.map(item => ({
      label: item.name,
      value: item.name
    }));
  }

  // console.log(mapOptions())

  // console.log(departmentList, 'This is the value of the department')

  return (
    <Grid container spacing={2} sx={{ paddingX: 12, paddingTop: 3 }}>
      <Grid container xs={12} >
        <Grid item xs={4} sx={{ paddingLeft: 2 }}>
          <Typography
            variant='h5'
            component='h1'
          >Employee Details</Typography>
        </Grid>

        <Grid item xs={4}>

          <Autocomplete
            disablePortal
            options={mapOptions(departmentList)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />


          {/*           
          <TextField
            id="standard-basic"
            label="Enter Department"
            variant="standard"
            value={department}
            onChange={(e) => handleAddDepartmentText(e.target.value)}
            // onBlur={checkDepartmentName}
            // onFocus={() => console.log('On Focus.....')}
            fullWidth
          /> */}

          {/* {departmentListView && (

            <Box>

              {departmentLoading && (
                <CircularProgress />
              )}

              {departmentList.length > 0 && (
                <List sx={{ zIndex: 2, position: 'absolute', backgroundColor: 'grey', height: '40vh', overflowY: 'auto', width: '20vw' }}>
                  {departmentList.map((dept, index) => (
                    <ListItem key={index} >
                      <ListItemText onClick={() => handleSelectDepartment(dept.name)} primary={dept.name} />
                    </ListItem>
                  ))}
                </List>
              )}

            </Box>
          )} */}

        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'right' }}>

          <Button
            variant='contained'
            color='primary'
            onClick={handleAddUser}
          >
            Add Employee
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TableContainer component={Paper} variant="outlined" >
          <Table size='small'>
            <TableHead >
              <TableRow>

                <TableCell>Employee Name</TableCell>

                <TableCell>Email Address</TableCell>

                <TableCell>Mobile Number</TableCell>

                <TableCell> Date of Joining  </TableCell>

                <TableCell>Username</TableCell>

                <TableCell>Password</TableCell>

                <TableCell align='center' >View</TableCell>

                <TableCell align='center'>User Role</TableCell>

                <TableCell align='center'>Update</TableCell>

                {/* <TableCell align='center'>Update Employee</TableCell> */}

              </TableRow>
            </TableHead>

            <TableBody>

              {employeeData.length > 0 ? employeeData.map((item, index) => (

                <TableRow key={item.emp_id} style={{ cursor: 'pointer' }}>

                  <TableCell onClick={() => handleEdit(item.employee_number)} >{item.first_name}{item.last_name}</TableCell>

                  <TableCell>{item.email}</TableCell>

                  <TableCell>{item.mobile_number}</TableCell>

                  <TableCell>{DateFormater(item.date_of_join)}</TableCell>

                  <TableCell align='left' style={{ whiteSpace: 'nowrap' }}>{item.user_name}</TableCell>

                  <TableCell align="left" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {showPassword[index] ? item.user_pwd : changeintohalf(item.user_pwd)}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() => togglePasswordVisibility(index)}
                    >
                      {showPassword[index] ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </TableCell>

                  <TableCell align='center' >{item.user_role}</TableCell>

                  <TableCell align='center' >
                    <IconButton color='primary' onClick={() => handleChange(item.id)} sx={{ padding: 0.5 }} >
                      <EditNoteRoundedIcon
                        sx={{ fontSize: '32px' }}
                      />
                    </IconButton>
                  </TableCell>


                  {/* <TableCell align='center' >
                    <IconButton color='primary'
                      //  onClick={() => handleEdit(item.employee_number)}
                      sx={{ padding: 0.5 }} >
                      <ModeEditOutlineIcon
                        sx={{ fontSize: '32px' }}
                      />
                    </IconButton>
                  </TableCell> */}



                </TableRow>
              ))

                :
                <>
                  <ErrorOutlineIcon />
                </>


              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid >

      <DrawerComponent open={open} name={drawername} data={data} handleValueChange={handleValueChange} setOpen={setOpen} handleUpdate={handleUpdate} addorUpdate={addorUpdate} isFormIncomplete={isFormIncomplete} handleClose={handleClose} />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={responseModal}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <Alert

          onClose={handleSnackbarClose}
          severity={apiStatus === 1 || apiStatus === 2 ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {apiStatus === 1 ? 'Password updated Successfully' : apiStatus === 2 ? ' User Created Successfully ' : 'Something went wrong !'}
        </Alert>
      </Snackbar>

    </Grid >

  );
}


function DrawerComponent({ open, name, data, handleValueChange, handleUpdate, addorUpdate, isFormIncomplete, handleClose }) {

  return (
    <Drawer
      anchor="right"
      open={open}
      sx={{
        width: 500, flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 500,
          p: 5,
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          backgroundImage: ' linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);'
        }}
        role="presentation"
      >
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', paddingTop: 3 }}>
          {name}
        </Typography>
        <Box >

          {addorUpdate === 1 &&
            <>
              <Typography variant="h6" sx={{ textAlign: 'left' }}>
                Employee ID
              </Typography>
              <TextField
                fullWidth
                label={<span>Employee ID <span style={{ color: 'red' }}> *</span></span>}
                name="empid"
                value={data.empid}
                onChange={handleValueChange}
                margin="normal"
              />
            </>}

          {addorUpdate === 1 &&

            <>
              <Typography variant="h6" sx={{ textAlign: 'left' }}>
                User Name
              </Typography>
              <TextField
                fullWidth
                label={<span>User Name<span style={{ color: 'red' }}> *</span></span>}
                name="username"
                value={data.username}
                onChange={handleValueChange}
                margin="normal"
              />
            </>
          }

          <>
            <Typography variant="h6" sx={{ textAlign: 'left' }}>
              Password
            </Typography>
            <TextField
              fullWidth
              label={<span>Password<span style={{ color: 'red' }}> *</span></span>}
              name="password"
              value={data.password}
              onChange={handleValueChange}
              margin="normal"
            />
          </>

          {addorUpdate === 1 &&
            <>
              <Typography variant="h6" sx={{ textAlign: 'left' }}>
                <span>User Role<span style={{ color: 'red' }}> *</span></span>
              </Typography>

              <Select
                fullWidth
                name="userrole"
                value={data.userrole}
                onChange={handleValueChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </>

          }

        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color='error'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="outlined" color='success' onClick={handleUpdate} disabled={isFormIncomplete()} >
            {addorUpdate === 0 ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Drawer >
  )
}