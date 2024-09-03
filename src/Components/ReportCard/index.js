import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, CardHeader, Avatar,
    Table, TableBody, TableRow, TableCell, Tooltip,
    Typography, Accordion, AccordionSummary, AccordionDetails,
    CardMedia, IconButton
} from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import URL from '../Global/Utils/url_route.js';
import axios from 'axios';
import CandidateEvaludationCard from '../CandidateEvaluationCard/index.js';
import { interview_rounds, interview_status, finalStatus } from "../Global/Utils/common_data.js";





const DateFormater = (val) => {
    let new_date = new Date(val);
    let year = new_date.getFullYear();
    let month = ("0" + (new_date.getMonth() + 1)).slice(-2);
    let date = ("0" + new_date.getDate()).slice(-2);

    return date + " / " + month + " / " + year;
}




const InterviewResult = (round, candidate) => {
    let result = null;

    if (parseInt(round) === 1) {
        result = interview_status.find(item => item.id === candidate.round_1);

        if (result === undefined) {
            return "Not Taken";
        }
        else {
            return result.name;
        }

    }
    else if (parseInt(round) === 2) {
        result = interview_status.find(item => item.id === candidate.round_2);
        if (result === undefined) {
            return "Not Taken";
        }
        else {
            return result.name;
        }

    }
    else if (parseInt(round) === 3) {
        result = interview_status.find(item => item.id === candidate.round_3);
        if (result === undefined) {
            return "Not Taken";
        }
        else {
            return result.name;
        }

    }
    else if (parseInt(round) === 4) {
        result = interview_status.find(item => item.id === candidate.round_4);
        if (result === undefined) {
            return "Not Taken";
        }
        else {
            return result.name;
        }

    }
    else if (parseInt(round) === 5) {
        result = interview_status.find(item => item.id === candidate.round_5);
        if (result === undefined) {
            return "Not Taken";
        }
        else {
            return result.name;
        }

    }
    else if (parseInt(round) === 6) {
        result = interview_status.find(item => item.id === candidate.round_6);
        if (result === undefined) {
            return "Not Taken";
        }
        else {
            return result.name;
        }

    }
    else {
        return "Not Taken"
    }
}


// const finalStatus = (data) =>{
//     let result = interview_status.find(item => item.id == data);

//     if(result===undefined)
//     {
//         return "Awaiting Final Status";
//     }
//     else
//     {
//         return result.name;
//     }
// }


