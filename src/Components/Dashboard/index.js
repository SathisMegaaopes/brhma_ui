import React, { createContext, useState, useContext } from "react";
import {
    Grid,
    Typography,
    Container,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Paper,
    Box,
    TextField,
    Button,
    Modal,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";

import URL from "../Global/Utils/url_route";
import axios from "axios";
import { referred_by_data } from "../Global/Utils/common_data";
import { NewDateFormater } from "../Global/Utils/common_data";

import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";

import CandidateTable from "../CandidateTable";

// import Sidebar from "./SidebarNaviagtion"
import { ThemeContext } from "@emotion/react";
import Todolist from "./Todolist";
// import DatabaseIcon from '@mui/icons-material/Database';



export default function MOSDashboard() {


    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));
    const user_session = sessionStorage.getItem("user_info");

    // console.log(typeof (userinfo.user_role), 'this is first one')

    const AuthorizedPerson = userinfo.user_role



    const history = useNavigate();

    const [candidates, setCandidates] = React.useState([]);
    const [candidateList, setCandidatelist] = React.useState([]);
    const [emp_details, setEmp] = React.useState([]);
    const [total, setTotal] = React.useState(0);


    const [startnewDate, setStartnewDate] = useState(new Date());
    const [endnewDate, setEndnewDate] = useState(new Date());


    const date = new Date();

    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    const formatDate = (dateString) => {

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    const selectionRange = {

        startDate: startnewDate,
        endDate: endnewDate,
        key: "selection",
    };



    const fromdate = formatDate(startnewDate);
    const todate = formatDate(endnewDate);

    let currentDisplayDate;

    if (fromdate === todate) {

        // console.log(fromdate, todate);
        currentDisplayDate = fromdate;
    } else {
        currentDisplayDate = `${fromdate} / ${todate}`;
    }

    // console.log(currentDisplayDate, "currentDisplayDate");
    // console.log(currentDate);

    const handleReset = () => {

        setStartnewDate(currentDate);
        setEndnewDate(currentDate);
    };

    const handleSelect = (date) => {

        setStartnewDate(date.selection.startDate);
        setEndnewDate(date.selection.endDate);
    };

    const from_date = fromdate + " 00:00:00";
    const to_date = todate + " 23:59:59";

    React.useEffect(() => {
        if (
            user_session === undefined ||
            user_session === "" ||
            user_session === null
        ) {
            history("/");
        }

        let url = URL + "candidates/searchByDate/" + from_date + "/" + to_date;

        axios
            .get(url)
            .then((response) => {
                if (response.data.status === 0) {
                    setCandidates(response.data.data);
                    setCandidatelist(response.data.data);
                    setEmp(response.data.emp_details);
                } else {
                    console.log("ERROR : ", JSON.stringify(response.data));
                }
            })
            .catch()
            .finally(() => {
                // setLoader(false);
            });
    }, [startnewDate, endnewDate]);

    React.useEffect(() => {
        if (candidates.length !== 0) {
            setTotal(candidates.length);
        }
    }, [candidates]);

    const handleNavigate = (val) => {
        if (val === 1) {
            history("/dashboard/evalution");
        } else {
            history("/dashboard/candidate-master");
        }
    };

    const fnCountByRef = (ref) => {
        let data = candidates.filter((item) => {
            return item.ref_by_basic === ref;
        });

        return data.length;
    };

    const fnLoadRefData = (ref) => {
        if (ref !== null) {
            let data = candidates.filter((item) => {
                return item.ref_by_basic === ref;
            });
            setCandidatelist(data);
        } else {
            setCandidatelist(candidates);
        }
    };

    const fnGetCount = (ref, status) => {
        let count = 0;
        let data = candidates.filter(
            (item) =>
                item.ref_by_basic === ref && parseInt(item.result) === parseInt(status)
        );
        return data.length;

        // }
        // console.log("Current Status : "+status+" >> "+JSON.stringify(data));
        // debugger;
        //if(ref!==null)
        //   {
    };

    const fnFilterCandidateByRound = (data, status, emp_id, round = 0) => {
        let temp_round = "round_" + round;
        let temp_round_by = "round" + round + "_by";
        let temp_data = data.filter(
            (item) => parseInt(item.result) === parseInt(status)
        );

        return temp_data.length;
    };

    const fnGetCountById = (id, status) => {
        let curr_candidate = candidates.filter(
            (item) => parseInt(item.updated_by) == parseInt(id)
        );

        let round1 = fnFilterCandidateByRound(curr_candidate, status, id);

        return round1;
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {

        setOpen(true);
    };
    const handleClose = () => {

        setOpen(false);
    };

    const style = {

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleNext = (e, id) => {

        history(
            `/dashboard/candidate-master/?employid=${id}&fromdate=${from_date}&todate=${to_date}`
        );
    };


    const Heading = 'h6'
    const subtitle1 = 'subtitle1'

    return (
        // <div style={{ display: 'flex', alignItems:'center',justifyContent:'space-between', gap: '130px' }}>
        <Container sx={{display:'flex', alignItems:'center',justifyContent:'space-between',gap:3}}>



            <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
                {/* marginLeft: '60px' important don't delete it sathis kumar  */}
                <Typography variant='h6' sx={{ margin: "8px" }}>
                    Welcome {userinfo?.user_details?.emp_name} !
                </Typography>
                {/* <Grid container spacing={4}>
                    <Grid item xs={4} md={3} lg={7}>
                        <Card
                            variant="outlined"
                            onClick={(e) => handleNavigate(1)}
                            sx={{ cursor: "pointer", background: "#FEFAE0" }}
                        >
                            <CardHeader title="Candidate Evaluation" />
                        </Card>
                    </Grid>

                    <Grid item xs={4} md={3} lg={6} >
                        {userinfo?.user_role === 1 ? (
                            <Card
                                variant="outlined"
                                onClick={(e) => handleNavigate(2)}
                                sx={{ cursor: "pointer", background: "#FEFAE0" }}
                            >
                                <CardHeader title="Candidate Database"  />
                            </Card>
                        ) : (
                            ""
                        )}
                    </Grid>
                </Grid> */}
                <Grid>
                    <React.Fragment>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...style }}>
                                <div className="App">
                                    <DateRangePicker
                                        ranges={[selectionRange]}
                                        onChange={handleSelect}
                                        startDatePlaceholder={currentDate}
                                    />
                                </div>
                                <Button
                                    sx={{ position: "relative", left: "75%" }}
                                    onClick={handleClose}
                                >
                                    Close Calender
                                </Button>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </Grid>
                <Paper sx={{ padding: "8px", margin: "4px" }}>
                    <Grid>
                        <Grid item>
                            <Typography variant="h5">Today's Overview!!</Typography>
                        </Grid>
                        {/* new */}
                        <Grid
                            sx={{ marginTop: "-15px" }}
                            sm={{ marginTop: "-20px" }}
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h6" sx={{ margin: "0px" }}>
                                    Date : {currentDisplayDate}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleOpen}>
                                    <FilterAltOutlinedIcon
                                        style={{ fontSize: "30px", color: "black" }}
                                    />
                                </Button>
                            </Grid>
                            {currentDisplayDate !== currentDate ? (
                                <Grid sx={{ marginLeft: "-20px" }}>
                                    <Button onClick={handleReset}>
                                        <RotateLeftRoundedIcon
                                            style={{ fontSize: "27px", color: "black" }}
                                        />
                                    </Button>
                                </Grid>
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TableContainer component={Paper} sx={{ border: "1px solid grey" }}>
                                <Typography variant="body" sx={{ padding: "2px" }}>
                                    Daily Status Count By Referrals
                                </Typography>
                                <Table size="small">
                                    <TableHead sx={{ background: "#FEFAE0" }}>
                                        <TableRow>
                                            <TableCell>Registration Type</TableCell>
                                            <TableCell>Pending</TableCell>
                                            <TableCell>Select</TableCell>
                                            <TableCell>Reject</TableCell>
                                            <TableCell>Hold</TableCell>
                                            <TableCell>Shortlist</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {referred_by_data.map((item) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{item}</TableCell>
                                                    <TableCell>{fnGetCount(item, 0)}</TableCell>
                                                    <TableCell>{fnGetCount(item, 1)}</TableCell>
                                                    <TableCell>{fnGetCount(item, 2)}</TableCell>
                                                    <TableCell>{fnGetCount(item, 3)}</TableCell>
                                                    <TableCell>{fnGetCount(item, 4)}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TableContainer component={Paper} sx={{ border: "1px solid grey" }}>
                                <Typography variant="body1" sx={{ padding: "2px" }}>
                                    Daily Status Count By Recruiter{" "}
                                </Typography>
                                <Table size="small">
                                    <TableHead sx={{ background: "#FEFAE0" }}>
                                        <TableRow>
                                            <TableCell>Recruiter</TableCell>
                                            <TableCell>Pending</TableCell>
                                            <TableCell>Select</TableCell>
                                            <TableCell>Reject</TableCell>
                                            <TableCell>Hold</TableCell>
                                            <TableCell>Shortlist</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {emp_details.map((item) => {
                                            let hide =
                                                fnGetCountById(item.emp_id, 0) === 0 &&
                                                    fnGetCountById(item.emp_id, 1) === 0 &&
                                                    fnGetCountById(item.emp_id, 2) === 0 &&
                                                    fnGetCountById(item.emp_id, 3) === 0 &&
                                                    fnGetCountById(item.emp_id, 4) === 0
                                                    ? true
                                                    : false;

                                            return !hide ? (
                                                <TableRow>
                                                    {/*  */}
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                padding: "0px",
                                                                color: "black",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={(e) => handleNext(e, item.emp_id)}
                                                        >
                                                            {item.emp_name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{fnGetCountById(item.emp_id, 0)}</TableCell>
                                                    <TableCell>{fnGetCountById(item.emp_id, 1)}</TableCell>
                                                    <TableCell>{fnGetCountById(item.emp_id, 2)}</TableCell>
                                                    <TableCell>{fnGetCountById(item.emp_id, 3)}</TableCell>
                                                    <TableCell>{fnGetCountById(item.emp_id, 4)}</TableCell>
                                                </TableRow>
                                            ) : null;
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Paper>
                {/* </div>  */}
                {/* } */}
            </Container>

{/* 
            <Container maxWidth="lg" sx={{ marginTop: "20px" }}>

            </Container> */}


            <Container maxWidth="lg" sx={{ marginTop: "20px" }} >
                <Todolist />
            </Container>


        </Container>

    );
}


// <Container maxWidth="lg" sx={{ marginTop: "20px" }}>

// </Container>