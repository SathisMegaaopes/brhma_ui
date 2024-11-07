import * as React from 'react';
import { Container, Grid, Button, TextField, Typography } from "@mui/material";



function ReferDetails(props) {

    const [name1, setName1] = React.useState(props.data.name1);
    const [mobile1, setMobile1] = React.useState(props.data.mobile1);

    const [name2, setName2] = React.useState(props.data.name2);
    const [mobile2, setMobile2] = React.useState(props.data.mobile2);

    const [name3, setName3] = React.useState(props.data.name3);
    const [mobile3, setMobile3] = React.useState(props.data.mobile3);

    const [name4, setName4] = React.useState(props.data.name4);
    const [mobile4, setMobile4] = React.useState(props.data.mobile4);

    const handleClick = () => {
        let referData = {
            name1: name1, mobile1: mobile1, name2: name2,
            mobile2: mobile2, name3: name3, mobile3: mobile3, name4: name4, mobile4: mobile4
        }
        props.handleRefer(referData);
    }

    return (
        <Container>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={3} md={3}>
                    <Typography>
                        Referrence 1
                    </Typography>
                </Grid>
                
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Name" variant='outlined'
                        size='small' fullWidth
                        value={name1}
                        onChange={e => setName1(e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Mobile" variant='outlined'
                        size='small' fullWidth
                        value={mobile1}
                        onChange={e => setMobile1(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Typography>
                        Referrence 2
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Name" variant='outlined'
                        size='small' fullWidth
                        value={name2}
                        onChange={e => setName2(e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Mobile" variant='outlined'
                        size='small' fullWidth
                        value={mobile2}
                        onChange={e => setMobile2(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Typography>
                        Referrence 3
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Name" variant='outlined'
                        size='small' fullWidth
                        value={name3}
                        onChange={e => setName3(e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Mobile" variant='outlined'
                        size='small' fullWidth
                        value={mobile3}
                        onChange={e => setMobile3(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Typography>
                        Referrence 4
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Name" variant='outlined'
                        size='small' fullWidth
                        value={name4}
                        onChange={e => setName4(e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <TextField label="Mobile" variant='outlined'
                        size='small' fullWidth
                        value={mobile4}
                        onChange={e => setMobile4(e.target.value)} />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Button variant='contained' color='success'
                        disableElevation fullWidth onClick={handleClick}>
                        SUBMIT
                    </Button>
                </Grid>
            </Grid>


        </Container>
    )
}

export default ReferDetails;