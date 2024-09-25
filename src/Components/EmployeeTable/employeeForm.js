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
import { Autocomplete, Avatar, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
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

// const DarkTextField = styled(TextField)(({ theme }) => ({
const DarkTextField = styled((props) => <TextField {...props} size="small" sx={{
    // fontSize
}} />)(({ theme }) => ({
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




export default function EmployeeForm() {

    const [activeStep, setActiveStep] = React.useState(0);

    const { control, handleSubmit, getValues, setValue, trigger, formState: { errors, isValid } } = useForm({
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
        employeeName: 'sssssss',
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

    const removeSpaces = (str) => str.replace(/\s+/g, '');

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




            <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit(onSubmit)}>



                <Grid container spacing={6} >
                    {activeStep === 0 && (
                        <>
                            <Grid item xs={4}>
                                <Grid container spacing={2} sx={{ bgcolor: '', paddingLeft: 0 }} >

                                    <Grid item xs={12} container justifyContent="center">
                                        <Avatar
                                            sx={{
                                                width: 200,
                                                height: 200,
                                            }}
                                            alt="Profile Image"
                                            src="https://images.pexels.com/photos/4629633/pexels-photo-4629633.jpeg?cs=srgb&dl=pexels-cottonbro-4629633.jpg&fm=jpg"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="employeeName"
                                            control={control}
                                            defaultValue={formData.employeeName}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Employee Name*"
                                                    label={<span>Employee Name <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.employeeName}
                                                    helperText={errors.employeeName ? errors.employeeName.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>


                                    <Grid item xs={6}>
                                        <Controller
                                            name="employeeNumber"
                                            control={control}
                                            defaultValue={formData.employeeNumber}
                                            render={({ field }) => (
                                                <DarkTextField

                                                    {...field}
                                                    // label="Employee Number*"
                                                    size="small"
                                                    label={
                                                        <span>
                                                            Employee Number
                                                            <span style={{ color: 'red', fontSize: '1.5rem', marginLeft: '0.25rem' }}>
                                                                *
                                                            </span>
                                                        </span>
                                                    }
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.employeeNumber}
                                                    helperText={errors.employeeNumber ? errors.employeeNumber.message : ''}
                                                // disabled
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue={formData.email}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Email Address*"
                                                    label={<span>Email Address <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.email}
                                                    helperText={errors.email ? errors.email.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="mobileNumber"
                                            control={control}
                                            defaultValue={formData.mobileNumber}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Mobile Number*"
                                                    label={<span>Mobile Number <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.mobileNumber}
                                                    helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            defaultValue={formData.dateOfBirth}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Date of Birth*"
                                                    label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                                                    type="date"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.dateOfBirth}
                                                    helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>


                                    <Grid item xs={6}>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            defaultValue={formData.gender}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Gender*"
                                                    label={<span>Gender<span style={{ color: 'red' }}>*</span></span>}
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.gender}
                                                    helperText={errors.gender ? errors.gender.message : ''}
                                                >
                                                    <MenuItem value="Male">Male</MenuItem>
                                                    <MenuItem value="Female">Female</MenuItem>
                                                    <MenuItem value="Others">Others</MenuItem>
                                                </DarkTextField>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue={formData.phone}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Phone Number"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.phone}
                                                    helperText={errors.phone ? errors.phone.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="bloodGroup"
                                            control={control}
                                            defaultValue={formData.bloodGroup}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Blood Group"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.bloodGroup}
                                                    helperText={errors.bloodGroup ? errors.bloodGroup.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>



                                </Grid>

                            </Grid>

                            <Grid item xs={8}>
                                <Grid container sx={{ bgcolor: '' }} spacing={2} >

                                    <Grid item xs={6}>
                                        <Controller
                                            name="dateOfJoining"
                                            control={control}
                                            defaultValue={formData.dateOfJoining}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Date of Joining*"
                                                    label={<span>Date of Joining <span style={{ color: 'red' }}>*</span></span>}
                                                    type="date"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.dateOfJoining}
                                                    helperText={errors.dateOfJoining ? errors.dateOfJoining.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>


                                    <Grid item xs={6}>
                                        <Controller
                                            name="emergencyContactName"
                                            control={control}
                                            defaultValue={formData.emergencyContactName}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Emergency Contact Name*"
                                                    label={<span>Emergency Contact Name <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.emergencyContactName}
                                                    helperText={errors.emergencyContactName ? errors.emergencyContactName.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="emergencyContactNumber"
                                            control={control}
                                            defaultValue={formData.emergencyContactNumber}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Emergency Contact Number*"
                                                    label={<span>Emergency Contact Number  <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.emergencyContactNumber}
                                                    helperText={errors.emergencyContactNumber ? errors.emergencyContactNumber.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="emergencyContactRelation"
                                            control={control}
                                            defaultValue={formData.emergencyContactRelation}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Emergency Contact Relation (Should be blood relative)*"
                                                    label={<span>Emergency Contact Relation (Should be blood relative) <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.emergencyContactRelation}
                                                    helperText={errors.emergencyContactRelation ? errors.emergencyContactRelation.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="fathersName"
                                            control={control}
                                            defaultValue={formData.fathersName}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Father's Name"
                                                    label={<span>Father's Name <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.fathersName}
                                                    helperText={errors.fathersName ? errors.fathersName.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="fathersOccupation"
                                            control={control}
                                            defaultValue={formData.fathersOccupation}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Father's Occupation"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.fathersOccupation}
                                                    helperText={errors.fathersOccupation ? errors.fathersOccupation.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="spouseName"
                                            control={control}
                                            defaultValue={formData.spouseName}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Spouse Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.spouseName}
                                                    helperText={errors.spouseName ? errors.spouseName.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="countryOfOrigin"
                                            control={control}
                                            defaultValue={formData.countryOfOrigin}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Country of Origin"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.countryOfOrigin}
                                                    helperText={errors.countryOfOrigin ? errors.countryOfOrigin.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <Controller
                                            name="nationality"
                                            control={control}
                                            defaultValue={formData.nationality}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Nationality"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.nationality}
                                                    helperText={errors.nationality ? errors.nationality.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="physicallyChallenged"
                                            control={control}
                                            defaultValue={formData.physicallyChallenged}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Physically Challenged (Yes/No)"
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.physicallyChallenged}
                                                    helperText={errors.physicallyChallenged ? errors.physicallyChallenged.message : ''}
                                                >
                                                    <MenuItem value="Yes">Yes</MenuItem>
                                                    <MenuItem value="No">No</MenuItem>
                                                </DarkTextField>
                                            )}
                                        />
                                    </Grid>



                                </Grid>

                            </Grid>









                        </>
                    )}
                </Grid>

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
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    ) : (
                        <Button variant="outlined" color="primary" onClick={handleNext} disabled={!isValid}>
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}










































{/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
        <Button variant="contained" color="primary" type="submit">
            Submit
        </Button>
    ) : (
        <Button variant="outlined" color="primary" onClick={handleNext} disabled={!isValid}>
            Next
        </Button>
    )}
</Box> */}




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





{/* <DarkTextField
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













// if (isStepOptional(index)) {
//     labelProps.optional = (
//         <Typography variant="caption">Optional</Typography>
//     );
// }