import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import logo1 from "../../images/logo_1.png";
import Sidebar from './SidebarNavigation';
import URL from '../Global/Utils/url_route';
import axios from 'axios'

export default function MOSNavigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useNavigate();
  const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

  let url = URL + "login/validateUser";

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {

      let request = { "user_name": userinfo.user_name , "user_pwd" : userinfo.user_pwd ,"type" : "logout" };

      const response = await axios.post(url,request)
      if (response.data.status === 1) {
        sessionStorage.clear();
        localStorage.clear();
        history("/");
      }
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <Box >
      <AppBar position="fixed" sx={{ background: "#749BC2", boxShadow:'none' ,  zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => { history("/dashboard") }}
          >
            <img src={logo1} alt='brmha' width={"35px"} height={"35px"} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Megaaopes Solutions
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{ paddingTop: '60px' }}
      >
        <Sidebar />
      </Box>
    </Box>
  );
}

