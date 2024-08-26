import * as React from 'react';

import {
    Container, Grid,
    Button, TextField, Typography,
    Card, CardActions, CardContent, CardHeader, Avatar, IconButton,
    Select, MenuItem, FormControl, FormLabel,
    FormControlLabel, Radio, RadioGroup,
    CardActionArea, InputLabel, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import { SignalCellularNull } from '@mui/icons-material';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

import axios from 'axios';
import URL from "../Global/Utils/url_route";


function CandidateEvaluation(props) {

    const rating = [{ id: 0, value: "Poor" }, { id: 1, value: "Below Average" },
    { id: 2, value: "Average" }, { id: 3, value: "Met Expectation" },
    { id: 4, value: "Above Expectation" }, { id: 5, value: "Exceptional" }];

    const rating1 = [{ id: 0, value: "Poor" }, { id: 1, value: "Below Average" },
    { id: 2, value: "Average" }, { id: 3, value: "Met Expectation" },
    { id: 4, value: "Above Expectation" }, { id: 5, value: "Exceptional" }];
    const rating2 = [{ id: 0, value: "Poor" }, { id: 1, value: "Below Average" },
    { id: 2, value: "Average" }, { id: 3, value: "Met Expectation" },
    { id: 4, value: "Above Expectation" }, { id: 5, value: "Exceptional" }];
    const rating3 = [{ id: 0, value: "Poor" }, { id: 1, value: "Below Average" },
    { id: 2, value: "Average" }, { id: 3, value: "Met Expectation" },
    { id: 4, value: "Above Expectation" }, { id: 5, value: "Exceptional" }];
    const rating4 = [{ id: 0, value: "Poor" }, { id: 1, value: "Below Average" },
    { id: 2, value: "Average" }, { id: 3, value: "Met Expectation" },
    { id: 4, value: "Above Expectation" }, { id: 5, value: "Exceptional" }];
    const rating5 = [{ id: 0, value: "Poor" }, { id: 1, value: "Below Average" },
    { id: 2, value: "Average" }, { id: 3, value: "Met Expectation" },
    { id: 4, value: "Above Expectation" }, { id: 5, value: "Exceptional" }];

    const RatingName = (id) => {

        let final = rating.find(item => item.id = id);

        if (final !== undefined) {
            return final.value;
        }
        else {
            return null
        }

    }

    const [dress, setDress] = React.useState();
    const [grooming, setGrooming] = React.useState();
    const [body, setBody] = React.useState();
    const [eye, setEye] = React.useState();
    const [appearance, setAppearance] = React.useState();

    React.useEffect(() => {
        let count = parseInt(dress) + parseInt(grooming) + parseInt(body) + parseInt(eye);
        let final = Math.round(count / 4);
        setAppearance(final);
    }, [dress, grooming, body, eye]);


    const [assertive, setAssertive] = React.useState(props.data !== undefined && props.data.assertive !== undefined ? props.data.assertive : "");
    const [cooperative, setCooperative] = React.useState(props.data !== undefined && props.data.cooperative !== undefined ? props.data.cooperative : "");
    const [responsible, setResponsible] = React.useState(props.data !== undefined && props.data.responsible !== undefined ? props.data.responsible : "");
    const [dedicated, setDedicated] = React.useState(props.data !== undefined && props.data.dedicated !== undefined ? props.data.dedicated : "");
    const [maturity, setMaturity] = React.useState(props.data !== undefined && props.data.maturity !== undefined ? props.data.maturity : "");
    const [professional, setPrefessional] = React.useState(props.data !== undefined && props.data.professional !== undefined ? props.data.professional : "");
    const [ability, setAbility] = React.useState(props.data !== undefined && props.data.ability !== undefined ? props.data.ability : "");
    const [charater, setCharater] = React.useState(0);

    React.useEffect(() => {
        let count = parseInt(assertive) + parseInt(responsible) + parseInt(dedicated) + parseInt(maturity)
            + parseInt(professional) + parseInt(ability);
        let final = Math.round(count / 6);
        setCharater(final);
    }, [assertive, cooperative, responsible, dedicated, maturity, professional, ability]);


    const [self, setSelf] = React.useState(props.data !== undefined && props.data.self !== undefined ? props.data.self : "");
    const [intrest, setIntrest] = React.useState(props.data !== undefined && props.data.intrest !== undefined ? props.data.intrest : "");
    const [career, setCareer] = React.useState(props.data !== undefined && props.data.career !== undefined ? props.data.career : "");
    const [goal, setGoal] = React.useState(0);

    React.useEffect(() => {
        let count = parseInt(self) + parseInt(intrest) + parseInt(career);
        let final = Math.round(count / 3);
        setGoal(final);
    }, [self, intrest, career]);

    const [commitment, setCommitment] = React.useState(props.data !== undefined && props.data.commitment !== undefined ? props.data.commitment : "");
    const [knowledge, setKnowdledge] = React.useState(props.data !== undefined && props.data.knowledge !== undefined ? props.data.knowledge : "");
    const [industry, setIndustry] = React.useState(props.data !== undefined && props.data.industry !== undefined ? props.data.industry : "");
    const [mos, setMos] = React.useState(0);

    React.useEffect(() => {
        let count = parseInt(commitment) + parseInt(knowledge) + parseInt(industry);
        let final = Math.round(count / 3);
        setMos(final);
    }, [commitment, knowledge, industry]);

    const [jobReal, setJobReal] = React.useState(props.data !== undefined && props.data.jobReal !== undefined ? props.data.jobReal : "");
    const [matches, setMatches] = React.useState(props.data !== undefined && props.data.matches !== undefined ? props.data.matches : "");
    const [job, setJob] = React.useState(0);

    React.useEffect(() => {
        let count = parseInt(jobReal) + parseInt(matches);
        let final = Math.round(count / 2);
        setJob(final);
    }, [jobReal, matches]);

    const [real, setReal] = React.useState(props.data !== undefined && props.data.real !== undefined ? props.data.real : "");
    const [potential, setPotential] = React.useState(props.data !== undefined && props.data.potential !== undefined ? props.data.potential : "");
    const [longterm, setLongterm] = React.useState(0);

    React.useEffect(() => {
        let count = parseInt(real) + parseInt(potential);
        let final = Math.round(count / 2);
        setLongterm(final);
    }, [real, potential]);


    const [total, setTotal] = React.useState(0);
    //const [finalRating,setFinalRating] = React.useState(null);

    React.useEffect(() => {
        let count = parseInt(appearance) + parseInt(charater) + parseInt(goal) + parseInt(mos) +
            parseInt(job) + parseInt(longterm);
        let final = Math.round(count / 6);
        setTotal(final);

    }, [appearance, charater, goal, mos, job, longterm]);



    const [finalComments, setFinalComments] = React.useState("");
    const [interviewStatus, setInterviewStatus] = React.useState(0);

    const [showAlert, setShowAlert] = React.useState(false);

    // React.useEffect(()=>{
    //     let finalRating = RatingName(total);

    //     setFinalRating(finalRating);
    // },[appearance,charater,goal,mos,job,longterm]);

    const handleAlertClose = () => {
        setShowAlert(false);
        window.location.reload(true);
    }

    const handleSubmit = () => {
        let round = props.interviewRound;
        let name = props.interviewName;
        let client = props.client;
        let candidate_id = client.id;
        let count = parseInt(appearance) + parseInt(charater) + parseInt(goal) + parseInt(mos) +
            parseInt(job) + parseInt(longterm);
        let finalRate = Math.round(count / 6);
        let request = {
            candidate_id: candidate_id,
            round: round,
            interviewName: name,
            dress: dress,
            grooming: grooming,
            body: body,
            eye: eye,
            appearTotal: appearance,

            assertive: assertive,
            cooperative: cooperative,
            responsible: responsible,
            dedicated: dedicated,
            maturity: maturity,
            professional: professional,
            ability: ability,
            charaterTotal: charater,

            self: self,
            intrest: intrest,
            career: career,
            goalTotal: goal,

            commitment: commitment,
            knowledge: knowledge,
            industry: industry,
            mosTotal: mos,

            jobReal: jobReal,
            matches: matches,
            jobTotal: job,

            real: real,
            potential: potential,
            longtermTotal: longterm,

            finalTotal: finalRate,
            comments: finalComments,
            result: interviewStatus
        };

        let interview_url = URL + "interviewevaluation"
        axios.post(interview_url, request)
            .then((response) => {
                if (response.data.status === 0) {
                    setShowAlert(true);
                }
                else {
                    console.log("ERROR : ", JSON.stringify(response.data));
                }
            })
            .catch((err) => {
                console.log("ERROR : ", JSON.stringify(err));
            })
            .finally();


    }
    return (
        <Grid container spacing={2} sx={{ marginTop: "8px" }}>
            {/* Appearance Component*/}
            <Grid item sx={12} sm={12} md={12}>
                <Card sx={{ backgroundImage: "white" }}>
                    <CardHeader title="Appearance" />
                    <CardContent>
                        <FormControl>
                            <FormLabel>
                                Dress
                            </FormLabel>
                            <RadioGroup row value={dress} onChange={e => setDress(e.target.value)}>
                                {rating.map(item => {

                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Grooming
                            </FormLabel>
                            <RadioGroup row value={grooming} onChange={e => setGrooming(e.target.value)}>
                                {rating.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Body Language
                            </FormLabel>
                            <RadioGroup row value={body} onChange={e => setBody(e.target.value)}>
                                {rating.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Eye Contact
                            </FormLabel>
                            <RadioGroup row value={eye} onChange={e => setEye(e.target.value)}>
                                {rating.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>

                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item sx={6} sm={6} md={6}>
                                <Typography variant='h6'>
                                    Total Score : {appearance === undefined || appearance.toString() == "NaN" ? 0 : appearance}
                                </Typography>
                            </Grid>
                            <Grid item sx={6} sm={6} md={6}>
                                <TextField label="Comments" required fullWidth rows={2} multiline variant='outlined' />
                            </Grid>
                        </Grid>


                    </CardActions>
                </Card>
            </Grid>
            {/* Characteristics Component*/}
            <Grid item sx={12} sm={12} md={12}>
                <Card sx={{ backgroundImage: "white" }}>
                    <CardHeader title="Characteristics" />
                    <CardContent>
                        <FormControl>
                            <FormLabel>
                                Assertive
                            </FormLabel>
                            <RadioGroup row value={assertive} onChange={e => setAssertive(e.target.value)}>
                                {rating1.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Cooperative
                            </FormLabel>
                            <RadioGroup row value={cooperative} onChange={e => setCooperative(e.target.value)}>
                                {rating1.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Responsible
                            </FormLabel>
                            <RadioGroup row value={responsible} onChange={e => setResponsible(e.target.value)}>
                                {rating1.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Dedicated
                            </FormLabel>
                            <RadioGroup row value={dedicated} onChange={e => setDedicated(e.target.value)}>
                                {rating1.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Maturity
                            </FormLabel>
                            <RadioGroup row value={maturity} onChange={e => setMaturity(e.target.value)}>
                                {rating1.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Professional
                            </FormLabel>
                            <RadioGroup row value={professional} onChange={e => setPrefessional(e.target.value)}>
                                {rating1.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Ability to Learn
                            </FormLabel>
                            <RadioGroup row value={ability} onChange={e => setAbility(e.target.value)}>
                                {rating1.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>

                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item sx={6} sm={6} md={6}>
                                <Typography variant='h6'>
                                    Total Score : {charater === undefined || charater.toString() === "NaN" ? 0 : charater}
                                </Typography>
                            </Grid>
                            <Grid item sx={6} sm={6} md={6}>
                                <TextField label="Comments" required fullWidth rows={2} multiline variant='outlined' />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            {/* Goals Component*/}
            <Grid item sx={12} sm={12} md={12}>
                <Card sx={{ backgroundImage: "white" }}>
                    <CardHeader title="Goals / Self Perception" />
                    <CardContent>
                        <FormControl>
                            <FormLabel>
                                Realistic self-appraisal
                            </FormLabel>
                            <RadioGroup row value={self} onChange={e => setSelf(e.target.value)}>
                                {rating2.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Reason for interest in CC
                            </FormLabel>
                            <RadioGroup row value={intrest} onChange={e => setIntrest(e.target.value)}>
                                {rating2.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Realistic career goal
                            </FormLabel>
                            <RadioGroup row value={career} onChange={e => setCareer(e.target.value)}>
                                {rating2.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>


                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item sx={6} sm={6} md={6}>
                                <Typography variant='h6'>
                                    Total Score :  {goal === undefined || goal.toString() === "NaN" ? 0 : goal}
                                </Typography>
                            </Grid>
                            <Grid item sx={6} sm={6} md={6}>
                                <TextField label="Comments" required fullWidth rows={2} multiline variant='outlined' />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>

            {/* Why MOS Component*/}
            <Grid item sx={12} sm={12} md={12}>
                <Card sx={{ backgroundImage: "white" }}>
                    <CardHeader title="Why MOS" />
                    <CardContent>
                        <FormControl>
                            <FormLabel>
                                Commitment
                            </FormLabel>
                            <RadioGroup row value={commitment} onChange={e => setCommitment(e.target.value)}>
                                {rating3.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Knowledge on MOS
                            </FormLabel>
                            <RadioGroup row value={knowledge} onChange={e => setKnowdledge(e.target.value)}>
                                {rating3.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Knowledge on Industry
                            </FormLabel>
                            <RadioGroup row value={industry} onChange={e => setIndustry(e.target.value)}>
                                {rating3.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>


                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item sx={6} sm={6} md={6}>
                                <Typography variant='h6'>
                                    Total Score :  {mos === undefined || mos.toString() === "NaN" ? 0 : mos}
                                </Typography>
                            </Grid>
                            <Grid item sx={6} sm={6} md={6}>
                                <TextField label="Comments" required fullWidth rows={2} multiline variant='outlined' />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            {/* JOB Expectation Component*/}
            <Grid item sx={12} sm={12} md={12}>
                <Card sx={{ backgroundImage: "white" }}>
                    <CardHeader title="Job Expectations" />
                    <CardContent>
                        <FormControl>
                            <FormLabel>
                                Was it realistic
                            </FormLabel>
                            <RadioGroup row value={jobReal} onChange={e => setJobReal(e.target.value)}>
                                {rating4.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Matches the requirement
                            </FormLabel>
                            <RadioGroup row value={matches} onChange={e => setMatches(e.target.value)}>
                                {rating4.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item sx={6} sm={6} md={6}>
                                <Typography variant='h6'>
                                    Total Score :  {job === undefined || job.toString() === "NaN" ? 0 : job}
                                </Typography>
                            </Grid>
                            <Grid item sx={6} sm={6} md={6}>
                                <TextField label="Comments" required fullWidth rows={2} multiline variant='outlined' />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            {/* Long term Component*/}
            <Grid item sx={12} sm={12} md={12}>
                <Card sx={{ backgroundImage: "white" }}>
                    <CardHeader title="Long term objectives" />
                    <CardContent>
                        <FormControl>
                            <FormLabel>
                                was it realistic
                            </FormLabel>
                            <RadioGroup row value={real} onChange={e => setReal(e.target.value)}>
                                {rating5.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Has potential to grow
                            </FormLabel>
                            <RadioGroup row value={potential} onChange={e => setPotential(e.target.value)}>
                                {rating5.map(item => {
                                    return (
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.value} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item sx={6} sm={6} md={6}>
                                <Typography variant='h6'>
                                    Total Score :  {longterm === undefined || longterm.toString() === "NaN" ? 0 : longterm}
                                </Typography>
                            </Grid>
                            <Grid item sx={6} sm={6} md={6}>
                                <TextField label="Comments" required fullWidth rows={2} multiline variant='outlined' />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid container sx={{ margin: "8px" }} spacing={2}>
                <Grid item sx={12} sm={4} md={4}>
                    <Typography variant='h6'>
                        Final Score :  {total === undefined || total.toString() === "NaN" ? 0 : total}
                    </Typography>
                    <FormControl fullWidth size='small'>
                        <FormLabel>
                            Interview Status
                        </FormLabel>
                        <Select displayEmpty value={interviewStatus} onChange={e => setInterviewStatus(e.target.value)}>
                            <MenuItem value={1}>Selected</MenuItem>
                            <MenuItem value={2}>Rejected</MenuItem>
                            <MenuItem value={3}>Hold</MenuItem>
                            <MenuItem value={4}>Shortlisted</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={12} sm={4} md={4}>
                    <TextField fullWidth multiline rows={3}
                        label="Comments"
                        value={finalComments}
                        onChange={e => setFinalComments(e.target.value)} />
                </Grid>
                <Grid item sx={12} sm={4} md={4}>
                    <Button variant='contained' color='primary'
                        disableElevation fullWidth size='large'
                        sx={{ height: "100%", backgroundColor: "#272727" }}
                        onClick={handleSubmit}>
                        SUBMIT EVALUATION
                    </Button>
                </Grid>
            </Grid>
            <Dialog onClose={handleAlertClose} open={showAlert} >
                <DialogTitle sx={{ textAlign: "center" }}>
                    <AutoAwesomeOutlinedIcon fontSize='large' color='success' />
                    <Typography variant='h5'>
                        Great!!

                    </Typography>
                    <Typography variant='body1'>You Have Successfully Submitted<br />
                        Your Evaluation!!</Typography>
                </DialogTitle>
            </Dialog>
        </Grid>
    )
}


export default CandidateEvaluation