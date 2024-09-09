import * as React from 'react';

import {
    Grid, FormControl, FormLabel, Select,
    MenuItem, TextField, RadioGroup, FormControlLabel,
    Radio, InputAdornment, Button,
    Dialog, DialogTitle, Typography
} from "@mui/material"
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import axios from 'axios';
import URL from "../Global/Utils/url_route";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DateFormater } from "../Global/Utils/common_data"

function FinalRound(props) {



    const rejectionReason = ["High Salary Expectation", "Office Distance", "Communication",
        "Attitude Correction", "Irrelevant Experience", "Mother Tongue Influence",
        "Low Confidence", "Poor Appearance", "False Data", "Criminal Background", "High Education",
        "Low Education", "Red in Past Records", "Others (Leave Details In Comments)"];

    const profile_data = ["Customer Service Representative", "Sr Customer Service Representative",
        "Customer Sales Representative", "Sr Customer Sales Representative", "HR Recruiter", "HR Executive",
        "HR Manager", "Front Desk Executive", "IT Support Administration ", "Quality Analyst",
        "Sr Quality Analyst", "Subject Matter Expert", "Team Leader", "Vice President",
        "Operations Manager", "Sr Operations Manager", "Group Manager", "Assistant Manager",
        "Admin & Facility Team Lead", "Admin & Facility - Executive", "Work Force Management",
        "Softkill Trainer", "Chief Executive Officer", "Chief Operating Officer",
        "Chief Financial Officer", "Security Guard", "House Keeping"];


    const [status, setStatus] = React.useState(0);
    const [comments, setComments] = React.useState("");
    const [selectedSalary, setSelectedSalary] = React.useState("");
    const [selectedSalaryAcc, setSelectedSalaryAcc] = React.useState("");
    const [selectedBonus, setSelectedBonus] = React.useState("No");
    const [selectedBonusVal, setSelectedBonusVal] = React.useState("");
    const [selectedDOJ, setSelectedDOJ] = React.useState(dayjs());
    // const [selectedDOJ, setSelectedDOJ] = React.useState("");
    const [selectedCTC, setSelectedCTC] = React.useState("");
    const [selectedNet, setSelectedNet] = React.useState("");
    const [selectedDesi, setSelectedDesi] = React.useState("");
    const [selectedCamp, setSelectedCamp] = React.useState("");
    const [selectedDisable, setSelectedDisable] = React.useState(true);

    const [showAlert, setShowAlert] = React.useState(false);

    const handleAlertClose = () => {
        setShowAlert(false);
        window.location.reload(true);
    }


    let round = props.interviewRound;
    let interviewName = props.interviewName;
    let client = props.client;

    const handleSelectedClick = () => {
        let selected_url = URL + "hrround/selected";

        let request = {
            candidate_id: client.id,
            round: round,
            interviewName: interviewName,
            result: status,
            comments: comments,
            selectedSalary: selectedSalary,
            selectedSalaryAcc: selectedSalaryAcc,
            selectedBonus: selectedBonus,
            selectedBonusVal: selectedBonusVal,
            selectedDOJ: DateFormater(selectedDOJ),
            selectedCTC: selectedCTC,
            selectedNet: selectedNet,
            selectedDesi: selectedDesi,
            selectedCamp: selectedCamp
        }

        axios.post(selected_url, request)
            .then((response) => {
                if (response.data.status === 0) {
                    setShowAlert(true);
                }
                else {
                    console.log("ERROR : ", JSON.stringify(response.data));
                }
            })
            .catch((err) => {
                console.log("ERROR ", JSON.stringify(err));
            })
            .finally(() => {

            });
    }

    React.useEffect(() => {

        if (comments === "" || selectedSalary === "" || selectedSalaryAcc === "" ||
            selectedBonus === "" || selectedBonus === "" || selectedDOJ === "" ||
            selectedCTC === "" || selectedNet === "" || selectedDesi === "" || selectedCamp === "") {
            setSelectedDisable(true);
        }
        else {
            setSelectedDisable(false);
        }

    }, [comments, selectedSalary, selectedSalaryAcc, selectedBonus, selectedBonus, selectedDOJ, selectedCTC,
        selectedNet, selectedDesi, selectedCamp]);


    const [rejectedReason, setRejectedReason] = React.useState("");
    const [rejectedDisable, setRejectedDisable] = React.useState(true);

    const handleRejectClick = () => {
        let rejected_url = URL + "hrround/rejected";

        let request = {
            candidate_id: client.id,
            round: round,
            interviewName: interviewName,
            result: status,
            comments: comments,
            reason: rejectedReason
        }

        axios.post(rejected_url, request)
            .then((response) => {
                if (response.data.status === 0) {
                    setShowAlert(true);
                }
                else {
                    console.log("ERROR : ", JSON.stringify(response.data));
                }
            })
            .catch((err) => {
                console.log("ERROR ", JSON.stringify(err));
            })
            .finally(() => {

            });
    }

    React.useEffect(() => {

        if (comments === "" || rejectedReason === "") {
            setRejectedDisable(true);
        }
        else {
            setRejectedDisable(false);
        }

    }, [comments, rejectedReason]);


    const [holdSal, setHoldSal] = React.useState("");
    const [holddesi, setHoldDesi] = React.useState("");
    const [holdDisable, setHolddisable] = React.useState(true);

    const handleHoldClick = () => {

        let hold_url = URL + "hrround/hold";

        let request = {
            candidate_id: client.id,
            round: round,
            interviewName: interviewName,
            salary: holdSal,
            designation: holddesi,
            result: status,
            comments: comments
        }

        axios.post(hold_url, request)
            .then((response) => {
                if (response.data.status === 0) {
                    setShowAlert(true);
                }
                else {
                    console.log("ERROR : ", JSON.stringify(response.data));
                }
            })
            .catch((err) => {
                console.log("ERROR ", JSON.stringify(err));
            })
            .finally(() => {

            });

    }

    React.useEffect(() => {

        if (comments === "" || holdSal === "" || holddesi === "") {
            setHolddisable(true);
        }
        else {
            setHolddisable(false);
        }

    }, [comments, holdSal, holddesi]);


    const [shortlistSal, setShortlistSal] = React.useState("");
    const [shortlistDesi, setShortlistDesi] = React.useState("");
    const [shortlistCamp, setShortlistCamp] = React.useState("");
    const [shortlistDisable, setShortlistDisable] = React.useState(true);

    const handleShortlistClick = () => {
        let shortlist_url = URL + "hrround/shortlist";

        let request = {
            candidate_id: client.id,
            round: round,
            interviewName: interviewName,
            salary: shortlistSal,
            designation: shortlistDesi,
            campaign: shortlistCamp,
            result: status,
            comments: comments
        }

        axios.post(shortlist_url, request)
            .then((response) => {
                if (response.data.status === 0) {
                    setShowAlert(true);
                }
                else {
                    console.log("ERROR : ", JSON.stringify(response.data));
                }
            })
            .catch((err) => {
                console.log("ERROR ", JSON.stringify(err));
            })
            .finally(() => {

            });
    }

    React.useEffect(() => {

        if (comments === "" || shortlistSal === "" || shortlistCamp === "" || shortlistDesi === "") {
            setShortlistDisable(true);
        }
        else {
            setShortlistDisable(false);
        }

    }, [comments, shortlistSal, shortlistCamp, shortlistDesi]);

    return (
        <Grid container spacing={2} sx={{ marginTop: "8px" }}>
            <Grid item xs={6} sm={6} md={6}>
                <FormControl fullWidth required >
                    <FormLabel>Interview Status</FormLabel>
                    <Select onChange={e => setStatus(e.target.value)}>
                        <MenuItem value={1}>Selected</MenuItem>
                        <MenuItem value={2}>Rejected</MenuItem>
                        <MenuItem value={3}>Hold</MenuItem>
                        <MenuItem value={4}>Shortlisted</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <TextField rows={2} label='Comments' required fullWidth multiline
                    value={comments} onChange={e => setComments(e.target.value)}
                    error={comments === "" ? true : false} />
            </Grid>

            {status === 1 ?
                <>
                    <Grid item xs={6} sm={3} md={3}>
                        <TextField label='Salary Offered' required fullWidth
                            value={selectedSalary}
                            onChange={e => setSelectedSalary(e.target.value)}
                            error={selectedSalary === "" ? true : false}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment>,
                            }} />
                    </Grid>
                    <Grid item xs={6} sm={3} md={3}>
                        <TextField label='Salary Accepted' required fullWidth
                            value={selectedSalaryAcc}
                            onChange={e => setSelectedSalaryAcc(e.target.value)}
                            error={selectedSalaryAcc === "" ? true : false}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment>,
                            }} />
                    </Grid>
                    <Grid item xs={6} sm={3} md={3}>
                        <FormControl fullWidth required>
                            <FormLabel>
                                Attendance Bonus
                            </FormLabel>
                            <RadioGroup row value={selectedBonus}
                                onChange={e => setSelectedBonus(e.target.value)}
                                error={selectedBonus === "" ? true : false} >
                                <FormControlLabel value="Yes" control={<Radio />} label="YES" />
                                <FormControlLabel value="No" control={<Radio />} label="NO" />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3}>
                        <TextField label='Attendance Bonus' required fullWidth
                            value={selectedBonusVal}
                            onChange={e => setSelectedBonusVal(e.target.value)}
                            error={selectedBonusVal === "" && selectedBonus === "Yes" ? true : false}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment>,
                            }} />
                    </Grid>

                    <Grid item xs={6} sm={4} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Joining Date"
                                    format='DD/MM/YYYY' value={selectedDOJ}
                                    onChange={(newValue) => setSelectedDOJ(newValue)}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        {/* <TextField label='Joining Date' required fullWidth 
            value={selectedDOJ}
            onChange={e=>setSelectedDOJ(e.target.value)}
            error={selectedDOJ==="" ? true : false}
            placeholder='Enter in YYYY-MM-DD Format' 
                     />    */}
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <TextField label='CTC' required fullWidth
                            value={selectedCTC}
                            onChange={e => setSelectedCTC(e.target.value)}
                            error={selectedCTC === "" ? true : false}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment>,
                            }} />

                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <TextField label='Net Take Home' required fullWidth
                            value={selectedNet}
                            onChange={e => setSelectedNet(e.target.value)}
                            error={selectedNet === "" ? true : false}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment>,
                            }} />

                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <FormControl fullWidth required >
                            <FormLabel>Designation</FormLabel>
                            <Select value={selectedDesi}
                                onChange={e => setSelectedDesi(e.target.value)}
                                error={selectedDesi === "" ? true : false} required>
                                {profile_data.map(item => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                })}


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <FormControl fullWidth required >
                            <FormLabel>Campaign Name</FormLabel>
                            <TextField required fullWidth placeholder='Enter Campaign Details'
                                value={selectedCamp}
                                onChange={e => setSelectedCamp(e.target.value)}
                                error={selectedCamp === "" ? true : false}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button variant='contained' color='primary' disableElevation
                            fullWidth size='large' sx={{ backgroundImage: "linear-Gradient(to right,#272727,#ECE6DB)" }}
                            onClick={handleSelectedClick} disabled={selectedDisable}>
                            SUBMIT EVALUATION
                        </Button>
                    </Grid>
                </>
                : ""}
            {status === 2 ?
                <>
                    <Grid item xs={12} sm={12} md={12}>
                        <FormControl fullWidth required size='small'>
                            <FormLabel>Reason For Rejection</FormLabel>
                            <Select error={rejectedReason === "" ? true : false}
                                value={rejectedReason} onChange={e => setRejectedReason(e.target.value)}>
                                {rejectionReason.map(item => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                })}


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button variant='contained' color='primary'
                            disableElevation fullWidth size='large'
                            sx={{ backgroundImage: "linear-Gradient(to right,#272727,#ECE6DB)" }}
                            onClick={handleRejectClick} disabled={rejectedDisable}>
                            SUBMIT EVALUATION
                        </Button>
                    </Grid>
                </>
                : ""}
            {
                status === 3 ?
                    <>
                        <Grid item xs={6} sm={6} md={6}>
                            <FormControl fullWidth required >
                                <FormLabel>Salary Offered</FormLabel>
                            </FormControl>
                            <TextField required fullWidth
                                value={holdSal}
                                error={holdSal === "" ? true : false}
                                onChange={e => setHoldSal(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment>,
                                }} />

                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <FormControl fullWidth required >
                                <FormLabel>Designation</FormLabel>
                                <Select value={holddesi}
                                    onChange={e => setHoldDesi(e.target.value)}
                                    error={holddesi === "" ? true : false} required>
                                    {profile_data.map(item => {
                                        return (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Button variant='contained' color='primary'
                                disableElevation fullWidth size='large'
                                sx={{ backgroundImage: "linear-Gradient(to right,#272727,#ECE6DB)" }}
                                disabled={holdDisable}
                                onClick={handleHoldClick}>
                                SUBMIT EVALUATION
                            </Button>
                        </Grid>
                    </>
                    :
                    null
            }
            {
                status === 4 ?
                    <>
                        <Grid item xs={6} sm={4} md={4}>
                            <FormControl fullWidth required >
                                <FormLabel>Salary Offered</FormLabel>
                                <TextField required fullWidth
                                    error={shortlistSal === "" ? true : false}
                                    value={shortlistSal}
                                    onChange={e => setShortlistSal(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment>,
                                    }} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <FormControl fullWidth required >
                                <FormLabel>Designation</FormLabel>
                                <Select error={shortlistDesi === "" ? true : false}
                                    value={shortlistDesi}
                                    onChange={e => setShortlistDesi(e.target.value)}
                                    required>
                                    {profile_data.map(item => {
                                        return (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <FormControl fullWidth required >
                                <FormLabel>Campaign Name</FormLabel>
                                <TextField required fullWidth
                                    placeholder='Enter Campaign Details'
                                    error={shortlistCamp === "" ? true : false}
                                    value={shortlistCamp}
                                    onChange={e => setShortlistCamp(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Button variant='contained' color='primary'
                                disableElevation fullWidth size='large'
                                sx={{ backgroundImage: "linear-Gradient(to right,#272727,#ECE6DB)" }}
                                disabled={shortlistDisable} onClick={handleShortlistClick}>
                                SUBMIT EVALUATION
                            </Button>
                        </Grid>
                    </>
                    :
                    null
            }

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


export default FinalRound