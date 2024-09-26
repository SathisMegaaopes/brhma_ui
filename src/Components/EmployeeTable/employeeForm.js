import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Autocomplete, Avatar, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Component from './demofile';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { blue, red } from '@mui/material/colors';

// const DarkTextField = styled(TextField)(({ theme }) => ({
const DarkTextField = styled((props) => <TextField {...props} size="small" sx={{}} />)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        color: '#555555',
        '&.Mui-disabled': {
            color: '#cccccc',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#555555',
        '&.Mui-focused': {
            color: theme.palette.primary.main,
        },
        '&.Mui-disabled': {
            color: '#cccccc',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#555555',
        '&.Mui-disabled': {
            borderColor: '#cccccc',
        },
    },
}));




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
        1: <PersonIcon />,
        2: <BusinessCenterIcon />,
        3: <HistoryEduIcon />,
        4: <AssignmentIcon />,
        5: <PaymentIcon />,
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

const steps = ['BASIC INFORMATION', 'EMPLOYEE POSITION', 'EXPERIENCE', ' STATUTORY INFO', 'PAYMENT MODE']

const Designations = ['CEO', 'Software Developer', 'Vice President - HR Operations', 'Team Leader', 'HR - Telecaller', 'HR Executive', 'Front Desk Executive', 'System Admin', 'Admin Executive', 'Quality Analyst', 'Business Development Executive']

const Department = ['Executive', 'Operations', 'Human Resource', 'IT Infrastructure', 'Facility Management', 'Learning and Development', 'Business Development', 'Software Development']

const Teams = ['Management', 'Supervisor/Manager', 'Documentation and Recruitment', 'Recruitment', 'Front Office', 'IT Team', 'Admin and Facility', 'Quality Control', 'Sales', 'Software Team']

const shifts = [
    "00:00 - 09:00",
    "00:30 - 09:30",
    "01:00 - 10:00",
    "01:30 - 10:30",
    "02:00 - 11:00",
    "02:30 - 11:30",
    "03:00 - 12:00",
    "03:30 - 12:30",
    "04:00 - 13:00",
    "04:30 - 13:30",
    "05:00 - 14:00",
    "05:30 - 14:30",
    "06:00 - 15:00",
    "06:30 - 15:30",
    "07:00 - 16:00",
    "07:30 - 16:30",
    "08:00 - 17:00",
    "08:30 - 17:30",
    "09:00 - 18:00",
    "09:30 - 18:30",
    "10:00 - 19:00",
    "10:30 - 19:30",
    "11:00 - 20:00",
    "11:30 - 20:30",
    "12:00 - 21:00",
    "12:30 - 21:30",
    "13:00 - 22:00",
    "13:30 - 22:30",
    "14:00 - 23:00",
    "14:30 - 23:30",
    "15:00 - 00:00",
    "15:30 - 00:30",
    "16:00 - 01:00",
    "16:30 - 01:30",
    "17:00 - 02:00",
    "17:30 - 02:30",
    "18:00 - 03:00",
    "18:30 - 03:30",
    "19:00 - 04:00",
    "19:30 - 04:30",
    "20:00 - 05:00",
    "20:30 - 05:30",
    "21:00 - 06:00",
    "21:30 - 06:30",
    "22:00 - 07:00",
    "22:30 - 07:30",
    "23:00 - 08:00",
    "23:30 - 08:30"
];

const schemaValidationForForm = Yup.object().shape({
    employeeNumber: Yup.string()
        .required('Employee Number is required')
        .matches(/^\d+$/, 'Employee Number must contain only digits')
        .min(4, 'At least four digit is required')
        .max(6, 'No more than 6 digits allowed')
    ,
    employeeName: Yup.string()
        .required('Employee Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Employee Name must contain only characters..')
        .min(5, 'At least fives digit is required')
    ,
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    dateOfJoining: Yup.date().required('Date of Joining is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Enter a valid email')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),

    phone: Yup.string()
    // .matches(/^[2-9]\d{2}-\d{3}-\d{4}$/, 'Enter a valid Phone number')
    ,
    mobileNumber: Yup.string()
        .required('Mobile Number is required')
        .matches(/([0-9]{11}$)|(^[7-9][0-9]{9}$)/, 'Enter a valid mobile number')
        .max(10, 'Mobile number cannot be more than 10 digits.')
    ,
    emergencyContactName: Yup.string()
        .required('Emergency Contact Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Emergency Contact Name must contain only characters..')
        .min(5, 'At least fives digit is required')
    ,
    emergencyContactNumber: Yup.string()
        .required('Emergency Contact Number is required')
        .matches(/([0-9]{11}$)|(^[7-9][0-9]{9}$)/, 'Enter a valid Emergency Contact mobile number')
        .max(10, 'Emergency Contact number cannot be more than 10 digits.')

    ,
    emergencyContactRelation: Yup.string().required('Emergency Contact Relation is required'),
    fathersName: Yup.string()
        .required('Father Namet Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Father Name must contain only characters..')
        .min(5, 'At least fives digit is required')
    ,
    fathersOccupation: Yup.string(),
    spouseName: Yup.string(),
    bloodGroup: Yup.string(),
    countryOfOrigin: Yup.string(),
    nationality: Yup.string(),
    physicallyChallenged: Yup.string(),
});

