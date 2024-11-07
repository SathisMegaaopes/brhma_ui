import * as React from 'react';
import { Container, Grid, Button, TextField, Typography } from "@mui/material";



function PersonalDetails(props) {


    const [fatherName, setFname] = React.useState(props.data.fatherName);
    const [fatherAge, setFAge] = React.useState(props.data.fatherAge);
    const [fatherOccu, setFOccu] = React.useState(props.data.fatherOccu);
    const [fatherMob, setFMob] = React.useState(props.data.fatherMob);

    const [motherName, setMname] = React.useState(props.data.motherName);
    const [motherAge, setMAge] = React.useState(props.data.motherAge);
    const [motherOccu, setMOccu] = React.useState(props.data.motherOccu);
    const [motherMob, setMMob] = React.useState(props.data.motherMob);

    const [guardName, setGname] = React.useState(props.data.guardName);
    const [guardAge, setGAge] = React.useState(props.data.guardAge);
    const [guardOccu, setGOccu] = React.useState(props.data.guardOccu);
    const [guardMob, setGMob] = React.useState(props.data.guardMob);



    const handleClick = () => {
        let personalData = {
            fatherName: fatherName, fatherAge: fatherAge,
            fatherOccu: fatherOccu, fatherMob: fatherMob,
            motherName: motherName, motherAge: motherAge, motherOccu: motherOccu, motherMob: motherMob,
            guardName: guardName, guardAge: guardAge, guardOccu: guardOccu, guardMob: guardMob
        };

        props.handlePersonal(personalData);

    }


    const handleInputs = (e) => {

        const { name, value } = e.target;

        let checkedValue = value;

        if (name === 'fathername' || name === 'mothername' || name === 'gaurdianname' || name === 'fatheroccupation' || name === 'motheroccupation' || name === 'gaurdianoccupation') {

            checkedValue = value.replace(/[^a-zA-Z\s]/g, '')


        } else if (name === 'fatherage' || name === 'motherage' || name === 'gaurdianage' || name === 'fathermobile' || name === 'mothermobile' || name === 'gaurdianmobile') {

            checkedValue = value.replace(/[^0-9]/g, '');
        }

        switch (name) {
            case 'fathername':
                setFname(checkedValue);
                break;
            case 'mothername':
                setMname(checkedValue);
                break;
            case 'gaurdianname':
                setGname(checkedValue);
                break;
            case 'fatheroccupation':
                setFOccu(checkedValue);
                break;
            case 'motheroccupation':
                setMOccu(checkedValue);
                break;
            case 'gaurdianoccupation':
                setGOccu(checkedValue);
                break;
            case 'fatherage':
                setFAge(checkedValue);
                break;
            case 'motherage':
                setMAge(checkedValue);
                break;
            case 'gaurdianage':
                setGAge(checkedValue);
                break;
            case 'fathermobile':
                setFMob(checkedValue);
                break;
            case 'mothermobile':
                setMMob(checkedValue);
                break;
            case 'gaurdianmobile':
                setGMob(checkedValue);
                break;
        }
    }


    return (
        <Container >
            <Grid container spacing={2} >

                {/* Father Name */}
                <Grid item xs={12} sm={6} md={4} >
                    <TextField
                        fullWidth
                        id="f_name"
                        name="fathername"
                        label="Father Name"
                        variant="outlined"
                        size="small"
                        value={fatherName}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* Father age */}
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        name="fatherage"
                        id="f_age"
                        label="Father Age"
                        variant="outlined"
                        size="small"
                        value={fatherAge}
                        onChange ={handleInputs}

                    />
                </Grid>

                {/* Father Occupation */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="fatheroccupation"
                        id="f_occ"
                        label="Father Occupation"
                        variant="outlined"
                        size="small"
                        value={fatherOccu}
                        onChange ={handleInputs}

                    />
                </Grid>

                {/* Father Mobile */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        id="f_mobile"
                        name="fathermobile"
                        label="Father Mobile"
                        variant="outlined"
                        size="small"
                        value={fatherMob}
                        onChange ={handleInputs}

                    />
                </Grid>

                {/* Mother Name */}
                <Grid item xs={12} sm={6} md={4} >
                    <TextField
                        fullWidth
                        id="m_name"
                        name="mothername"
                        label="Mother Name"
                        variant="outlined"
                        size="small"
                        value={motherName}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* Mother age */}
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        id="m_age"
                        name="motherage"
                        label="Mother Age"
                        variant="outlined"
                        size="small"
                        value={motherAge}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* Mother Occupation */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        id="m_occ"
                        name="motheroccupation"
                        label="Mother Occupation"
                        variant="outlined"
                        size="small"
                        value={motherOccu}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* Mother mobile */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        id="m_mobile"
                        name="mothermobile"
                        label="Mother Mobile"
                        variant="outlined"
                        size="small"
                        value={motherMob}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* Gaurdian Name */}
                <Grid item xs={12} sm={6} md={4} >
                    <TextField
                        fullWidth
                        name="gaurdianname"
                        id="g_name"
                        label="Husband/Wife/Gaurdian Name"
                        variant="outlined"
                        size="small"
                        value={guardName}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* gaurdian age */}
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        name="gaurdianage"
                        id="g_age"
                        label="Age"
                        variant="outlined"
                        size="small"
                        value={guardAge}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* Gaurdian Occupation */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        id="g_occ"
                        name="gaurdianoccupation"
                        label="Occupation"
                        variant="outlined"
                        size="small"
                        value={guardOccu}
                        onChange ={handleInputs}
                    />
                </Grid>

                {/* gadurian  mobile */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="gaurdianmobile"
                        id="g_mobile"
                        label="Mobile"
                        variant="outlined"
                        size="small"
                        value={guardMob}
                        onChange ={handleInputs}
                    />
                </Grid>


                <Grid item xs={12} sm={12} md={12}>
                    <Button variant='contained' color='success'
                        disableElevation fullWidth onClick={handleClick}>
                        NEXT
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )

}


export default PersonalDetails;