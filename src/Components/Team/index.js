import { Grid, IconButton, InputAdornment, InputBase, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const TeamMaster = () => {
    return (

        // height: 'calc(86vh - 1px)' //Important da Sathis uh , itha use panni than , height ah crct ah define panna mudiyum da , so ne patuku delete panniratha da sathis uhhhh
        <Grid container sx={{ width: '100%', paddingLeft: 6, paddingTop: 3 }}>

            <Grid container xs={12} sx={{backgroundColor:'' }}>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' ,}}>
                    <Paper
                        variant='outlined'
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 , height:40  , outline:'1px solid'}}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <SearchIcon  sx={{ color:'black'}}/>
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color:'black' }}
                            placeholder="Search Team Names"
                            inputProps={{ 'aria-label': 'search team names' }}
                        />
                    </Paper>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ paddingTop:2 }}>
                hi mapla
            </Grid>

        </Grid>


    )
}

export default TeamMaster;
