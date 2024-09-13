import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Box, Button, Drawer, Grid, MenuItem, Select, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import URL from '../Global/Utils/url_route';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import IconButton from '@mui/material/IconButton';


export default function EmployeeTable() {

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
  const [responseModal , setResponseModal ] = React.useState(false)
  const [apiStatus , setApiStatus ] = React.useState(null)


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
          setApiStatus(response?.data?.status === 1 ? 1 : 0 )
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
    setaddorUpdate(1)
    setDrawerName('Add New User')
    setOpen(!open)
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


  return (
    <Grid container spacing={2} sx={{ paddingX: 12, paddingTop: 3 }}>
      <Grid container xs={12} >
        <Grid item xs={6} sx={{ paddingLeft: 2 }}>
          <Typography
            variant='h5'
            component='h1'
          >Employee Details</Typography>
        </Grid>
        {/* <Grid item xs={6} sx={{ textAlign: 'right' }}>

          <Button
            variant='contained'
            color='primary'
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Grid> */}
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{padding:2}}>
          <Table size='small'>
            <TableHead >
              <TableRow>
                <TableCell>Employee ID </TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell align='center'>User Role</TableCell>
                <TableCell align='center'>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((item) => (
                <TableRow >
                  <TableCell align='left'>{item.emp_id}</TableCell>
                  <TableCell align='left'>{item.user_name}</TableCell>

                  <TableCell align="left">
                    <Tooltip
                      TransitionProps={{ timeout: 600 }}
                      arrow
                      placement="top"
                      title={<span style={{ fontSize: '17px' }}>{item.user_pwd}</span>}
                    >
                      {changeintohalf(item.user_pwd)}
                    </Tooltip>
                  </TableCell>


                  <TableCell align='center' >{item.user_role}</TableCell>
                  <TableCell align='center' >
                    <IconButton color='primary' onClick={() => handleChange(item.id)} sx={{ padding: 0.5 }} >
                      <EditNoteRoundedIcon
                        sx={{ fontSize: '32px' }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <DrawerComponent open={open} name={drawername} data={data} handleValueChange={handleValueChange} setOpen={setOpen} handleUpdate={handleUpdate} addorUpdate={addorUpdate} isFormIncomplete={isFormIncomplete} handleClose={handleClose} />

      <Snackbar  
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={responseModal} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}>
        <Alert
         
          onClose={handleSnackbarClose}
          severity= {apiStatus === 1  || apiStatus === 2 ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
        {apiStatus === 1 ? 'Password updated Successfully' : apiStatus === 2 ? ' User Created Successfully ' : 'Something went wrong !' }
        </Alert>
      </Snackbar>

    </Grid>

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