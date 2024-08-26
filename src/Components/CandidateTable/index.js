import React, { useState } from "react";
import {
    Container, Grid,
    Table, TableRow, TableHead, TableCell, TableBody,
    Dialog, DialogTitle, Tooltip, IconButton, Menu, MenuItem,
    TableContainer, Paper,
    Button,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert
} from "@mui/material";

import {
    ThumbUpAltRounded, ThumbDownAltRounded, PendingRounded, VerifiedRounded, ReportRounded,
    CheckCircleRounded, CancelRounded, ErrorRounded, MoreVertOutlined, Visibility,
    ModeEdit, DeleteForever,
    CleanHands
} from "@mui/icons-material";

import { interview_status, getStatusName, DateFormater, finalStatus } from "../../Components/Global/Utils/common_data.js";
import { useHistory, useNavigate } from 'react-router-dom';

import CandidateReportCard from '../ReportCard';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from "./deleteDialog.js";
import axios from 'axios';
import { convertLength } from "@mui/material/styles/cssUtils.js";
import URL from "../Global/Utils/url_route.js";


function MOSCandiateTable(props) {



    const [candidate, setCandidate] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpen] = React.useState(false);

    const [deletemodal, setDeletemodal] = React.useState(false)

    const [notification, setnotification] = React.useState(false)

    const [candidateid, setcandidateid] = React.useState(null)

    const [deleteStatusVal, setDeleteStatusVal] = React.useState(null)

    const navigate = useNavigate();

    const user_session = JSON.parse(sessionStorage.getItem("user_info"));
    let emp_id = user_session?.user_details?.emp_id;
    let emp_role = user_session?.user_role;


    const candidate_data = props.data;


    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOpenModal = (item) => {
        setCandidate(item);
        setOpen(true);
    };
    const handleCloseModal = () => setOpen(false);


    const handledeleteCandidate = async () => {

        try {

            let url = `${URL}candidates`;

            const response = await axios.delete(url, {
                data: { candidateid }
            });
            console.log('User get deleted successfully', response)

            setDeleteStatusVal(response.data.status)
            setnotification(true)

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (err) {

            console.log(err)

        } finally {
            setDeletemodal(false)
            setcandidateid(null)

        }

    }

    const handlenotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setnotification(false);
    };

    return (
        <Container >

            <Grid item sx={12} sm={12} md={12}>
                <TableContainer component={Paper} >

                    <Table size='small'>
                        <TableHead >
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Designation</TableCell>
                                <TableCell>Reg. Date</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>eMail</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Delete</TableCell>
                                {/* <TableCell>{" "}</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidate_data.length === 0 ? "" :
                                candidate_data.map(item => {

                                    return (
                                        <TableRow >
                                            <TableCell>{item.candidate_id}</TableCell>
                                            <TableCell>{item.f_name_basic.charAt(0).toUpperCase() + item.f_name_basic.slice(1) + " " + item.l_name_basic.charAt(0).toUpperCase() + item.l_name_basic.slice(1)} </TableCell>
                                            <TableCell>{item.job_profile_basic}</TableCell>
                                            <TableCell>{DateFormater(item.created_at)}</TableCell>
                                            <TableCell>{item.mobile_basic}</TableCell>
                                            <TableCell>{item.email_basic}</TableCell>
                                            <TableCell onClick={() => handleOpenModal(item)} sx={{ cursor: "pointer" }} align='center'>
                                                {item.result == 1 ? <Tooltip title={finalStatus(item.result)} arrow><ThumbUpAltRounded fontSize='small' sx={{ color: "green" }} /></Tooltip> :
                                                    item.result == 2 ? <Tooltip title={finalStatus(item.result)} arrow><ThumbDownAltRounded fontSize='small' sx={{ color: "red" }} /></Tooltip> :
                                                        item.result == 3 ? <Tooltip title={finalStatus(item.result)} arrow><PendingRounded fontSize='small' sx={{ color: "orange" }} /></Tooltip> :
                                                            item.result == 4 ? <Tooltip title={finalStatus(item.result)} arrow><VerifiedRounded fontSize='small' sx={{ color: "blue" }} /></Tooltip> :
                                                                item.result == 0 ? <Tooltip title="Pending" arrow><ReportRounded fontSize='small' sx={{ color: "#ffbf00" }} /></Tooltip> : null}

                                            </TableCell>
                                            <TableCell align="center" onClick={() => {
                                                setcandidateid(item.candidate_id)
                                                setDeletemodal(true)
                                            }
                                            }>
                                                <Button >
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* { deletemodal ? <DeleteDialog /> : '' } */}
            </Grid>


            <Dialog
                open={deletemodal}
                onClose={() => { setDeletemodal(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this candidate
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeletemodal(false)}>Disagree</Button>

                    <Button onClick={() => handledeleteCandidate()} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


            <Snackbar
                open={notification}
                autoHideDuration={3000}
                //  sx={{
                //     position:'fixed',
                //     top:'10%',
                //     left:'50%',
                //     transform:'translate(-50%,-50%)'
                //  }}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                onClose={handlenotification}
            >
                <Alert
                    onClose={handlenotification}
                    severity={deleteStatusVal === 1 ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {deleteStatusVal === 1 ? "The User deleted successfully ! " : " Something went wrong ! "}
                </Alert>
            </Snackbar>

            <Dialog onClose={handleCloseModal} open={openModal} fullWidth maxWidth="md" >
                <DialogTitle>
                    <CandidateReportCard candidate={candidate} emp_details={props.emp_details} />
                </DialogTitle>
            </Dialog>
        </Container>
    )
}


export default MOSCandiateTable