const schemaValidationForForm2 = Yup.object().shape({
    reportingmanager: Yup.string().required('Reporting Manager is required'),
    reportingteamlead: Yup.string().required('Reporting Team Lead is required'),
    designation: Yup.string().required('Designation is required'),
    department: Yup.string().required('Department is required'),
    team: Yup.string().required('Team is required'),
    referrdby: Yup.string().required('ReferredBy is required'),
    employmentstatus: Yup.string().required('Employment Status is required'),
    employeestatus: Yup.string().required('Employee status is required'),
    shift: Yup.string().required('Shift is required'),
    grade: Yup.string().required('Grade is required'),
    probabationperiod: Yup.string()
        .required('Probation period is required')
        .matches(/^\d+$/, 'Employee Number must contain only digits')
        .max(4, 'Probation period cannot be four digits , please check...')
    ,
    salaryofferred: Yup.string()
        .required('Salary Offered is required')
        .matches(/^\d+$/, 'Employee Number must contain only digits')
    ,
    attendancebonus: Yup.string().required('Attendace Bonus is required'),
    totalmonthlyctc: Yup.string().required('TotalMonthly CTC is required'),
    totalyearlyctc: Yup.string().required(' TotalYearly CTC is required'),
    billablestatus: Yup.string().required('Billable Status is required'),
})

//need to check here  ///What means in terms of the Confirmation Date.....
//employeeconfirmationstatus , this also I have to check again . all are come around one thing only....

const getValidationSchema = (page) => {
    if (page === 0) {
        return schemaValidationForForm;
    } else if (page === 1) {
        return schemaValidationForForm2;
    }
    return Yup.object().shape({});
};

const StyledContainer = styled(Grid)`
  display: flex;
  align-items: center;
`;

// Styled label
const StyledLabel = styled('label')`
  font-weight: bold;
  margin-right: 16px; 
`;

// const StyledInput = styled(TextField)(({ theme }) => ({

//     '& .MuiInputBase-root': {
//         height: '40px',
//     },

// }));


const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        height: '40px',
        width: '100%',  // Ensure the input takes full width
    },
}));