function CandidateReportCard(props) {

    const candidate_id = props.candidate.candidate_id;
    const candidate_name = props.candidate.f_name_basic + " " + props.candidate.l_name_basic;
    const registration_date = props.candidate.created_at;
    const designation = props.candidate.designation;
    const profile = props.candidate.job_profile_basic;
    const mobile = props.candidate.mobile_basic;
    const record_id = props.candidate.id;
    const total_exp = props.candidate.years + "." + props.candidate.months + " yrs";
    const dob = props.candidate.dob;
    const emp_details = props.emp_details;

    const distance = props.candidate.distance


    const [imagePathUrl, setimagePathUrl] = useState('')
    const [resumePathUrl, setresumePathUrl] = useState('')


    let personal_url = URL + "candidateupload";
    let full_url = `${personal_url}/${candidate_id}`;


    console.log(distance, 'this is distances')

    useEffect(() => {
        const handleFetchImageUrl = async () => {
            try {
                const response = await axios.get(full_url)
                setimagePathUrl(response.data.data.profile)
                setresumePathUrl(response.data.data.resume)
            } catch (err) {
                console.log('Error in fetching the image url', err)
            }
        }
        handleFetchImageUrl();
    }, [])


    const InterviewerName = (round, candidate) => {
        let emp_round = "round_" + round + "_by";
        let id = candidate[emp_round];
        if (id !== 0) {
            let details = props.emp_details.find(item => item.emp_id === id);
            return details?.emp_name;
        }
        else {
            return "NA";
        }


    }


    const formatImageUrl = (path) => {
        if (path === null || path === '') {
            const emptyone = ''
            return emptyone

        } else {
            let formattedPath = path.replace(/\\/g, '/');
            formattedPath = encodeURI(formattedPath);

            return formattedPath;

        }
    };


    const handleViewResume = () => {
        window.open(resumeUrl, '_blank');
    }

    const imageUrl = `${URL}${formatImageUrl(imagePathUrl)}`;

    const resumeUrl = `${URL}${formatImageUrl(resumePathUrl)}`;


    return (<Card variant='outlined'>
        <Box sx={{ position: 'relative' }}>

            <CardHeader title={<Typography variant='h5'>{candidate_name}</Typography>}
                subheader={<Typography variant='body1'>{candidate_id}</Typography>}
                sx={{ textTransform: "capitalize" }}
                avatar={
                    <Avatar aria-label="candidate name" sx={{ backgroundColor: "#272727", color: "#ede8de", textTransform: "capitalize" }}>
                        {candidate_name.substring(0, 2)}
                    </Avatar>
                }

            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {imagePathUrl && imagePathUrl !== '' ? (
                    <CardMedia
                        component="img"
                        height="230"
                        image={imageUrl}
                        alt="Candidate Photo"
                        sx={{ width: '200px', objectFit: 'cover' }} />
                ) : (
                    <Box>
                        <IconButton sx={{ fontSize: 200 }}>
                            <AccountBoxIcon sx={{ fontSize: 'inherit' }} />
                        </IconButton>
                    </Box>
                )}
            </Box>


            <IconButton
                color="success"
                onClick={resumePathUrl === '' ? null : handleViewResume}
                disabled={resumePathUrl === '' || resumePathUrl === null ? true : false}
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 1,
                    fontSize: 18,
                }}
            >

                <a style={{ textDecoration: 'underline', textUnderlineOffset: '5px' }}>View resume</a>
            </IconButton>

            <CardContent>
                <Table size='small'>
                    <TableBody>
                        <TableRow>
                            <TableCell>Mobile</TableCell>
                            <TableCell>{mobile}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date Of Birth</TableCell>
                            <TableCell>{dob}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Registration Date</TableCell>
                            <TableCell>{DateFormater(registration_date)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Designation</TableCell>
                            <TableCell>{designation != null ? designation : profile}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Experience</TableCell>
                            <TableCell>{total_exp}</TableCell>
                        </TableRow>

                        {Boolean(distance) ? <TableRow>
                            <TableCell>Distance from Office</TableCell>
                            <TableCell>{distance} kms</TableCell>
                        </TableRow> : ''}

                        <TableRow>
                            <TableCell colSpan={2}>
                                {
                                    interview_rounds.map(item => {
                                        return (
                                            <Accordion disableGutters elevation={0} square >
                                                <AccordionSummary sx={{ background: "rgb(241 230 219)" }}
                                                    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
                                                    disabled={InterviewResult(item.id, props.candidate) === "Not Taken" ? true : false}>
                                                    <Typography variant='body2' sx={{ fontWeight: "700", width: "70%" }}>{item.name}</Typography>

                                                    <Typography variant='body2' sx={{ paddingRight: "4px" }}>  {InterviewResult(item.id, props.candidate)} </Typography>
                                                    <Typography variant='caption'> ( {InterviewerName(item.id, props.candidate)} )</Typography>
                                                </AccordionSummary>

                                                <AccordionDetails sx={{ borderLeft: "1px solid rgb(241 230 219)", borderRight: "1px solid rgb(241 230 219)" }}>
                                                    <CandidateEvaludationCard round={item.id} candidate_id={record_id} complete_data={props.candidate} />
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    })
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                                <Typography variant='h5'>

                                    {props.candidate.result === 1 ? <Tooltip title={finalStatus(props.candidate.result)} arrow><ThumbUpAltRoundedIcon fontSize='large' sx={{ color: "green" }} /></Tooltip> :
                                        props.candidate.result === 2 ? <Tooltip title={finalStatus(props.candidate.result)} arrow><ThumbDownAltRoundedIcon fontSize='large' sx={{ color: "red" }} /></Tooltip> :
                                            props.candidate.result === 3 ? <Tooltip title={finalStatus(props.candidate.result)} arrow><PendingRoundedIcon fontSize='large' sx={{ color: "orange" }} /></Tooltip> :
                                                props.candidate.result === 4 ? <Tooltip title={finalStatus(props.candidate.result)} arrow><VerifiedRoundedIcon fontSize='large' sx={{ color: "blue" }} /></Tooltip> :
                                                    props.candidate.result === 0 ? <Tooltip title="Pending" arrow><ReportRoundedIcon fontSize='large' sx={{ color: "#ffbf00" }} /></Tooltip> : null}

                                </Typography></TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </CardContent>
        </Box >
    </Card>

    )
}



export default CandidateReportCard