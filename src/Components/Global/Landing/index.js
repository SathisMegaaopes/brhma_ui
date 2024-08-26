import * as React from 'react';

import logo1 from "../../../images/logo_1.png";
import {Grid,Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom"


const JourneyButton = styled(Button)({
    background:"#ECE6DB",
    color:"black",
    '&:hover':{
        background:"#CDCDCD",
    }
})
function Landing(){

    
    return(
        <Grid container sx={{background:"#272727", height:"100vh"}}>
            <Grid item xs={12} sm={12} md={12} sx={{height:"30%"}}>
                <img src={logo1} alt='brmha' width={"300px"} height={"300px"} style={{display:"block", marginLeft:"auto", marginRight:"auto",marginTop:"10%"}}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{textAlign:"center"}}>
                <Link to={"/candidate"}>
                <JourneyButton variant='contained'  disableElevation disableFocusRipple>
                    Candidate registration</JourneyButton>
                </Link>
                <Link to={"/login"} >
                <JourneyButton variant='contained'  disableElevation disableFocusRipple 
                sx={{marginLeft:"8px",paddingLeft:"50px",paddingRight:"50px"}}>
                    {" "}Employee Login{" "}</JourneyButton>
                </Link>
            </Grid>
           
        </Grid>
    )
}


export default Landing