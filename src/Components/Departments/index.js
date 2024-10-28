import { Autocomplete, Avatar, Box, Button, CircularProgress, Divider, Drawer, FormControl, Grid, IconButton, InputAdornment, InputBase, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
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

const DeparmentMaster = () => {

  const [openModal, setOpenModal] = useState(false);
  const [searchData, setSearchData] = useState(null)

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }


  const departmentUrl = `${URL}department`;

  const { data: departmentData, loading: departmentLoading, error: departmentError } = useFetchData(departmentUrl,
    { searchData: searchData }, searchData
  );


  return (
    <Grid container sx={{ width: '100%', paddingLeft: 6, paddingTop: 3 }}>

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
                setSearchData(e.target.value)
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
                Something went wrong dude eh ....
              </Grid>

            </Grid>

          </Box>
        )}

        {departmentData?.data?.length > 0 && !departmentLoading ?

          <TableContainer component={Paper} variant="outlined" >

            <Table size='small'>
              <TableHead sx={{ height: 50 }}>
                <TableRow>

                  <TableCell sx={{ fontSize: 18 }}> Department Name</TableCell>

                  <TableCell sx={{ fontSize: 18 }}>Lead Name</TableCell>

                </TableRow>
              </TableHead>

              <TableBody >

                {departmentData?.data?.map((item, index) => (

                  <TableRow key={item.id} style={{ cursor: 'pointer' }} >

                    <TableCell sx={{ padding: 2 }}>

                      <Typography sx={{ fontWeight: 400, fontSize: 20 }}>
                        {item.name}
                      </Typography>


                      <Typography sx={{ color: 'gray' }}>
                        {item.parent_department}
                      </Typography>

                    </TableCell>

                    <TableCell>

                      <Typography sx={{ fontWeight: 400 }}>
                        {item.lead_name}
                      </Typography>


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


      <CustomDrawer title={'Add new Department'} open={openModal} close={handleCloseModal}>

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
                label="Enter Department Name"
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
                Parent Department
              </Typography>
            </Grid>
            <Grid item xs={8}>

              <Autocomplete
                disablePortal
                value={'MegaaOpes Solutions Private Limited'}
                options={{ label: 'MegaaOpes Solutions Private Limited', value: 'MegaaOpes Solutions Private Limited  ' }}
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

          <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <Grid item xs={4}>
              <Typography>
                Lead Name
              </Typography>
            </Grid>
            <Grid item xs={8}>

              <Autocomplete
                disablePortal
                value={'Kannan R'}
                options={{ label: 'Kannan R', value: 'Kannan R  ' }}
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

export default DeparmentMaster
