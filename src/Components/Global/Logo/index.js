import * as React from 'react';
import logo from "../../../images/logo.png"
import logo1 from "../../../images/logo_1.png";
import logo2 from "../../../images/logo_2.png";
import logo3 from "../../../images/logo_3.png";
import {Grid} from "@mui/material";


function MOSLogo(){
    return (
<Grid container>
<Grid item xs={6} sm={6} md={6} sx={{textAlign:"left"}}>
        <img src={logo3} width="60px" height="60px"/>
      </Grid>
    <Grid item xs={6} sm={6} md={6} sx={{textAlign:"right",marginTop:"8px"}}>
        <img src={logo} width="129px" height="35px"/>
      </Grid>
      
      </Grid>
    )
}


export default MOSLogo;