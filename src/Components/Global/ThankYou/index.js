import * as React from 'react';
import {Container,Grid,Button,TextField, Typography,styled} from "@mui/material";

import {Link} from "react-router-dom"
import logo from "../../../images/logo_1.png"



function ThankYou(){

    const JourneyButton = styled(Button)({
        background:"#ECE6DB",
        color:"black",
        '&:hover':{
            background:"#CDCDCD",
        }
    })

    const handleClose = () =>{
        sessionStorage.removeItem("candidate_id");
    }
    
    return(
       
            <Grid container sx={{background:"#272727", height:"100vh"}}>
                <Grid items xs={12} sm={12} md={12} sx={{textAlign:"center",height:"100vh",marginTop:"10%"}}>
                    <img src={logo} width={"200px"} height={"200px"}/>
                    <Typography variant='h4' sx={{color:"white"}}>
                        Awesome! Let's Begin!!
                    </Typography>
                    <Typography variant='h5' sx={{color:"white"}}>
                        Please make a note of your candidate id : {sessionStorage.getItem("candidate_id")}
                    </Typography>
                    <Link to={"/"}>
                    <JourneyButton variant='contained' 
                    disableElevation color='primary'
                    onClick={handleClose}
                    sx={{marginTop:'20px'}}>Back To Home</JourneyButton>
                    </Link>
                    
                </Grid>
            </Grid>
         
    )
}


export default ThankYou;