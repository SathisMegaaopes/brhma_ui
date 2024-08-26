import * as React from 'react';
import { Container, Grid, Button, TextField, Typography } from "@mui/material";


function EduDetails(props) {

    // console.log(props,'educationDetails')

    const [sslc_year, setSslcYear] = React.useState(props.data.sslc_year);
    const [sslc_university, setSslcUniversity] = React.useState(props.data.sslc_university);
    const [puc_year, setPucYear] = React.useState(props.data.puc_year);
    const [puc_university, setPucuniversity] = React.useState(props.data.puc_university);
    const [ug_year, setUgYear] = React.useState(props.data.ug_year);
    const [ug_university, setUguniversity] = React.useState(props.data.ug_university);
    const [pg_year, setPgYear] = React.useState(props.data.pg_year);
    const [pg_university, setPgUniversity] = React.useState(props.data.pg_university);

    const [errors, setErrors] = React.useState({
        sslc: false,
        puc: false
    })


    const [disableNext, setdisableNext] = React.useState(true);


    const handleNext = () => {

        let edudetails = {
            sslc_year: sslc_year, sslc_university: sslc_university,
            puc_year: puc_year, puc_university: puc_university,
            ug_year: ug_year, ug_university: ug_university,
            pg_year: pg_year, pg_university: pg_university
        };

        props.handleEdu(edudetails);
        // props.handleNext();
    }

    React.useEffect(() => {
        if (sslc_year === "" || sslc_university === "" || puc_year === "" || puc_university === "") {
            setdisableNext(true);
        }
        else {
            setdisableNext(false);
        }

    }, [sslc_year, sslc_university, puc_year, puc_university]);


    const handlesslcYear = (e) => {
        const sslc = e.target.value;
        if (sslc.length > 4) {
            setErrors((prev) => ({
                ...prev,
                sslc: true
            }))
        } else {
            setErrors((prev) => ({
                ...prev,
                sslc: false
            }))
            setSslcYear(sslc)
        }
    }

    const handlePucYear = (e) => {
        const puc = e.target.value;
        if (puc.length > 4) {
            setErrors((prev) => ({
                ...prev,
                puc: true
            }))
        } else {
            setPucYear(puc)
            setErrors((prev) => ({
                ...prev,
                puc: false
            }))
        }
    }

    const handlesslcUniversity = (event) => {
        const inputValue = event.target.value;
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setSslcUniversity(inputValue);
        }
    };

    const handlepucUniversity = (event) => {
        const inputValue = event.target.value;
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setPucuniversity(inputValue);
        }
    };


    const handleBalanceInput = (e) => {
        const { name, value } = e.target;

        let checkingValue = value;

        if (name === 'UGYEAR' || name === 'PGYEAR') {
            checkingValue = value.replace(/[^0-9]/g, '');
        } else if (name === 'UGU' || name === 'PGU') {
            checkingValue = value.replace(/[^a-zA-Z\s]/g, '')
        }

        switch (name) {
            case 'UGYEAR':
                setUgYear(checkingValue);
                break;
            case 'UGU':
                setUguniversity(checkingValue);
                break;
            case 'PGYEAR':
                setPgYear(checkingValue);
                break;
            case 'PGU':
                setPgUniversity(checkingValue);
                break;
        }
    }

    // console.log(errors)

    return (
        <Container >
            <Grid container spacing={2} >

                <Grid item xs={12} sm={12} md={2} >
                    <Typography variant='body1'>
                        SSLC / 10th Std.
                    </Typography>
                </Grid>


                {/* sslcYear */}
                <Grid item xs={4} sm={4} md={3} >
                    <TextField fullWidth
                        id="Year of Passing"
                        label="Year Of Passing"
                        variant="outlined"
                        size="small"
                        value={sslc_year}
                        type='number'
                        onChange={handlesslcYear}
                        error={sslc_year === "" ? true : false}
                        required

                    // inputProps={{ maxLength: 4 }}                //old code
                    // onChange={e => setSslcYear(e.target.value)}

                    />
                </Grid>

                {/* sslc University name */}
                <Grid item xs={8} sm={8} md={7} >
                    <TextField fullWidth
                        id="university"
                        label="University"
                        variant="outlined"
                        size="small"
                        required
                        value={sslc_university}
                        type='text'
                        onChange={handlesslcUniversity}
                        inputProps={{ pattern: "[a-zA-Z]*" }}
                        error={sslc_university === "" ? true : false}
                    // onKeyPress={handleKeyPress}               //old code
                    // inputProps={{ maxLength: 4 }}
                    // onChange={e => setSslcUniversity(e.target.value)}
                    />
                </Grid>



                <Grid item xs={12} sm={12} md={2} >
                    <Typography variant='body1'>
                        II PUC / 12th Std.
                    </Typography>
                </Grid>

                {/* pucYear */}
                <Grid item xs={4} sm={4} md={3} >
                    <TextField fullWidth
                        id="yop_pu"
                        // name = ""
                        label="Year Of Passing"
                        variant="outlined"
                        size="small"
                        required
                        type='number'
                        value={puc_year}
                        inputProps={{ maxLength: 4 }}
                        // onChange={e => setPucYear(e.target.value)}   //old code 
                        onChange={handlePucYear}
                        error={puc_year === "" ? true : false} />
                </Grid>

                {/* puc university name */}
                <Grid item xs={8} sm={8} md={7} >
                    <TextField
                        fullWidth
                        id="university_pu"
                        label="University"
                        variant="outlined"
                        size="small"
                        required
                        value={puc_university}
                        onChange={handlepucUniversity}
                        error={puc_university === "" ? true : false}
                    // onChange={e => setPucuniversity(e.target.value)}  // old code 
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={2} >
                    <Typography variant='body1'>
                        Graduation
                    </Typography>
                </Grid>

                {/* GraduationYear */}
                <Grid item xs={4} sm={4} md={3} >
                    <TextField
                        fullWidth
                        name="UGYEAR"
                        id="yop_grad"
                        label="Year Of Passing"
                        variant="outlined"
                        type='number'
                        size="small"
                        value={ug_year}
                        onChange={handleBalanceInput}
                        // onChange={e => setUgYear(e.target.value)}
                         />
                </Grid>

                {/* Graduation University */}
                <Grid item xs={8} sm={8} md={7} >
                    <TextField
                        fullWidth
                        name="UGU"
                        id="university_grad"
                        label="University"
                        variant="outlined"
                        size="small"
                        value={ug_university}
                        onChange={handleBalanceInput}
                        // onChange={e => setUguniversity(e.target.value)} 
                        />
                </Grid>

                <Grid item xs={12} sm={12} md={2} >
                    <Typography variant='body1'>
                        Post Graduation
                    </Typography>
                </Grid>

                {/* Post Graduation Year */}
                <Grid item xs={4} sm={4} md={3} >
                    <TextField
                        fullWidth
                        name = "PGYEAR"
                        id="yop_pg"
                        label="Year Of Passing"
                        variant="outlined"
                        size="small"
                        type='number'
                        value={pg_year}
                        onChange={handleBalanceInput}
                        // onChange={e => setPgYear(e.target.value)}
                        />
                </Grid>

                {/* Post Graduation University */}
                <Grid item xs={8} sm={8} md={7} >
                    <TextField
                        fullWidth
                        name = "PGU"
                        id="university_pg"
                        label="University"
                        variant="outlined"
                        size="small"
                        value={pg_university}
                        onChange={handleBalanceInput}
                        // onChange={e => setPgUniversity(e.target.value)} 
                        />
                </Grid>




                {/* <Grid item xs={6} sm={6} md={6}>
          
                <Button variant='contained' color='primary' disableElevation fullWidth onClick={props.handlePrev}>
                    Previous 
                </Button> 
            </Grid> */}



                <Grid item xs={12} sm={12} md={12}>
                    <Button variant='contained' color='success'
                        disableElevation fullWidth onClick={handleNext} disabled={disableNext} >
                        NEXT
                    </Button>
                </Grid>

            </Grid>

        </Container>
    )
}

export default EduDetails;