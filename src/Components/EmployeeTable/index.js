import EmployeeTable from './employeelogin'
import * as React from 'react';
import { Card, Grid, CardContent, Typography, Tab, Tabs, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EmployeeForm from './employeeForm';


function CardComponent({ name, onClick, isActive, value }) {
  return (
    <Card
      onClick={onClick}
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'center',
        width: 200,
        padding: 1,
        borderRadius: 2,
        textAlign: 'center',
        background: isActive ? '#F6F4EB' : 'inherit',
        transition: 'background 0.3s ease',
        '&:hover': {
          filter: isActive ? 'none' : 'blur(1px)',
        }
      }}
    >
      {value === 1 && <PersonAddIcon sx={{ fontSize: 40, mb: 2 }} />}
      {value === 2 && <ManageAccountsIcon sx={{ fontSize: 40, mb: 2 }} />}
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h6" sx={{ padding: 0, lineHeight: 0 }}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Employee() {

  // const [activeButton, setActiveButton] = React.useState(1);

  // const handleButtonClick = (value) => {
  //   setActiveButton(value);
  // };

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


