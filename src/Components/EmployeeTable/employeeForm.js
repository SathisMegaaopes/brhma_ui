import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            },
        },
    ],
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
        4: <VideoLabelIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['BASIC INFORMATION', 'EMPLOYEE POSITION', ' STATUTORY INFO', 'PAYMENT MODE'];

// export default function EmployeeForm() {
//     const [activeStep, setActiveStep] = React.useState(0);
//     const [skipped, setSkipped] = React.useState(new Set());

//     const isStepOptional = (step) => {
//         return step === 1;
//     };

//     const isStepSkipped = (step) => {
//         return skipped.has(step);
//     };

//     const handleNext = () => {
//         let newSkipped = skipped;
//         if (isStepSkipped(activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(activeStep);
//         }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleSkip = () => {
//         if (!isStepOptional(activeStep)) {
//             throw new Error("You can't skip a step that isn't optional.");
//         }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped((prevSkipped) => {
//             const newSkipped = new Set(prevSkipped.values());
//             newSkipped.add(activeStep);
//             return newSkipped;
//         });
//     };

//     const handleReset = () => {
//         setActiveStep(0);
//     };

//     return (

//         <Box sx={{ width: '100%' }} >
//             <Stack sx={{ width: '100%' }} spacing={4} >
//                 <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
//                     {steps.map((label, index) => {
//                         const stepProps = {};
//                         const labelProps = {};
//                         if (isStepOptional(index)) {
//                             labelProps.optional = (
//                                 <Typography variant="caption">Optional</Typography>
//                             );
//                         }
//                         if (isStepSkipped(index)) {
//                             stepProps.completed = false;
//                         }
//                         return (
//                             <Step key={label} {...stepProps}>
//                                 <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>{label}</StepLabel>
//                             </Step>
//                         );
//                     })}
//                 </Stepper>
//             </Stack>

//             {activeStep === 0 &&
//                 <Box sx={{ mt: 4 }}>
//                     <Grid container spacing={2} xs={12}>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Field 1" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Field 2" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Field 3" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Field 4" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Field 5" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Field 6" />
//                         </Grid>
//                     </Grid>
//                 </Box>
//             }

//             {activeStep === steps.length ? (
//                 <React.Fragment>
//                     <Typography sx={{ mt: 2, mb: 1 }}>
//                         All steps completed - you&apos;re finished
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Box sx={{ flex: '1 1 auto' }} />
//                         <Button onClick={handleReset}>Reset</Button>
//                     </Box>
//                 </React.Fragment>
//             ) : (
//                 <React.Fragment>
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Button
//                             color="inherit"
//                             disabled={activeStep === 0}
//                             onClick={handleBack}
//                             sx={{ mr: 1 }}
//                         >
//                             Back
//                         </Button>
//                         <Box sx={{ flex: '1 1 auto' }} />
//                         {isStepOptional(activeStep) && (
//                             <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                                 Skip
//                             </Button>
//                         )}
//                         <Button onClick={handleNext}>
//                             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                         </Button>
//                     </Box>
//                 </React.Fragment>
//             )}
//         </Box>
//     );
// }




