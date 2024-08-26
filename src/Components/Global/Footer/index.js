import * as React from 'react';
import {Grid,Typography} from "@mui/material";


function MOSFooter(){
    return(
<Grid container>
        <Grid item xs={12} sm={12} md={12} sx={{textAlign:"center",marginTop:"12px",bottom:"0"}}>
                <Typography variant='body2'>
                Copyright @ MegaaOpes
                    </Typography>
        </Grid>
</Grid>
    )
}


export default MOSFooter;