export default function EmployeeForm() {

    const [activeStep, setActiveStep] = React.useState(0);

    const { control, handleSubmit, getValues, setValue, trigger, formState: { errors, isValid, isSubmitting ,isSubmitSuccessful } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(getValidationSchema(activeStep)),
    });

    const [isPFChecked, setIsPFChecked] = React.useState(false);
    const [isESIChecked, setIsESIChecked] = React.useState(false);
    const [isLWFChecked, setIsLWFChecked] = React.useState(false);

    // const [formData, setFormData] = React.useState({
    //     email: '',
    //     employeeNumber: '',
    //     employeeName: '',
    //     dateOfBirth: '',
    //     dateOfJoining: '',
    //     gender: '',
    //     phone: '',
    //     mobileNumber: '',
    //     emergencyContactName: '',
    //     emergencyContactNumber: '',
    //     emergencyContactRelation: '',
    //     fathersName: '',
    //     fathersOccupation: '',
    //     spouseName: '',
    //     bloodGroup: '',
    //     countryOfOrigin: '',
    //     nationality: '',
    //     physicallyChallenged: '',
    //     //new code....
    //     reportingmanager: '',
    //     reportingteamlead: '',
    //     designation: '',
    //     department: '',
    //     team: '',
    //     referrdby: '',
    //     employmentstatus: '',
    //     employeestatus: '',
    //     shift: '',
    //     grade: '',
    //     probabationperiod: '',
    //     salaryofferred: '',
    //     totalmonthlyctc: '',
    //     totalyearlyctc: '',
    //     attendancebonus: '',
    //     billablestatus: '',
    // });


    const [formData, setFormData] = React.useState({
        email: 'test@gmail.com',
        employeeNumber: '',
        employeeName: '',
        dateOfBirth: '2024-09-26',
        dateOfJoining: '2024-09-26',
        gender: 'Male',
        phone: '',
        mobileNumber: '8778164504',
        emergencyContactName: 'sssssss',
        emergencyContactNumber: '8778164504',
        emergencyContactRelation: 'sssssssss',
        fathersName: 'iiiiiiiiiiiii',
        fathersOccupation: '',
        spouseName: '',
        bloodGroup: '',
        countryOfOrigin: '',
        nationality: '',
        physicallyChallenged: '',
        //new code....
        reportingmanager: '',
        reportingteamlead: 'Kannan R',
        designation: 'CEO',
        department: 'Executive',
        team: 'Supervisor/Manager',
        referrdby: 'Male',
        employmentstatus: 'Male',
        employeestatus: 'Male',
        shift: '07:00 - 16:00',
        grade: 'L1',
        probabationperiod: '180',
        salaryofferred: '12000',
        totalmonthlyctc: '12000',
        totalyearlyctc: '12000',
        attendancebonus: 'Yes',
        billablestatus: 'Billable',
    });

    const [selectedPaymentType, setSelectedPaymentType] = React.useState('');


    const salaryOfferred = useWatch({ control, name: 'salaryofferred' });


    const handleCheckboxChange = (event) => {
        setIsPFChecked(event.target.checked);
    };

    const handleCheckboxESIChange = (event) => {
        setIsESIChecked(event.target.checked);
    };

    const handleCheckboxLWFChange = (event) => {
        setIsLWFChecked(event.target.checked);
    };

    const handlePaymentTypeChange = (event) => {
        setSelectedPaymentType(event.target.value);
    };

    React.useEffect(() => {
        const salary = parseFloat(salaryOfferred) || '';
        const totalMonthlyCTC = salary;
        const totalYearlyCTC = salary * 12;

        setValue('totalmonthlyctc', totalMonthlyCTC, { shouldValidate: true });
        setValue('totalyearlyctc', totalYearlyCTC, { shouldValidate: true });

        setFormData(preState => ({
            ...preState,
            totalmonthlyctc: totalMonthlyCTC,
            totalyearlyctc: totalYearlyCTC,
        }))

    }, [salaryOfferred]);



    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setFormData((prevData) => ({ ...prevData, ...getValues() }));
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onSubmit = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
        console.log('Form submitted:', formData);
    };


    const options = [
        { label: 'Kannan R', value: 'Kannan R' },
        { label: 'Shamala Nagaveni', value: 'Shamala Nagaveni' },
        { label: 'Sathis Kumar', value: 'Sathis Kumar' },
        { label: 'Santhosh', value: 'Santhosh' }
    ];

    const mapOptions = (data) => {
        return data.map(item => ({
            label: item, // Adjust as needed
            value: item    // Adjust as needed
        }));
    }

    // console.log(mapOptions(Designations), 'important dude....')

    const handleSubmit2 = () => {
        console.log('this is formData', formData)
        console.log('this is isSubmitting', isSubmitting)
        console.log('this is isSubmitSuccessful', isSubmitSuccessful)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>

            <Box component="form" sx={{ mt: 6, }} onSubmit={handleSubmit(onSubmit)}  >
                <Grid container >  {/* Whole Parent Container */}
                    {activeStep === 0 && (
                        <>
                            <Grid container xs={12} paddingLeft={0}  > {/* First Half  Parent Container */}

                                <Grid container xs={2} > {/* Avatar container */}

                                    <Grid item xs={12} paddingLeft={5}>
                                        <Avatar
                                            sx={{ width: 200, height: 200 }}
                                            alt="Profile Image"
                                            src="https://images.pexels.com/photos/4629633/pexels-photo-4629633.jpeg?cs=srgb&dl=pexels-cottonbro-4629633.jpg&fm=jpg"
                                        />
                                    </Grid>

                                </Grid>

                                <Grid container xs={10} paddingLeft={6} columnGap={2} >  {/* Basic Details , like name and other container */}

                                    <Grid container xs={6} spacing={1} >  {/* First Half container */}

                                        <Grid container alignItems="center" paddingBottom={2} >
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Employee Name <span style={{ color: 'red' }}>*</span>
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="employeeName"
                                                    control={control}
                                                    defaultValue={formData.employeeName}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            variant="outlined"
                                                            error={!!errors.employeeName}
                                                            helperText={errors.employeeName ? errors.employeeName.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" paddingBottom={2}>
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Employee Number <span style={{ color: 'red' }}>*</span>
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="employeeNumber"
                                                    control={control}
                                                    defaultValue={formData.employeeNumber}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            variant="outlined"
                                                            error={!!errors.employeeNumber}
                                                            helperText={errors.employeeNumber ? errors.employeeNumber.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" paddingBottom={2}>
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Email Address <span style={{ color: 'red' }}>*</span>
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    defaultValue={formData.email}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            variant="outlined"
                                                            error={!!errors.email}
                                                            helperText={errors.email ? errors.email.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" paddingBottom={2}>
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Mobile Number <span style={{ color: 'red' }}>*</span>
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="mobileNumber"
                                                    control={control}
                                                    defaultValue={formData.mobileNumber}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            variant="outlined"
                                                            error={!!errors.mobileNumber}
                                                            helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <Grid container xs={6} spacing={1} >  {/* Second Half  container */}

                                        <Grid container alignItems="center" paddingBottom={2}>
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Date of Birth <span style={{ color: 'red' }}>*</span>
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="dateOfBirth"
                                                    control={control}
                                                    defaultValue={formData.dateOfBirth}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            type="date"
                                                            variant="outlined"
                                                            InputLabelProps={{ shrink: true }}
                                                            error={!!errors.dateOfBirth}
                                                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'relative', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" paddingBottom={2}>
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Gender <span style={{ color: 'red' }}>*</span>
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="gender"
                                                    control={control}
                                                    defaultValue={formData.gender}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            select
                                                            variant="outlined"
                                                            error={!!errors.gender}
                                                            helperText={errors.gender ? errors.gender.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        >
                                                            <MenuItem value="Male">Male</MenuItem>
                                                            <MenuItem value="Female">Female</MenuItem>
                                                            <MenuItem value="Others">Others</MenuItem>
                                                        </StyledInput>
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" paddingBottom={2}>
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Phone Number <span style={{ color: 'red' }}>*</span>
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    defaultValue={formData.phone}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            variant="outlined"
                                                            error={!!errors.phone}
                                                            helperText={errors.phone ? errors.phone.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" paddingBottom={2}>
                                            <Grid item xs={4}>
                                                <StyledLabel>
                                                    Blood Group
                                                </StyledLabel>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Controller
                                                    name="bloodGroup"
                                                    control={control}
                                                    defaultValue={formData.bloodGroup}
                                                    render={({ field }) => (
                                                        <StyledInput
                                                            fullWidth
                                                            {...field}
                                                            variant="outlined"
                                                            error={!!errors.bloodGroup}
                                                            helperText={errors.bloodGroup ? errors.bloodGroup.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </Grid>

                            </Grid>

                            <Grid container xs={12} bgcolor={''} marginTop={2}  > {/* Second Half Parent Container */}

                                <Grid container xs={4} bgcolor={''} > {/* Second Half child - 1  Container */}

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Date of Joining <span style={{ color: 'red' }}>*</span>
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="dateOfJoining"
                                                control={control}
                                                defaultValue={formData.dateOfJoining}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        type="date"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        InputLabelProps={{ shrink: true }}
                                                        error={!!errors.dateOfJoining}
                                                        helperText={errors.dateOfJoining ? errors.dateOfJoining.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Date of Joining <span style={{ color: 'red' }}>*</span></span>}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Emergency Contact Name <span style={{ color: 'red' }}>*</span>
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="emergencyContactName"
                                                control={control}
                                                defaultValue={formData.emergencyContactName}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.emergencyContactName}
                                                        helperText={errors.emergencyContactName ? errors.emergencyContactName.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Emergency Contact Name <span style={{ color: 'red' }}>*</span></span>}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Emergency Contact Number <span style={{ color: 'red' }}>*</span>
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="emergencyContactNumber"
                                                control={control}
                                                defaultValue={formData.emergencyContactNumber}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.emergencyContactNumber}
                                                        helperText={errors.emergencyContactNumber ? errors.emergencyContactNumber.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Emergency Contact Number <span style={{ color: 'red' }}>*</span></span>}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Emergency Contact Relation (Should be blood relative) <span style={{ color: 'red' }}>*</span>
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="emergencyContactRelation"
                                                control={control}
                                                defaultValue={formData.emergencyContactRelation}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.emergencyContactRelation}
                                                        helperText={errors.emergencyContactRelation ? errors.emergencyContactRelation.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Emergency Contact Relation (Should be blood relative) <span style={{ color: 'red' }}>*</span></span>}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid container xs={4} bgcolor={''}> {/* Second Half child - 2 Container */}

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Father's Name <span style={{ color: 'red' }}>*</span>
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="fathersName"
                                                control={control}
                                                defaultValue={formData.fathersName}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.fathersName}
                                                        helperText={errors.fathersName ? errors.fathersName.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Father's Name <span style={{ color: 'red' }}>*</span></span>}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Father's Occupation
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="fathersOccupation"
                                                control={control}
                                                defaultValue={formData.fathersOccupation}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.fathersOccupation}
                                                        helperText={errors.fathersOccupation ? errors.fathersOccupation.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Father's Occupation</span>}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Spouse Name
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="spouseName"
                                                control={control}
                                                defaultValue={formData.spouseName}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.spouseName}
                                                        helperText={errors.spouseName ? errors.spouseName.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Spouse Name</span>}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>

                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Education (Highest Level) <span style={{ color: 'red' }}>*</span>
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="education"
                                                control={control}
                                                defaultValue={formData.education}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.education}
                                                        helperText={errors.education ? errors.education.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Spouse Name</span>}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                    </Grid>

                                </Grid>

                                <Grid container xs={4} bgcolor={''}> {/* Second Half child - 3 Container */}

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Country of Origin
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="countryOfOrigin"
                                                control={control}
                                                defaultValue={formData.countryOfOrigin}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.countryOfOrigin}
                                                        helperText={errors.countryOfOrigin ? errors.countryOfOrigin.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Country of Origin</span>}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Nationality
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="nationality"
                                                control={control}
                                                defaultValue={formData.nationality}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.nationality}
                                                        helperText={errors.nationality ? errors.nationality.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Nationality</span>}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Physically Challenged (Yes/No)
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="physicallyChallenged"
                                                control={control}
                                                defaultValue={formData.physicallyChallenged}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        select
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.physicallyChallenged}
                                                        helperText={errors.physicallyChallenged ? errors.physicallyChallenged.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Physically Challenged (Yes/No)</span>}
                                                    >
                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                        <MenuItem value="No">No</MenuItem>
                                                    </StyledInput>
                                                )}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>

                                        <Grid item xs={4}>
                                            <StyledLabel>
                                                Address Proof <span style={{ color: 'red' }}>*</span>
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="addressprof"
                                                control={control}
                                                defaultValue={formData.addressprof}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        select
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.addressprof}
                                                        helperText={errors.addressprof ? errors.addressprof.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                    // label={<span>Address Proof <span style={{ color: 'red' }}>*</span></span>}
                                                    >
                                                        <MenuItem value="Aadhaar">Aadhaar</MenuItem>
                                                        <MenuItem value="Driving License">Driving License</MenuItem>
                                                        <MenuItem value="Bank Statement">Bank Statement</MenuItem>
                                                        <MenuItem value="Phone Bill">Phone Bill</MenuItem>
                                                        <MenuItem value="Gas Bill">Gas Bill</MenuItem>
                                                    </StyledInput>
                                                )}
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>
                        </>
                    )}

                    {activeStep === 1 && (
                        <>
                            <Grid container xs={4} bgcolor={''}> {/* First vertical page 2 Container */}

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Reporting Manager <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>

                                    <Grid item xs={7}>

                                        <Controller
                                            name="reportingmanager"
                                            control={control}
                                            defaultValue={formData.reportingmanager}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={[
                                                        { label: 'Kannan R  ', value: 'Kannan R' },
                                                        { label: 'Shamala Nagaveni ', value: 'Shamala Nagaveni' },
                                                        { label: 'Sathis Kumar ', value: 'Sathis Kumar' },
                                                        { label: 'Santhosh ', value: 'Santhosh' }
                                                    ]}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            // label={<span>Reporting Manager <span style={{ color: 'red' }}> * </span></span>}
                                                            error={!!errors.reportingmanager}
                                                            helperText={errors.reportingmanager ? errors.reportingmanager.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />

                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Reporting Team Lead <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="reportingteamlead"
                                            control={control}
                                            defaultValue={formData.reportingteamlead}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={[
                                                        { label: 'Kannan R  ', value: 'Kannan R' },
                                                        { label: 'Shamala Nagaveni ', value: 'Shamala Nagaveni' },
                                                        { label: 'Sathis Kumar ', value: 'Sathis Kumar' },
                                                        { label: 'Santhosh ', value: 'Santhosh' }
                                                    ]}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            // label={<span>Reporting Manager <span style={{ color: 'red' }}> * </span></span>}
                                                            error={!!errors.reportingteamlead}
                                                            helperText={errors.reportingteamlead ? errors.reportingteamlead.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Designation <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="designation"
                                            control={control}
                                            defaultValue={formData.designation}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(Designations)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={!!errors.designation}
                                                            helperText={errors.designation ? errors.designation.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Department <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="department"
                                            control={control}
                                            defaultValue={formData.department}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(Department)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={!!errors.department}
                                                            helperText={errors.department ? errors.department.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Team <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="team"
                                            control={control}
                                            defaultValue={formData.team}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(Teams)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={!!errors.team}
                                                            helperText={errors.team ? errors.team.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Referred By <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="referrdby"
                                            control={control}
                                            defaultValue={formData.referrdby}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={[
                                                        { label: 'Kannan R  ', value: 'Kannan R' },
                                                        { label: 'Shamala Nagaveni ', value: 'Shamala Nagaveni' },
                                                        { label: 'Sathis Kumar ', value: 'Sathis Kumar' },
                                                        { label: 'Santhosh ', value: 'Santhosh' }
                                                    ]}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            // label={<span>Reporting Manager <span style={{ color: 'red' }}> * </span></span>}
                                                            error={!!errors.referrdby}
                                                            helperText={errors.referrdby ? errors.referrdby.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Employment Status <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="employmentstatus"
                                            control={control}
                                            defaultValue={formData.employmentstatus}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.employmentstatus}
                                                    helperText={errors.employmentstatus ? errors.employmentstatus.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                >
                                                    <MenuItem value="Probation">Probation</MenuItem>
                                                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                                                </StyledInput>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid container xs={4} bgcolor={''}> {/* Second vertical page 2 Container */}

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Employee Status <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="employeestatus"
                                            control={control}
                                            defaultValue={formData.employeestatus}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.employeestatus}
                                                    helperText={errors.employeestatus ? errors.employeestatus.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                >
                                                    <MenuItem value="Active">Active</MenuItem>
                                                    <MenuItem value="In Active">In Active</MenuItem>
                                                </StyledInput>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Shift <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="shift"
                                            control={control}
                                            defaultValue={formData.shift}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(shifts)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={!!errors.shift}
                                                            helperText={errors.shift ? errors.shift.message : ''}
                                                            FormHelperTextProps={{
                                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Grade <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="grade"
                                            control={control}
                                            defaultValue={formData.grade}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.grade}
                                                    helperText={errors.grade ? errors.grade.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                >
                                                    <MenuItem value="L1">L1</MenuItem>
                                                    <MenuItem value="L2">L2</MenuItem>
                                                    <MenuItem value="L3">L3</MenuItem>
                                                    <MenuItem value="L4">L4</MenuItem>
                                                    <MenuItem value="L5">L5</MenuItem>
                                                </StyledInput>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Probation Period <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="probabationperiod"
                                            control={control}
                                            defaultValue={formData.probabationperiod}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.probabationperiod}
                                                    helperText={errors.probabationperiod ? errors.probabationperiod.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Salary Offered <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="salaryofferred"
                                            control={control}
                                            defaultValue={formData.salaryofferred}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.salaryofferred}
                                                    helperText={errors.salaryofferred ? errors.salaryofferred.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Attendance Bonus <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="attendancebonus"
                                            control={control}
                                            defaultValue={formData.attendancebonus}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.attendancebonus}
                                                    helperText={errors.attendancebonus ? errors.attendancebonus.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                >
                                                    <MenuItem value="Yes">Yes</MenuItem>
                                                    <MenuItem value="No">No</MenuItem>
                                                </StyledInput>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid container xs={4} bgcolor={''}> {/* Third vertical page 2 Container */}

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Monthly CTC <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalmonthlyctc"
                                            control={control}
                                            defaultValue={formData.totalmonthlyctc}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.totalmonthlyctc}
                                                    helperText={errors.totalmonthlyctc ? errors.totalmonthlyctc.message : ''}
                                                    disabled
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Upload Address Prof <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="fileupload"
                                            control={control}
                                            defaultValue={formData.fileupload}
                                            render={({ field }) => (
                                                <div>
                                                    <Button
                                                        variant="outlined"
                                                        component="label"
                                                        fullWidth
                                                        color="primary"
                                                        style={{ marginBottom: '8px' }}
                                                    >
                                                        Upload File
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                field.onChange(file);
                                                                // onFileChange(file); // Optional function for handling file change
                                                            }}
                                                        />
                                                    </Button>
                                                    <FormHelperText style={{ color: errors.fileupload ? 'red' : 'inherit' }}>
                                                        {field.value ? field.value.name : 'No file selected'}
                                                    </FormHelperText>

                                                    <FormHelperText style={{ color: 'red' }}>
                                                        {errors.fileupload?.message}
                                                    </FormHelperText>
                                                    {/* <FormHelperText style={{ color: errors.fileupload ? 'red' : 'inherit' }}>
                                                        {errors.fileupload ? errors.fileupload.message : formData.fileupload?.name}
                                                    </FormHelperText> */}
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Yearly CTC <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalyearlyctc"
                                            control={control}
                                            defaultValue={formData.totalyearlyctc}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.totalyearlyctc}
                                                    helperText={errors.totalyearlyctc ? errors.totalyearlyctc.message : ''}
                                                    disabled
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Billable Status <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="billablestatus"
                                            control={control}
                                            defaultValue={formData.billablestatus}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.billablestatus}
                                                    helperText={errors.billablestatus ? errors.billablestatus.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                >
                                                    <MenuItem value="Billable">Billable</MenuItem>
                                                    <MenuItem value="Non-Billable">Non-Billable</MenuItem>
                                                    <MenuItem value="Partially">Partially Billed</MenuItem>
                                                </StyledInput>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </>
                    )}

                    {activeStep === 2 && (
                        <>
                            <Grid container xs={12} bgcolor={''}> {/* First Horizontal view page - 3 container */}

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Previous Organization Name 1 <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="previousOrganizationName1"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.previousOrganizationName1}
                                                    helperText={errors.previousOrganizationName1 ? errors.previousOrganizationName1.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Designation <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="designation"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.designation}
                                                    helperText={errors.designation ? errors.designation.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Start Date <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.dateOfBirth}
                                                    helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Experience (Years) <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalExperience"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.totalExperience}
                                                    helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                                                    disabled // Read-only input
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                </Grid>



                            </Grid>

                            <Grid container xs={12} bgcolor={''}> {/* Second Horizontal view page - 3 container */}


                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Previous Organization Name 1 <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="previousOrganizationName1"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.previousOrganizationName1}
                                                    helperText={errors.previousOrganizationName1 ? errors.previousOrganizationName1.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Designation <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="designation"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.designation}
                                                    helperText={errors.designation ? errors.designation.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Start Date <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.dateOfBirth}
                                                    helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Experience (Years) <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalExperience"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.totalExperience}
                                                    helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                                                    disabled // Read-only input
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>



                                <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                </Grid>



                            </Grid>
                            <Grid container xs={12} bgcolor={''}> {/* Third Horizontal view page - 3 container */}


                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Previous Organization Name 1 <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="previousOrganizationName1"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.previousOrganizationName1}
                                                    helperText={errors.previousOrganizationName1 ? errors.previousOrganizationName1.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Designation <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="designation"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.designation}
                                                    helperText={errors.designation ? errors.designation.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Start Date <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.dateOfBirth}
                                                    helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Experience (Years) <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalExperience"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.totalExperience}
                                                    helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                                                    disabled // Read-only input
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                            </Grid>

                        </>
                    )}

                    {activeStep === 3 && (
                        <>
                            <Grid xs={12} container > {/* First Horizontal View page - 4 regarding... */}

                                <Grid xs={6} container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Aadhaar Number <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="aadhaarnumber"
                                            control={control}
                                            defaultValue={formData.aadhaarnumber}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!errors.aadhaarnumber}
                                                    helperText={errors.aadhaarnumber ? errors.aadhaarnumber.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={6} container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            PAN Number <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="pannumber"
                                            control={control}
                                            defaultValue={formData.pannumber}
                                            render={({ field }) => (
                                                <StyledInput
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    error={!!errors.pannumber}
                                                    helperText={errors.pannumber ? errors.pannumber.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={6} container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Passport Number <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="passportnumber"
                                            control={control}
                                            defaultValue={formData.passportnumber}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.passportnumber}
                                                    helperText={errors.passportnumber ? errors.passportnumber.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={6} container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            UAN Number <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="uannumber"
                                            control={control}
                                            defaultValue={formData.uannumber}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.uannumber}
                                                    helperText={errors.uannumber ? errors.uannumber.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                            </Grid>
                            <Grid xs={12} container paddingTop={3}> {/* First Horizontal View page - 4 regarding... */}

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isPFChecked}
                                                    onChange={handleCheckboxChange}
                                                    color="primary"
                                                />
                                            }
                                            label="Include PF"
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isESIChecked}
                                                    onChange={handleCheckboxESIChange}
                                                    color="primary"
                                                />
                                            }
                                            label="Include ESI"
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isLWFChecked}
                                                    onChange={handleCheckboxLWFChange}
                                                    color="primary"
                                                />
                                            }
                                            label="Include LWF"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={4} container alignItems="center" paddingBottom={2} style={{ visibility: isPFChecked ? 'visible' : 'hidden' }} >
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            PF Number
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="pfnumber"
                                            control={control}
                                            defaultValue={formData.pfnumber || ''}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.pfnumber}
                                                    helperText={errors.pfnumber ? errors.pfnumber.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={4} container alignItems="center" paddingBottom={2} style={{ visibility: isESIChecked ? 'visible' : 'hidden' }}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            ESI Number
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="esinumber"
                                            control={control}
                                            defaultValue={formData.esinumber || ''}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.esinumber}
                                                    helperText={errors.esinumber ? errors.esinumber.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={4} container alignItems="center" paddingBottom={2} style={{ visibility: isLWFChecked ? 'visible' : 'hidden' }} >
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            LWF Number
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="lwfnumber"
                                            control={control}
                                            defaultValue={formData.lwfnumber || ''}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.lwfnumber}
                                                    helperText={errors.lwfnumber ? errors.lwfnumber.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={4} container alignItems="center" paddingBottom={2} style={{ visibility: isPFChecked ? 'visible' : 'hidden', }} >
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            PF Join Date <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="pfjoinddate"
                                            control={control}
                                            defaultValue={formData.pfjoinddate}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    type="date"
                                                    variant="outlined"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.pfjoinddate}
                                                    helperText={errors.pfjoinddate ? errors.pfjoinddate.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </>
                    )}

                    {activeStep === 4 && (
                        <>
                            <Grid container xs={3}>
                                <Grid>

                                </Grid>
                            </Grid>
                            <Grid container xs={6} >
                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Mention the mode of payment <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="paymenttype"
                                            control={control}
                                            defaultValue={formData.paymenttype}
                                            render={({ field }) => (
                                                <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.paymenttype}>
                                                    <InputLabel>
                                                        Payment Type <span style={{ color: 'red' }}>*</span>
                                                    </InputLabel>
                                                    <Select
                                                        {...field}
                                                        value={selectedPaymentType}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handlePaymentTypeChange(e);
                                                        }}
                                                        label="Payment Type"
                                                    >
                                                        <MenuItem value="cash">Cash</MenuItem>
                                                        <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                                                        <MenuItem value="cheque">Cheque</MenuItem>
                                                        <MenuItem value="demand_draft">Demand Draft</MenuItem>
                                                    </Select>
                                                    <FormHelperText>
                                                        {errors.paymenttype ? errors.paymenttype.message : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>

                                        {selectedPaymentType === 'bank_transfer' && (
                                            <Grid container paddingTop={2}>
                                                <Grid container alignItems="center" paddingBottom={2}>
                                                    <Grid item xs={4}>
                                                        <StyledLabel>
                                                            Bank Name <span style={{ color: 'red' }}>*</span>
                                                        </StyledLabel>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Controller
                                                            name="bankname"
                                                            control={control}
                                                            defaultValue={formData.bankname}
                                                            render={({ field }) => (
                                                                <StyledInput
                                                                    {...field}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    error={!!errors.bankname}
                                                                    helperText={errors.bankname ? errors.bankname.message : ''}
                                                                    FormHelperTextProps={{
                                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container alignItems="center" paddingBottom={2}>
                                                    <Grid item xs={4}>
                                                        <StyledLabel>
                                                            Branch Name <span style={{ color: 'red' }}>*</span>
                                                        </StyledLabel>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Controller
                                                            name="branchname"
                                                            control={control}
                                                            defaultValue={formData.branchname}
                                                            render={({ field }) => (
                                                                <StyledInput
                                                                    {...field}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    error={!!errors.branchname}
                                                                    helperText={errors.branchname ? errors.branchname.message : ''}
                                                                    FormHelperTextProps={{
                                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container alignItems="center" paddingBottom={2}>
                                                    <Grid item xs={4}>
                                                        <StyledLabel>
                                                            IFSC Code <span style={{ color: 'red' }}>*</span>
                                                        </StyledLabel>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Controller
                                                            name="ifsccode"
                                                            control={control}
                                                            defaultValue={formData.ifsccode}
                                                            render={({ field }) => (
                                                                <StyledInput
                                                                    {...field}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    error={!!errors.ifsccode}
                                                                    helperText={errors.ifsccode ? errors.ifsccode.message : ''}
                                                                    FormHelperTextProps={{
                                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container alignItems="center" paddingBottom={2}>
                                                    <Grid item xs={4}>
                                                        <StyledLabel>
                                                            Account Number <span style={{ color: 'red', fontSize: '1.5rem', marginLeft: '0.25rem' }}>*</span>
                                                        </StyledLabel>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Controller
                                                            name="accountnumber"
                                                            control={control}
                                                            defaultValue={formData.accountnumber}
                                                            render={({ field }) => (
                                                                <StyledInput
                                                                    {...field}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    error={!!errors.accountnumber}
                                                                    helperText={errors.accountnumber ? errors.accountnumber.message : ''}
                                                                    FormHelperTextProps={{
                                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>


                                                <Grid container alignItems="center" paddingBottom={2}>
                                                    <Grid item xs={4}>
                                                        <StyledLabel>
                                                            Beneficiary Code <span style={{ color: 'red', fontSize: '1.5rem', marginLeft: '0.25rem' }}>*</span>
                                                        </StyledLabel>
                                                    </Grid>

                                                    <Grid item xs={0}>
                                                        <StyledLabel>
                                                            :
                                                        </StyledLabel>
                                                    </Grid>

                                                    <Grid item xs={0} alignItems='flex-start'>
                                                        <StyledLabel>
                                                            Sathiskumar-200027-09/09/24
                                                        </StyledLabel>
                                                    </Grid>

                                                    {/* <Grid item xs={7}>
                                                        <Controller
                                                            name="accountnumber"
                                                            control={control}
                                                            defaultValue={formData.accountnumber}
                                                            render={({ field }) => (
                                                                <StyledInput
                                                                    {...field}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    error={!!errors.accountnumber}
                                                                    helperText={errors.accountnumber ? errors.accountnumber.message : ''}
                                                                    FormHelperTextProps={{
                                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid> */}
                                                </Grid>

                                            </Grid>

                                        )}
                                    </Grid>

                                </Grid>

                            </Grid>
                        </>
                    )}

                </Grid>

            </Box>



            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    px: 12,
                    pb: 3,
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                }}
            >
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant='outlined'
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? (
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit2}>
                        Submit
                    </Button>
                ) : (
                    <Button variant="outlined" color="primary" onClick={handleNext} disabled={!isValid}>
                        Next
                    </Button>
                )}
            </Box>
        </Box >
    );
}


