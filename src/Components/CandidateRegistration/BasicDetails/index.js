import * as React from 'react';
import {
    Container, Grid, Button, TextField, FormControl,
    InputLabel, MenuItem, Select, InputAdornment, CircularProgress, FormLabel
} from "@mui/material";

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { DateFormater, referred_by_data } from "../../Global/Utils/common_data.js";
import axios from 'axios';
import URL from "../../Global/Utils/url_route.js";

//new code 
import pincode from "pincode-distance";

import dayjs, { isDayjs } from 'dayjs';

function BasicDetails(props) {


    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit

        setImages(imageList);
    };

    const ref_data = referred_by_data;

    const profile_data = ["Customer Service Representative", "Sr Customer Service Representative",
        "Customer Sales Representative", "Sr Customer Sales Representative", "HR Recruiter", "HR Executive",
        "HR Manager", "Front Desk Executive", "IT Support Administration ", "Quality Analyst",
        "Sr Quality Analyst", "Subject Matter Expert", "Team Leader", "Vice President",
        "Operations Manager", "Sr Operations Manager", "Group Manager", "Assistant Manager",
        "Admin & Facility Team Lead", "Admin & Facility - Executive", "Work Force Management",
        "Softkill Trainer", "Chief Executive Officer", "Chief Operating Officer",
        "Chief Financial Officer", "Security Guard", "House Keeping"];

    const [mobile, setMobile] = React.useState(props.data.mobile_number);
    const [first_name, setFirst] = React.useState(props.data.fname);
    const [last_name, setLast] = React.useState(props.data.lname);
    const [mobile2, setMobile2] = React.useState(props.data.alt_mobile);
    const [email, setEmail] = React.useState(props.data.email);
    const [gender, setGender] = React.useState(props.data.gender);
    const [designation, setDesignation] = React.useState(props.data.designation);
    const [referred, setReferred] = React.useState(props.data.ref_by);
    const [others, setOthers] = React.useState(props.data.ref_others === "" ? false : true);
    const [othersVal, setOthersVal] = React.useState(props.data.ref_others);
    const [dob, setDob] = React.useState(props.data.dob !== "" ? props.data.dob : dayjs(''));
    // const [dob, setDob] = React.useState( dayjs(''));  // new one
    const [years, setYears] = React.useState(props.data.years !== undefined ? props.data.years : "");
    const [months, setMonths] = React.useState(props.data.months !== undefined ? props.data.months : "");
    const [address, setAddress] = React.useState(props.data.address !== undefined ? props.data.address : "");

    const [showSpinner, setSpinner] = React.useState(false);
    const [empWalkIn, setempWalkIn] = React.useState(false);
    const [disableNext, setdisableNext] = React.useState(true);


    const [emp, setEmp] = React.useState(null);
    const [hrBy, setHrby] = React.useState("");
    const [checkMobile, setCheckMobile] = React.useState(null);


    const [error, setError] = React.useState(true);
    const [helperText, setHelperText] = React.useState('');

    const [numErr, setnumErr] = React.useState(false)

    //new code 
    const [zipCode, setZipCode] = React.useState('');
    const [ziperrortext, setziperrortext] = React.useState('')
    const [distance, setDistance] = React.useState('')
    const [dobpresent, setDobPresent] = React.useState(false);

    //new code 
    const handleClick = () => {
        let Others = othersVal !== "" ? othersVal : "";

        let basicdetails = {
            mobile_number: mobile,
            fname: first_name.toLowerCase(),
            lname: last_name.toLowerCase(),
            alt_mobile: mobile2,
            email: email,
            gender: gender,
            designation: designation,
            ref_by: referred,
            ref_others: Others,
            dob: DateFormater(dob),
            years: years,
            months: months,
            profile_pic: images[0],
            address: address,
            HR: hrBy,
            company_pin: ' 560043',
            pincode: zipCode,
            distance: distance
        };

        props.handleBasic(basicdetails);
        // props.handleNext();
    }


    const handleRef = (event) => {
        setReferred(event.target.value);
        if (event.target.value === "Others" || event.target.value === "Job Portal" || event.target.value === "Employee Reference" || event.target.value === "Consultancy") {
            setOthers(true);
            setempWalkIn(false);
        }
        else if (event.target.value === "Walk In HR") {
            setempWalkIn(true);
            setOthers(false);
        }
        else {
            setempWalkIn(false);
            setOthers(false);
        }
    }


    const handleHR = (event) => {
        setHrby(event.target.value);
    }


    React.useEffect(() => {
        const isAnyFieldEmpty =
            mobile === "" ||
            first_name === "" ||
            email === "" ||
            gender === "" ||
            referred === "" ||
            // dob === dayjs('') ||
            designation === "" ||
            checkMobile === "" ||
            checkMobile === null ||
            address === "" ||
            years === "" ||
            months === "" ||
            (empWalkIn && hrBy === "") ||
            (others && othersVal === "") ||
            !Boolean(zipCode) ||
            ziperrortext !== '' ||
            dobpresent === false
            ;

        setdisableNext(isAnyFieldEmpty);
    }, [
        mobile,
        first_name,
        email,
        gender,
        referred,
        designation,
        checkMobile,
        address,
        years,
        months,
        empWalkIn,
        hrBy,
        others,
        othersVal,
        zipCode,
        ziperrortext,
        dobpresent
    ]);


    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);


        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9]+$/;

        if (!emailRegex.test(value)) {
            setError(true);
            setHelperText('Please enter a valid email address');
        } else {
            setError(false);
            setHelperText('');
        }
    };



    React.useEffect(() => {
        if (dob.isValid() && !dob.isSame(dayjs(''))) {
            setDobPresent(true)
        } else {
            setDobPresent(false)
        }
    }, [dob]);

    //new code 
    const parseFormattedDate = (formattedDate) => {
        const [day, month, year] = formattedDate.split('/').map(Number);
        return new Date(year, month - 1, day);
    };


    //new code 
    const checkMobileExists = () => {
        if (mobile.length < 10 || mobile.length > 10) {
            setnumErr(true)
            return
        } else {
            setSpinner(true);
            let request = mobile;
            if (request !== "" && request !== " " && request !== null) {
                let url = URL + "candidates/" + request;
                axios.get(url)
                    .then((response) => {
                        let res = response.data;
                        setEmp(res.emp_details);
                        if (res.status === 0) {
                            setCheckMobile(false);

                            setFirst('')
                            setLast('')
                            setEmail('')
                            setGender('')
                            setAddress('')
                            setDesignation('')
                            setReferred('')
                            setDob(dayjs(''))
                            setMobile2('')
                            setYears('')
                            setMonths('')
                            setZipCode('')

                        }
                        else {
                            setFirst(res.candidate_details.f_name_basic)
                            setLast(res.candidate_details.l_name_basic)
                            setEmail(res.candidate_details.email_basic)
                            setGender(res.candidate_details.gender)
                            setAddress(res.candidate_details.address)
                            setDesignation(res.candidate_details.job_profile_basic)
                            setReferred(res.candidate_details.ref_by_basic)

                            const unFormattedDate = dayjs(res.candidate_details.dob, 'DD/MM/YYYY');

                            setDob(unFormattedDate)
                            setMobile2(res.candidate_details.alt_mobile_basic)
                            setYears(res.candidate_details.years)
                            setMonths(res.candidate_details.months)
                            setZipCode(res.candidate_details.pincode)


                            setCheckMobile(false);
                            setError(false);
                        }

                    })
                    .catch((err) => {
                        console.log("ERROR", JSON.stringify(err));
                    })
                    .finally(() => {
                        setSpinner(false);
                    });
            }

        }

    }

    const clearError = () => {
        setSpinner(false);
        setCheckMobile(null);
        setdisableNext(true);
    }

    const handleNumber = (e) => {
        const mobileNumber = e.target.value
        if (mobileNumber.length > 10) {
            setnumErr(true)

        } else {
            setMobile(mobileNumber)
            setnumErr(false)
        }

    }

    const handleName = (e) => {
        const name = e.target.value;
        if (/^[a-zA-Z]*$/.test(name)) {
            setFirst(name)
        }
    }


    const handleCalculateDistance = (e) => {
        const inputZipCode = e.target.value;
        setZipCode(inputZipCode);

        if (!/^\d{6}$/.test(inputZipCode)) {
            setziperrortext('Pincode must be exactly 6 digits.');
            setDistance(null);
            return;
        }

        const PincodeInstance = new pincode();
        const calculatedDistance = PincodeInstance.getDistance("560043", inputZipCode);
        let roundedDistance = Math.round(calculatedDistance);

        if (roundedDistance === -1) {
            setziperrortext('Please check your Pin Code...');
            setDistance(null);
        } else {
            setziperrortext('');
            setDistance(roundedDistance);
        }
    };


    return (
        <Container >
            <Grid container spacing={2} >

                {/* Mobile Number */}
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        fullWidth
                        id="mobile_number"
                        label="Mobile"
                        variant="outlined"
                        size='small'
                        required
                        value={mobile}
                        placeholder='Enter Your Mobile Number'
                        error={mobile === "" || checkMobile ? true : false || numErr ? true : false}
                        type='number'
                        // onChange={e => setMobile(e.target.value)}
                        onChange={handleNumber}
                        onFocus={clearError}
                        onBlur={checkMobileExists}
                        helperText={checkMobile !== null && checkMobile ? "Mobile Number Already Exists." : "" || numErr ? " Only ten digits are allowed" : ""}
                        inputProps={{
                            maxLength: 10,
                            // minLength: 10
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {checkMobile != null ?
                                    checkMobile ?
                                        <CancelOutlinedIcon color='error' /> :
                                        <CheckCircleOutlineOutlinedIcon color='success' /> : showSpinner ? <CircularProgress color='success' size={"20"} /> : null}
                            </InputAdornment>,

                        }} />
                </Grid>

                {/* Datepicker */}
                <Grid item xs={12} sm={6} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Date of Birth"
                                format='DD/MM/YYYY'
                                value={dob}
                                onChange={(newValue) => setDob(newValue)}
                                // slotProps={{
                                //     textField: {
                                //         size: 'small',
                                //         helperText: dobtext,
                                //         FormHelperTextProps: {
                                //             sx: { color: 'red' },
                                //         },
                                //     },
                                // }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                {/* firstname */}
                <Grid item xs={12} sm={6} md={6} >
                    <TextField
                        fullWidth
                        id="first_name"
                        label="First Name"
                        variant="outlined"
                        size="small"
                        required
                        error={first_name === "" ? true : false}
                        value={first_name}
                        onChange={handleName}
                    //  onChange={e => setFirst(e.target.value)}
                    />
                </Grid>

                {/* lastname */}
                <Grid item xs={12} sm={4} md={6}>
                    <TextField fullWidth id="last_name" label="Last Name"
                        variant="outlined" size="small"
                        value={last_name} onChange={e => setLast(e.target.value)} />
                </Grid>

                {/* mobilenumber2 */}
                <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth id="mobile_number2" label="Alternate Mobile"
                        variant="outlined" size="small" type='number'

                        value={mobile2} onChange={e => setMobile2(e.target.value)} />
                </Grid>

                {/* email */}
                <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth id="email" label="Email"
                        variant="outlined" size="small" required
                        error={error}
                        type='email'
                        value={email}
                        helperText={helperText}
                        onChange={handleEmailChange}
                    />
                </Grid>

                {/* Address */}
                <Grid item xs={12} sm={12} md={12}>
                    <TextField required size='small' label="Address"
                        multiline rows={3} fullWidth
                        variant='outlined'
                        error={address === "" ? true : false}
                        value={address} onChange={e => setAddress(e.target.value)}
                    />
                </Grid>

                {/* //new */}
                <Grid item xs={12} sm={12} md={12}>
                    {/* pin code*/}
                    <Grid>
                        <TextField
                            size='small'
                            label="Enter Zip Code"
                            variant="outlined"
                            value={zipCode}
                            error={zipCode === '' || ziperrortext !== '' ? true : false}
                            helperText={ziperrortext}
                            onChange={handleCalculateDistance}
                        />
                    </Grid>
                </Grid>


                {/* Gender */}
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth size='small' required>
                        <InputLabel id="gender">Gender</InputLabel>
                        <Select
                            id="gender"
                            value={gender}
                            label="Gender"
                            error={gender === "" ? true : false}
                            onChange={e => setGender(e.target.value)}>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Designation */}
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth size='small' required>
                        <InputLabel id="job_profile_label">Designation</InputLabel>
                        <Select
                            id="job_profile"
                            value={designation}
                            label="Job Profile"
                            error={designation === "" ? true : false}
                            onChange={e => setDesignation(e.target.value)}>
                            {profile_data.map(data => {
                                return (
                                    <MenuItem value={data}>{data}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                {/* ReferredBy */}
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth size='small' required>
                        <FormLabel >Referred By</FormLabel>
                        <Select
                            id="ref_by"

                            value={referred}
                            error={referred === "" ? true : false}
                            onChange={handleRef}>
                            {ref_data.map(data => {
                                return (
                                    <MenuItem value={data}>{data}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                </Grid>

                {/* ReferenceDetails */}
                {others ? <><Grid item xs={12} sm={6} md={6}></Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth>
                            <FormLabel>{referred + " Details"}</FormLabel>
                            <TextField
                                fullWidth
                                id="othersVal"
                                variant="outlined"
                                size="small"
                                error={othersVal === "" ? true : false}
                                placeholder={"Please Enter " + referred + " Details"}
                                value={othersVal}
                                onChange={e => setOthersVal(e.target.value)} />
                        </FormControl>

                    </Grid></> : ""}

                {/* HrDetails */}
                {empWalkIn ? <><Grid item xs={12} sm={6} md={6}></Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth size='small' required>
                            <FormLabel >Select HR Details</FormLabel>
                            <Select
                                id="ref_hr"
                                onChange={handleHR}
                                error={hrBy === "" ? true : false}
                            >

                                {emp.map(data => {
                                    return (
                                        <MenuItem value={data.emp_id}>{"( " + data.emp_id + " ) " + data.emp_name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                    </Grid></> : ""}

                {/* YearsofExperience */}
                <Grid item xs={6} sm={3} md={3}>
                    <FormControl size='small' >
                        <FormLabel>Total Experience</FormLabel>
                        <TextField fullWidth id="years"
                            placeholder='Enter Years (0-100)'
                            type='number'
                            inputProps={{
                                maxLenght: 1,
                                minLenght: 3
                            }}
                            error={years === "" ? true : false}
                            InputProps={{ endAdornment: <InputAdornment position="end">Years</InputAdornment> }}
                            variant="outlined" size="small"
                            value={years}
                            onChange={e => setYears(e.target.value)} />
                    </FormControl>
                </Grid>

                {/* MonthofExperience */}
                <Grid item xs={6} sm={3} md={3}>
                    <FormControl size='small'>
                        <FormLabel>*</FormLabel>
                        <TextField id="years"
                            variant="outlined" size="small"
                            type='number'
                            sx={{ paddingLeft: "12px" }}
                            error={months === "" ? true : false}
                            inputProps={{
                                maxLenght: 1,
                                minLenght: 2
                            }}
                            placeholder='Enter Months (0-12)'
                            InputProps={{ endAdornment: <InputAdornment position="end">Months</InputAdornment> }}
                            value={months} onChange={e => setMonths(e.target.value)} />
                    </FormControl>
                </Grid>

                {/* NextButton */}
                <Grid item xs={12} sm={12} md={12}>
                    <Button variant='contained' color='success' disabled={disableNext} disableElevation fullWidth onClick={handleClick}>
                        NEXT
                    </Button>
                </Grid>
            </Grid>



        </Container>
    )

}


export default BasicDetails;