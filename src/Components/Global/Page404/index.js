import * as React from 'react';
import {Container,Grid,Button,TextField, Typography} from "@mui/material";

import {Link} from "react-router-dom"

function Page404(){
    return(
        <Container>
            <Grid container>
                <Grid items xs={12} sm={12} md={12} sx={{textAlign:"center",height:"100vh",marginTop:"20%"}}>
                    <Typography variant='h4' >
                        OOPS!!! You have landed on a wrong url!!!
                    </Typography>
                    <Link to={"/"}>
                    <Button variant='contained' 
                    disableElevation color='primary'
                    sx={{marginTop:'20px'}}>Back To Home</Button>
                    </Link>
                    
                </Grid>
            </Grid>
         </Container>   
    )
}


export default Page404;