export default function EmployeeForm() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (

        <Box sx={{ width: '100%' }} >
            <Stack sx={{ width: '100%' }} spacing={4} >
                <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (isStepOptional(index)) {
                        //     labelProps.optional = (
                        //         <Typography variant="caption">Optional</Typography>
                        //     );
                        // }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Stack>


            {/* <TextField
                                required
                                id='employee_number'
                                // size='medium'
                                fullWidth
                                label="Employee Number"
                                // value={}
                                variant='outlined'
                                placeholder='Enter Employee Number'
                                error={true}
                                // onChange={}
                                // type='number'
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                helperText={"Employee Id is required"}
                                inputMode='numeric'
                                inputProps={{
                                    maxLength: 10,
                                    // pattern: "[a-zA-Z0-9]*",
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            .com
                                        </InputAdornment>
                                    ),
                                    disableUnderline: false,
                                }}
                            /> */}






            {/*         Employee Number (Auto Generated in series and should be unique)
                        Employee Name*
                        Date of Birth*
                        Date of Joining*
                        Gender (Male, Female and Others)*
                        Reporting Manager
                        Reporting Team Lead
                        Designation*
                        Department*
                        Team*
                        Salary Offered (Monthly Net)  */}


            {/* 

Address Proof – (Aadhaar, Driving License, Bank Statement, Phone Bill, Gas Bill, etc..)
Address Proof copy upload
ESI Number
UAN Number
PF Number
PF Join Date
Previous Organization Name 1
Designation
Start Date
End Date
Total Experience (Auto generated using start and End date
Previous Organization Name 2
Designation
Start Date
End Date
Total Experience (Auto generated using start and End date
Previous Organization Name 3
Designation
Start Date
End Date
Total Experience (Auto generated using start and End date
Total Experience in months relevant to current position
Total Overall Experience in months (including relevant and irrelevant to current position)
Background Check Status (Yes/No) */}




            {activeStep === 0 &&
                <Box sx={{ mt: 4, width: '100%', bgcolor: '', }} >
                    <Grid container spacing={2} xs={12}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='employee_number'
                                fullWidth
                                label="Employee Number"
                                variant='outlined'
                                placeholder='Enter Employee Number'
                                type='number'
                                inputMode='numeric'
                                // size='medium'
                                // value={}
                                // error={}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                // helperText={}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='employee_name'
                                fullWidth
                                label="Employee Name"
                                variant='outlined'
                                placeholder='Enter Employee Name'
                                type='text'
                                inputMode='text'
                                // size='medium'
                                // value={}
                                // error={}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                // helperText={}
                                inputProps={{
                                    maxLength: 10,
                                }}
                            // onInput={(e) => {
                            //     e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                            // }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='employee_dob'
                                fullWidth
                                label="Date of Birth"
                                variant='outlined'
                                placeholder='Enter Date of Birth'
                                type='date'
                                // inputMode=''
                                // size='medium'
                                // value={}
                                // error={}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                // helperText={}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='employee_doj'
                                fullWidth
                                label="Date of Join"
                                variant='outlined'
                                placeholder='Enter Date of Join'
                                type='date'
                            // inputMode=''
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <FormControl fullWidth size='medium' required>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    id="gender"
                                    fullWidth
                                    label="Gender"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Others"}>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Reporting Manager</InputLabel>
                                <Select
                                    id="Reporting_Manager"
                                    label="Reporting Manager"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>One</MenuItem>
                                    <MenuItem value={"Female"}>Two</MenuItem>
                                    <MenuItem value={"Others"}>Three</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Reporting Team Lead</InputLabel>
                                <Select
                                    id="Reporting Team Lead"
                                    label="Reporting Team Lead"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>One</MenuItem>
                                    <MenuItem value={"Female"}>Two</MenuItem>
                                    <MenuItem value={"Others"}>Three</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Designation</InputLabel>
                                <Select
                                    id="Designation"
                                    label="Designation"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>One</MenuItem>
                                    <MenuItem value={"Female"}>Two</MenuItem>
                                    <MenuItem value={"Others"}>Three</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Department</InputLabel>
                                <Select
                                    id="Department"
                                    label="Department"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>One</MenuItem>
                                    <MenuItem value={"Female"}>Two</MenuItem>
                                    <MenuItem value={"Others"}>Three</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Team</InputLabel>
                                <Select
                                    id="Team"
                                    label="Team"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>One</MenuItem>
                                    <MenuItem value={"Female"}>Two</MenuItem>
                                    <MenuItem value={"Others"}>Three</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Salary_Offered'
                                fullWidth
                                label="Salary Offered"
                                variant='outlined'
                                placeholder='Enter Salary Offered (Monthly Net)'
                                type='number'
                                inputMode='numeric'
                                // size='medium'
                                // value={}
                                // error={}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                // helperText={}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Attendance_Bonus'
                                fullWidth
                                label="Attendance Bonus"
                                variant='outlined'
                                // placeholder='Enter Salary Offered (Monthly Net)'
                                // type='number'
                                // inputMode='numeric'
                                // size='medium'
                                // value={}
                                error={true}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                helperText={"Need to work on this again .."}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Total_Monthly_CTC'
                                fullWidth
                                label="Total Monthly CTC"
                                variant='outlined'
                                // placeholder='Enter Salary Offered (Monthly Net)'
                                // type='number'
                                // inputMode='numeric'
                                // size='medium'
                                // value={}
                                error={true}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                helperText={"Need to work on this again .."}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Total_Yearly_CTC'
                                fullWidth
                                label="Total Yearly CTC"
                                variant='outlined'
                                // placeholder='Enter Salary Offered (Yearly Net)'
                                // type='number'
                                // inputMode='numeric'
                                // size='medium'
                                // value={}
                                error={true}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                helperText={"Need to work on this again .."}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Billable Status</InputLabel>
                                <Select
                                    id="Billable_Status"
                                    label="Billable Status"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Billable"}>Billable</MenuItem>
                                    <MenuItem value={"Non-Billable"}>Non-Billable</MenuItem>
                                    <MenuItem value={"Partially Billed"}>Partially Billed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Employee_Confirmation_Status '
                                fullWidth
                                // label="Employee Confirmation Status "
                                variant='outlined'
                                // placeholder='Enter Salary Offered (Yearly Net)'
                                type='date'
                                // size='medium'
                                // value={}
                                error={true}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                helperText={"Need to work on this again .."}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Replace any non-digit characters
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                id="email"
                                label="Email"
                                variant="outlined"
                                required
                                // error={error}
                                type='email'
                                inputMode='email'
                            // value={email}
                            // helperText={helperText}
                            // onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="Phone_number"
                                label="Enter Phone Number"
                                variant="outlined"
                                type='number'
                                inputMode='numeric'
                            // value={mobile2}
                            // onChange={e => setMobile2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="Mobile_number"
                                label="Enter Mobile Number"
                                variant="outlined"
                                type='number'
                                inputMode='numeric'
                            // value={mobile2}
                            // onChange={e => setMobile2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Emergency_Contact_Name'
                                fullWidth
                                label="Emergency Contact Name"
                                variant='outlined'
                                placeholder='Enter Emergency Contact Name'
                                type='text'
                                inputMode='text'
                            // value={mobile2}
                            // onChange={e => setMobile2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="Emergency_Contact_Number "
                                label="Enter Emergency Contact Number"
                                variant="outlined"
                                type='number'
                                inputMode='numeric'
                            // value={mobile2}
                            // onChange={e => setMobile2(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='emergency_contact_relation'
                                fullWidth
                                label="Emergency Contact Relation (Should be blood relative)"
                                variant='outlined'
                                placeholder='Enter Emergency Contact Relation (Should be blood relative)'
                                type='text'
                                inputMode='text'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='father_name'
                                fullWidth
                                label="Father Name"
                                variant='outlined'
                                placeholder='Enter Father Name'
                                type='text'
                                inputMode='text'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='father_occupation'
                                fullWidth
                                label="Father Occupation"
                                variant='outlined'
                                placeholder='Enter Father Occupation'
                                type='text'
                                inputMode='text'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Spouse Name'
                                fullWidth
                                label="Spouse Name"
                                variant='outlined'
                                placeholder='Enter Spouse Name'
                                type='text'
                                inputMode='text'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='blood_group'
                                fullWidth
                                label="Blood Group"
                                variant='outlined'
                                placeholder='Enter Blood Group'
                                type='text'
                                inputMode='text'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='country_of_origin'
                                fullWidth
                                label="Country of Origin"
                                variant='outlined'
                                placeholder='Enter Country of Origin'
                                type='text'
                                inputMode='text'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='nationality'
                                fullWidth
                                label="Nationality"
                                variant='outlined'
                                placeholder='Enter Nationality'
                                type='text'
                                inputMode='text'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Physically Challenged </InputLabel>
                                <Select
                                    id="physically_challenged"
                                    label="Physically Challenged"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Yes"}>Yes</MenuItem>
                                    <MenuItem value={"No"}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        {/* Important ithu vanthu accounts oriented ones  */}

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='aadhaar_number'
                                fullWidth
                                label="Aadhaar Number"
                                variant='outlined'
                                placeholder='Enter Aadhaar Number'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='pan_number'
                                fullWidth
                                label="Pan Number"
                                variant='outlined'
                                placeholder='Enter Pan Number'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>



                        <Grid item xs={6}>
                            <TextField
                                required
                                id='passport_number'
                                fullWidth
                                label="Passport Number"
                                variant='outlined'
                                placeholder='Enter Passport Number'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='bank_account_number'
                                fullWidth
                                label="Bank Account Number"
                                variant='outlined'
                                placeholder='Enter Bank Account  Number'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='bank_ifsc_code'
                                fullWidth
                                label="Bank IFSC Code"
                                variant='outlined'
                                placeholder='Enter Bank IFSC Code'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='ceneficiary_code'
                                fullWidth
                                // label="Bank IFSC Code"
                                variant='outlined'
                                placeholder='Beneficiary Code'
                                // type=''
                                // inputMode='numeric'
                                // size='medium'
                                // value={}
                                error={true}
                                // onChange={}
                                // onFocus={} //This is to handle the error...
                                // onBlur={} //This for calling api to check if the employee Number is already exists...
                                helperText={"This is Beneficiary Code used , Will be automatically genarated....."}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='education'
                                fullWidth
                                label="Education "
                                variant='outlined'
                                placeholder='Enter Education – Highest Degree'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>

                        {/* Current Address */}
                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Employee AddressCurrent'
                                fullWidth
                                label="Employee Address"
                                variant='outlined'
                                placeholder='Enter Employee Current Address'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Area'
                                fullWidth
                                label="Area"
                                variant='outlined'
                                placeholder='Enter Area'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='pin_code'
                                fullWidth
                                label="Area"
                                variant='outlined'
                                placeholder='Enter Area'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>

                        {/* Permanent Address */}


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='Employee Address Permanent'
                                fullWidth
                                label="Employee Address - Permanent"
                                variant='outlined'
                                placeholder='Enter Employee Permanent Address'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='AreaPermanent'
                                fullWidth
                                label="AreaPermanent"
                                variant='outlined'
                                placeholder='Enter Area '
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='pin_codePermanent'
                                fullWidth
                                label="pin_codePermanent"
                                variant='outlined'
                                placeholder='Enter pin_codePermanent'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <FormControl fullWidth required>  {/* This ensures full width within the grid item */}
                                <InputLabel>Address Proof</InputLabel>
                                <Select
                                    id="address_proof"
                                    label="Physically Challenged"
                                // value={gender}
                                // error={gender === "" ? true : false}
                                // onChange={e => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Aadhaar"}>Aadhaar</MenuItem>
                                    <MenuItem value={"Driving License"}>Driving License</MenuItem>
                                    <MenuItem value={"Bank Statement"}>Bank Statement</MenuItem>
                                    <MenuItem value={"Phone Bill"}> Phone Bill</MenuItem>
                                    <MenuItem value={"Gas Bill"}> Gas Bill</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography>
                                This is the File Upload for the Address Prof...
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='esi_number'
                                fullWidth
                                label="ESI Number"
                                variant='outlined'
                                placeholder='Enter ESI Number'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='uan_number'
                                fullWidth
                                label="UAN Number"
                                variant='outlined'
                                placeholder='Enter UAN Number'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id='pf_number'
                                fullWidth
                                label="PF Number"
                                variant='outlined'
                                placeholder='Enter PF Number'
                                type='number'
                                inputMode='numeric'
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                required
                                id='pf_join_date'
                                fullWidth
                                label="PF Join Date"
                                variant='outlined'
                                placeholder='Enter PF Join Date'
                                type='date'
                            // inputMode=''
                            // size='medium'
                            // value={}
                            // error={}
                            // onChange={}
                            // onFocus={} //This is to handle the error...
                            // onBlur={} //This for calling api to check if the employee Number is already exists...
                            // helperText={}
                            />
                        </Grid>

                    </Grid>
                </Box>
            }





            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}





{/* <Grid item xs={6}> */ }
{/* <FormControl component="fieldset" error={hasError}> */ }
{/* <FormControl component="fieldset" >
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender" */}
{/* // value={gender}
                                // onChange={handleChange}
                                > */}
{/* <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup> */}
{/* {hasError && <FormHelperText>Please select your gender</FormHelperText>} */ }
{/* </FormControl> */ }
{/* </Grid> */ }
