import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const DatanotFound = () => {
    return (
        // <>
        <Grid container spacing={2} sx={{ paddingX: 0, paddingTop: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }} width='100%'>
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
                    <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <DotLottieReact
                            src="/nodatafound.json"
                            loop
                            autoplay
                        />
                        <Typography variant='h5' sx={{ mt: '25px', ml: 5 }}>Sorry , There is no data available ....  </Typography>

                    </Grid>

                </Grid>

            </Box>
        </Grid >
        // </>
    )
}

export default DatanotFound
