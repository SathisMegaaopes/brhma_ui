import EmployeeTable from './employeelogin'
import * as React from 'react';
import { Grid } from '@mui/material';


export default function Employee() {

  return (
    <>
      <Grid container paddingLeft={6} paddingY={2}>
        <Grid item xs={12}>
          <EmployeeTable />
        </Grid>
      </Grid>
    </>
  );
}


