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
import { Autocomplete, Avatar, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { useQuery } from '@tanstack/react-query';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import dayjs from 'dayjs';
import URL from '../Global/Utils/url_route';
import axios from 'axios';


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
        3: <HomeOutlinedIcon />,
        4: <HistoryEduIcon />,
        5: <AssignmentIcon />,
        6: <PaymentIcon />,
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


const steps = ['BASIC INFORMATION', 'EMPLOYEE POSITION', 'ADDRESS', 'EXPERIENCE', ' STATUTORY INFO', 'PAYMENT MODE']

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
    firstname: Yup.string()
        .required('Employee Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Employee Name must contain only characters..')
        .min(5, 'At least fives digit is required')
    ,
    lastname: Yup.string()
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

const schemaValidationForForm3 = Yup.object().shape({
    currentaddress: Yup.string().required('Current Address is required'),
    permanentAddress: Yup.string().required('Permanent Address is required'),
    currentCity: Yup.string()
        .required('Current city field is required .')
        .max(15, 'It cannot more than 15 characters.')
    ,
    permanentcity: Yup.string()
        .required('Current city field is required .')
        .max(15, 'It cannot more than 15 characters.'),
    currentPincode: Yup.string()
        .matches(/^\d+$/, 'Pincode must contain only digits')
        .min(6, 'It should not be less than 6 digits.')
        .max(6, 'It cannot be more than 6 characters')
    ,
    permanentPincode: Yup.string()
        .matches(/^\d+$/, 'Pincode must contain only digits')
        .min(6, 'It should not be less than 6 digits.')
        .max(6, 'It cannot be more than 6 characters')
    ,
})

const schemaValidationForForm4 = Yup.object().shape({
    aadhaarnumber: Yup.string()
        .required('Aadhaar number is required.'),
    pannumber: Yup.string()
        .required('PAN number is required.')
})


const schemaValidationForForm5 = Yup.object().shape({
    modeofpayment: Yup.string()
        .required()
})


//need to check here  ///What means in terms of the Confirmation Date.....
//employeeconfirmationstatus , this also I have to check again . all are come around one thing only....

const getValidationSchema = (page) => {
    if (page === 0) {
        return schemaValidationForForm;
    } else if (page === 1) {
        return schemaValidationForForm2;
    } else if (page === 2) {
        return schemaValidationForForm3;
    } else if (page === 4) {
        return schemaValidationForForm4;
    } else if (page === 5) {
        return schemaValidationForForm5;
    }
    return Yup.object().shape({});
};

const StyledLabel = styled('label')`
  font-weight: bold;
  margin-right: 16px; 
`;

const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        height: '40px',
        width: '100%',
    },
    '& .MuiSelect-icon': {
        color: '#2196f3',
        transition: 'transform 0.3s ease',
    },
    '& .MuiAutocomplete-popupIndicator': {
        color: '#2196f3',
        transition: 'transform 0.3s ease',
    },
}));


const MultilineTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        height: 'auto',
        width: '100%',
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1),
    },
    '& .MuiSelect-icon': {
        color: '#2196f3',
        transition: 'transform 0.3s ease',
    },
    '& .MuiAutocomplete-popupIndicator': {
        color: '#2196f3',
        transition: 'transform 0.3s ease',
    },
}));




export default function EmployeeForm() {

    let url = `${URL}employeeonboard`

    const [activeStep, setActiveStep] = React.useState(0);

    const { control, handleSubmit, getValues, setValue, trigger, formState: { errors, isValid, isSubmitting, isSubmitSuccessful } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(getValidationSchema(activeStep)),
    });

    const [isPFChecked, setIsPFChecked] = React.useState(false);
    const [isESIChecked, setIsESIChecked] = React.useState(false);
    const [isLWFChecked, setIsLWFChecked] = React.useState(false);
    const [copyToPermanent, setCopyToPermanent] = React.useState(false);



    const [formData1, setFormData1] = React.useState({
        firstname: null,
        lastname: null,
        dateOfBirth: null, //Format of a data -( 2024/09/26 ) 
        employeeNumber: null,
        gender: null,
        email: null,
        mobileNumber: null,
        phone: null,
        bloodGroup: null,
        dateOfJoining: null,
        fathersName: null,
        fathersOccupation: null,
        countryOfOrigin: null,
        nationality: null,
        emergencyContactName: null,
        emergencyContactNumber: null,
        emergencyContactRelation: null,
        spouseName: null,
        physicallyChallenged: null,
        education: null,
        addressprofType: null,
    });

    const [formData2, setFormData2] = React.useState({
        reportingmanager: 'Kannan R',
        reportingteamlead: 'Kannan R',
        designation: 'CEO',
        department: 'Executive',
        team: 'IT Team',
        referrdby: 'Santhosh',
        employmentstatus: 'Probation',
        employeestatus: 'Active',
        shift: '00:00 - 09:00',
        grade: 'L1',
        probabationperiod: '180',
        salaryofferred: '12000',
        totalmonthlyctc: '12000',
        attendancebonus: 'Yes',
        totalyearlyctc: '144000',
        billablestatus: 'Billable',
        addresprofpath: '',

    })


    const [formData3, setFormData3] = React.useState({
        currentaddress: null,
        permanentAddress: null,
        currentCity: null,
        currentPincode: null,
        permanentcity: null,
        permanentPincode: null,
    })

    const [formData4, setFormData4] = React.useState({
        organization1: null,
        designation1: null,
        startdate1: null,
        enddate1: null,
        totalExperience1: null,

        organization2: null,
        designation2: null,
        startdate2: null,
        enddate2: null,
        totalExperience2: null,

        organization3: null,
        designation3: null,
        startdate3: null,
        enddate3: null,
        totalExperience3: null,
    })

    const [formData5, setFormData5] = React.useState({
        aadhaarnumber: null,
        pannumber: null,
        passportnumber: null,
        uannumber: null,
        pfnumber: null,
        pfjoindate: null,
        esinumber: null,
        lwfnumber: null,
    })

    const [formData6, setFormData6] = React.useState({
        modeofpayment: null,
        bankname: null,
        branchname: null,
        ifsccode: null,
        accountNumber: null,
        beneficiarycode: null,
    })

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

        setFormData2(preState => ({
            ...preState,
            totalmonthlyctc: totalMonthlyCTC,
            totalyearlyctc: totalYearlyCTC,
        }))

    }, [salaryOfferred]);


    React.useEffect(() => {
        if (selectedPaymentType !== 'banktransfer') {


            setValue('bankname', '', { shouldValidate: true });
            setValue('branchname', '', { shouldValidate: true });
            setValue('ifsccode', '', { shouldValidate: true });
            setValue('accountNumber', '', { shouldValidate: true });
            setValue('beneficiarycode', '', { shouldValidate: true });

            setFormData6(preState => ({
                ...preState,
                bankname: '',
                branchname: '',
                ifsccode: '',
                accountNumber: '',
                beneficiarycode: '',
            }))

        }

    }, [selectedPaymentType])


    React.useEffect(() => {

        if (copyToPermanent) {

            setValue('permanentAddress', formData3.currentaddress, { shouldValidate: true });
            setValue('permanentcity', formData3.currentCity, { shouldValidate: true });
            setValue('permanentPincode', formData3.currentPincode, { shouldValidate: true });

            setFormData3(preState => ({
                ...preState,
                permanentAddress: formData3.currentaddress,
                permanentcity: formData3.currentCity,
                permanentPincode: formData3.currentPincode,
            }))
        } else {

            setValue('permanentAddress', '', { shouldValidate: true });
            setValue('permanentcity', '', { shouldValidate: true });
            setValue('permanentPincode', '', { shouldValidate: true });

            setFormData3(preState => ({
                ...preState,
                permanentAddress: '',
                permanentcity: '',
                permanentPincode: '',
            }))

        }

    }, [copyToPermanent])


    function calculateExperience(startDate, endDate) {
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        const years = Math.max(0, end.diff(start, 'year'));
        const months = Math.max(0, end.diff(start.add(years, 'year'), 'month'));
        const days = Math.max(0, end.diff(start.add(years, 'year').add(months, 'month'), 'day'));

        return `${years}.${months}`
    }


    React.useEffect(() => {

        if (formData4.startdate1 && formData4.enddate1) {
            const experience1 = calculateExperience(formData4.startdate1, formData4.enddate1);

            setValue('totalExperience1', experience1, { shouldValidate: true });

            setFormData4(preState => ({
                ...preState,
                totalExperience1: experience1,
            }))


        } else if (formData4.startdate2 && formData4.enddate2) {

            const experience2 = calculateExperience(formData4.startdate2, formData4.enddate2);

            setValue('totalExperience2', experience2, { shouldValidate: true });

            setFormData4(preState => ({
                ...preState,
                totalExperience2: experience2,
            }))



        } else if (formData4.startdate3 && formData4.enddate3) {

            const experience3 = calculateExperience(formData4.startdate3, formData4.enddate3);

            setValue('totalExperience3', experience3, { shouldValidate: true });

            setFormData4(preState => ({
                ...preState,
                totalExperience3: experience3,
            }))

        }

    }, [formData4.startdate1, formData4.enddate1, formData4.startdate2, formData4.enddate2, formData4.startdate3, formData4.enddate3])


    React.useEffect(() => {

        if (!isPFChecked) {
            setValue('pfnumber', '', { shouldValidate: true });
            setValue('pfjoindate', '', { shouldValidate: true });

            setFormData5(preState => ({
                ...preState,
                pfnumber: '',
                pfjoindate: '',
            }))
        } else if (!isESIChecked) {
            setValue('esinumber', '', { shouldValidate: true });

            setFormData5(preState => ({
                ...preState,
                esinumber: '',
            }))
        } else if (!isLWFChecked) {
            setValue('lwfnumber', '', { shouldValidate: true });

            setFormData5(preState => ({
                ...preState,
                lwfnumber: '',
            }))
        }

    }, [isESIChecked, isPFChecked, isLWFChecked])


    const handleNext = async () => {

        console.log(activeStep, 'This is the current page .... ')

        let data;

        if (activeStep === 0) {
            data = formData1;
        } else if (activeStep === 1) {
            data = formData2;
        } else if (activeStep === 2) {
            data = formData3;
        } else if (activeStep === 3) {
            data = formData4;
        } else if (activeStep === 4) {
            data = formData5;
        }

        try {
            const response = await axios.post(url, { formData: data, anotherData: 'anotherData' })
            console.log(response)

        } catch (error) {
            console.log(error, 'Youre getting error da sathis uh.... ')
        } finally {
            console.log('Achieved dude ....')
        }

        const isStepValid = await trigger();
        if (isStepValid) {
            // setFormData((prevData) => ({ ...prevData, ...getValues() }));
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };



    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const onSubmit = (data) => {
        // setFormData((prevData) => ({ ...prevData, ...data }));
        console.log('Form submitted');
    };


    const mapOptions = (data) => {
        return data.map(item => ({
            label: item,
            value: item
        }));
    }


    const handleSubmit2 = () => {

        console.log('this is formData')

        // setActiveStep(0)

        // console.log('this is isSubmitting', isSubmitting)
        // console.log('this is isSubmitSuccessful', isSubmitSuccessful)
    }



    const percentagefunction = () => {
        let percentageValue
        if (activeStep === 0) {
            percentageValue = 0
        } else if (activeStep === 1) {
            percentageValue = 20
        } else if (activeStep === 2) {
            percentageValue = 40
        } else if (activeStep === 3) {
            percentageValue = 60
        } else if (activeStep === 4) {
            percentageValue = 80
        } else if (activeStep === 5) {
            percentageValue = 100
        }
        return percentageValue;
    }

    const handleCheckboxChange2 = (event) => {
        setCopyToPermanent(event.target.checked);
    };


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
                                        // src='Uploads/2024/10/ProfileFolder/MOS20241001426_Screenshot from 2024-08-12 20-30-00.png'
                                        />

                                    </Grid>

                                </Grid>

                                <Grid container xs={10} paddingLeft={6} columnGap={2} >  {/* Basic Details , like name and other container */}

                                    <Grid container xs={6} spacing={1} >  {/* First Half container */}

                                        <Grid container >
                                            <Grid xs={6} container alignItems="center" paddingBottom={2} >
                                                <Grid item xs={4}>
                                                    <StyledLabel>
                                                        First Name <span style={{ color: 'red' }}>*</span>
                                                    </StyledLabel>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="firstname"
                                                        control={control}
                                                        defaultValue={formData1.firstname}
                                                        render={({ field }) => (
                                                            <StyledInput
                                                                fullWidth
                                                                {...field}
                                                                variant="outlined"
                                                                error={!!errors.firstname}
                                                                helperText={errors.firstname ? errors.firstname.message : ''}
                                                                FormHelperTextProps={{
                                                                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                }}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setFormData1((prev) => ({
                                                                        ...prev,
                                                                        firstname: e.target.value,
                                                                    }));
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid xs={6} container alignItems="center" paddingBottom={2} >
                                                <Grid item xs={4}>
                                                    <StyledLabel>
                                                        Last Name <span style={{ color: 'red' }}>*</span>
                                                    </StyledLabel>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="lastname"
                                                        control={control}
                                                        defaultValue={formData1.lastname}
                                                        render={({ field }) => (
                                                            <StyledInput
                                                                fullWidth
                                                                {...field}
                                                                variant="outlined"
                                                                error={!!errors.lastname}
                                                                helperText={errors.lastname ? errors.lastname.message : ''}
                                                                FormHelperTextProps={{
                                                                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                }}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setFormData1((prev) => ({
                                                                        ...prev,
                                                                        lastname: e.target.value,
                                                                    }));
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
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
                                                    defaultValue={formData1.employeeNumber}
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
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setFormData1((prev) => ({
                                                                    ...prev,
                                                                    employeeNumber: e.target.value,
                                                                }));
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
                                                    defaultValue={formData1.email}
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
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setFormData1((prev) => ({
                                                                    ...prev,
                                                                    email: e.target.value,
                                                                }));
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
                                                    defaultValue={formData1.mobileNumber}
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
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setFormData1((prev) => ({
                                                                    ...prev,
                                                                    mobileNumber: e.target.value,
                                                                }));
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
                                                    defaultValue={formData1.dateOfBirth}
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
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setFormData1((prev) => ({
                                                                    ...prev,
                                                                    dateOfBirth: e.target.value,
                                                                }));
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
                                                    defaultValue={formData1.gender}
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
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    fontSize: '30px',
                                                                    color: '#2196f3'
                                                                }
                                                            }}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setFormData1((prev) => ({
                                                                    ...prev,
                                                                    gender: e.target.value,
                                                                }));
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
                                                    defaultValue={formData1.phone}
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
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setFormData1((prev) => ({
                                                                    ...prev,
                                                                    phone: e.target.value,
                                                                }));
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
                                                    defaultValue={formData1.bloodGroup}
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
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setFormData1((prev) => ({
                                                                    ...prev,
                                                                    bloodGroup: e.target.value,
                                                                }));
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
                                                defaultValue={formData1.dateOfJoining}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                dateOfJoining: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.emergencyContactName}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                emergencyContactName: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.emergencyContactNumber}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                emergencyContactNumber: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.emergencyContactRelation}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                emergencyContactRelation: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.fathersName}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                fathersName: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.fathersOccupation}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                fathersOccupation: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.spouseName}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                spouseName: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.education}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                education: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.countryOfOrigin}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                countryOfOrigin: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.nationality}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                nationality: e.target.value,
                                                            }));
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
                                                defaultValue={formData1.physicallyChallenged}
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
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                physicallyChallenged: e.target.value,
                                                            }));
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
                                                name="addressprofType"
                                                control={control}
                                                defaultValue={formData1.addressprofType}
                                                render={({ field }) => (
                                                    <StyledInput
                                                        {...field}
                                                        select
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.addressprofType}
                                                        helperText={errors.addressprofType ? errors.addressprofType.message : ''}
                                                        FormHelperTextProps={{
                                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                        }}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFormData1((prev) => ({
                                                                ...prev,
                                                                addressprofType: e.target.value,
                                                            }));
                                                        }}
                                                    >
                                                        <MenuItem value="Aadhaar">Aadhaar</MenuItem>
                                                        <MenuItem value="Driving License">Driving License</MenuItem>
                                                        <MenuItem value="Bank Statement">Bank Statement</MenuItem>
                                                        <MenuItem value="Phone Bill">Phone Bill</MenuItem>
                                                        <MenuItem value="Gas Bill">Gas Bill</MenuItem>
                                                        <MenuItem value="Gas Bill">Passport</MenuItem>
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
                                            defaultValue={formData2.reportingmanager}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={[
                                                        { label: 'Kannan R', value: 'Kannan R' },
                                                        { label: 'Shamala Nagaveni', value: 'Shamala Nagaveni' },
                                                        { label: 'Sathis Kumar', value: 'Sathis Kumar' },
                                                        { label: 'Santhosh', value: 'Santhosh' }
                                                    ]}
                                                    isOptionEqualToValue={(option, value) => option.value === value}

                                                    onChange={(event, value) => field.onChange(value ? value.value : '')}

                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
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
                                            defaultValue={formData2.reportingteamlead}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={[
                                                        { label: 'Kannan R  ', value: 'Kannan R' },
                                                        { label: 'Shamala Nagaveni ', value: 'Shamala Nagaveni' },
                                                        { label: 'Sathis Kumar ', value: 'Sathis Kumar' },
                                                        { label: 'Santhosh ', value: 'Santhosh' }
                                                    ]}
                                                    isOptionEqualToValue={(option, value) => option.value === value}
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
                                            defaultValue={formData2.designation}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(Designations)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    isOptionEqualToValue={(option, value) => option.value === value}
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
                                            defaultValue={formData2.department}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(Department)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    isOptionEqualToValue={(option, value) => option.value === value}
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
                                            defaultValue={formData2.team}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(Teams)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    isOptionEqualToValue={(option, value) => option.value === value}
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
                                            defaultValue={formData2.referrdby}
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
                                                    isOptionEqualToValue={(option, value) => option.value === value}
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
                                            defaultValue={formData2.employmentstatus}
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
                                            defaultValue={formData2.employeestatus}
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
                                            defaultValue={formData2.shift}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(shifts)}
                                                    onChange={(event, value) => field.onChange(value?.value)}
                                                    isOptionEqualToValue={(option, value) => option.value === value}
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
                                            defaultValue={formData2.grade}
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
                                                    <MenuItem value="L5">L6</MenuItem>
                                                    <MenuItem value="L5">L7</MenuItem>
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
                                            defaultValue={formData2.probabationperiod}
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
                                            defaultValue={formData2.salaryofferred}
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
                                            defaultValue={formData2.attendancebonus}
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
                                            defaultValue={formData2.totalmonthlyctc}
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
                                            // defaultValue={formData2.addresprofpath}
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
                                                                setFormData2((prev) => ({
                                                                    ...prev,
                                                                    addresprofpath: e.target.files[0].size,
                                                                }))
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
                                            defaultValue={formData2.totalyearlyctc}
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
                                            defaultValue={formData2.billablestatus}
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

                            <Grid container xs={6} >
                                <Grid container xs={12} alignItems="center" paddingBottom={3}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Current Address <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="currentaddress"
                                            control={control}
                                            defaultValue={formData3.currentaddress || ''}
                                            render={({ field }) => (
                                                <MultilineTextField
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.currentaddress}
                                                    helperText={errors.currentaddress ? errors.currentaddress.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData3((prev) => ({
                                                            ...prev,
                                                            currentaddress: e.target.value,
                                                        }));
                                                    }} />
                                            )}
                                        />
                                    </Grid>

                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={3}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Current City <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="currentCity"
                                            control={control}
                                            defaultValue={formData3.currentCity}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.currentCity}
                                                    helperText={errors.currentCity ? errors.currentCity.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData3((prev) => ({
                                                            ...prev,
                                                            currentCity: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container xs={12} alignItems="center" paddingBottom={3}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Pincode <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="currentPincode"
                                            control={control}
                                            defaultValue={formData3.currentPincode}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.currentPincode}
                                                    helperText={errors.currentPincode ? errors.currentPincode.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData3((prev) => ({
                                                            ...prev,
                                                            currentPincode: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid container xs={6} >
                                <Grid container xs={12} alignItems="center" paddingBottom={3}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Permanent Address <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="permanentAddress"
                                            control={control}
                                            defaultValue={formData3.permanentAddress}
                                            render={({ field }) => (
                                                <MultilineTextField
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.permanentAddress}
                                                    helperText={errors.permanentAddress ? errors.permanentAddress.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData3((prev) => ({
                                                            ...prev,
                                                            permanentAddress: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={3}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Permanent City <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>

                                    <Grid item xs={7}>
                                        <Controller
                                            name="permanentcity"
                                            control={control}
                                            defaultValue={formData3.permanentcity}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.permanentcity}
                                                    helperText={errors.permanentcity ? errors.permanentcity.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData3((prev) => ({
                                                            ...prev,
                                                            permanentcity: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} alignItems="center" paddingBottom={3}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Pincode <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="permanentPincode"
                                            control={control}
                                            defaultValue={formData3.permanentPincode}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.permanentPincode}
                                                    helperText={errors.permanentPincode ? errors.permanentPincode.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData3((prev) => ({
                                                            ...prev,
                                                            permanentPincode: e.target.value,
                                                        }));
                                                    }}
                                                />

                                            )}
                                        />
                                    </Grid>
                                </Grid>


                            </Grid>




                            <Grid container alignItems="center" paddingBottom={3}>
                                <Grid item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={copyToPermanent}
                                                onChange={handleCheckboxChange2}
                                                disabled={!(formData3.currentaddress && formData3.currentCity && formData3.currentPincode)}
                                            />
                                        }
                                        label="Same as Current Address"
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )}

                    {activeStep === 3 && (
                        < >

                            <Grid container xs={12} bgcolor={''} sx={{ borderBottom: '1px solid black', width: '20%' }}> {/* First Horizontal view page - 3 container */}

                                <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                </Grid>


                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Previous Organization Name 1
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="organization1"
                                            control={control}
                                            defaultValue={formData4.organization1}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            organization1: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Designation
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="designation1"
                                            control={control}
                                            defaultValue={formData4.designation1}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.designation1}
                                                    helperText={errors.designation1 ? errors.designation1.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            designation1: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Start Date
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="startdate1"
                                            control={control}
                                            defaultValue={formData4.startdate1}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            startdate1: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            End Date
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="enddate1"
                                            control={control}
                                            defaultValue={formData4.enddate1}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            enddate1: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Experience ( In Years)
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalExperience1"
                                            control={control}
                                            defaultValue={formData4.totalExperience1}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            totalExperience: e.target.value,
                                                        }));
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


                            </Grid>


                            <Grid container xs={12} bgcolor={''} sx={{ borderBottom: '1px solid black' }} > {/* Second Horizontal view page - 3 container */}


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

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Previous Organization Name 2
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="organization2"
                                            control={control}
                                            defaultValue={formData4.organization2}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.organization1}
                                                    helperText={errors.organization1 ? errors.organization1.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            organization2: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Designation
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="designation2"
                                            control={control}
                                            defaultValue={formData4.designation2}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            designation2: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Start Date
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="startdate2"
                                            control={control}
                                            defaultValue={formData4.startdate2}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            startdate2: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            End Date
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="enddate2"
                                            control={control}
                                            defaultValue={formData4.enddate2}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            enddate2: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Experience ( In Years)
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalExperience2"
                                            control={control}
                                            defaultValue={formData4.totalExperience2}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            totalExperience2: e.target.value,
                                                        }));
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

                            </Grid>



                            <Grid container xs={12} bgcolor={''}> {/* Third Horizontal view page - 3 container */}

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

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Previous Organization Name 3
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="organization3"
                                            control={control}
                                            defaultValue={formData4.organization3}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            organization3: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Designation
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="designation3"
                                            control={control}
                                            defaultValue={formData4.designation3}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            designation3: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Start Date
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="startdate3"
                                            control={control}
                                            defaultValue={formData4.startdate3}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            startdate3: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            End Date
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="enddate3"
                                            control={control}
                                            defaultValue={formData4.enddate3}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            enddate3: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container xs={4} alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Total Experience ( In Years)
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="totalExperience3"
                                            control={control}
                                            defaultValue={formData4.totalExperience3}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.totalExperience}
                                                    helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                                                    disabled
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            totalExperience3: e.target.value,
                                                        }));
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
                                            defaultValue={formData5.aadhaarnumber}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            aadhaarnumber: e.target.value,
                                                        }));
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
                                            defaultValue={formData5.pannumber}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            pannumber: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={6} container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Passport Number
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="passportnumber"
                                            control={control}
                                            defaultValue={formData5.passportnumber}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            passportnumber: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={6} container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            UAN Number
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="uannumber"
                                            control={control}
                                            defaultValue={formData5.uannumber}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            uannumber: e.target.value,
                                                        }));
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
                                            defaultValue={formData5.pfnumber || ''}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            pfnumber: e.target.value,
                                                        }));
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
                                            defaultValue={formData5.esinumber || ''}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            esinumber: e.target.value,
                                                        }));
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
                                            defaultValue={formData5.lwfnumber || ''}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            lwfnumber: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={4} container alignItems="center" paddingBottom={2} style={{ visibility: isPFChecked ? 'visible' : 'hidden', }} >
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            PF Join Date
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="pfjoindate"
                                            control={control}
                                            defaultValue={formData5.pfjoindate}
                                            render={({ field }) => (
                                                <StyledInput
                                                    fullWidth
                                                    {...field}
                                                    type="date"
                                                    variant="outlined"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.pfjoindate}
                                                    helperText={errors.pfjoindate ? errors.pfjoindate.message : ''}
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData5((prev) => ({
                                                            ...prev,
                                                            pfjoindate: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </>
                    )}

                    {activeStep === 5 && (
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
                                            name="modeofpayment"
                                            control={control}
                                            defaultValue={formData6.modeofpayment}
                                            render={({ field }) => (
                                                <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.modeofpayment}>
                                                    <InputLabel>
                                                        Payment Type <span style={{ color: 'red' }}>*</span>
                                                    </InputLabel>
                                                    <Select
                                                        {...field}
                                                        value={selectedPaymentType}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handlePaymentTypeChange(e);
                                                            setFormData6((prev) => ({
                                                                ...prev,
                                                                modeofpayment: e.target.value,
                                                            }));
                                                        }}
                                                        label="Payment Type"
                                                    >
                                                        <MenuItem value="cash">Cash</MenuItem>
                                                        <MenuItem value="banktransfer">Bank Transfer</MenuItem>
                                                        <MenuItem value="cheque">Cheque</MenuItem>
                                                        <MenuItem value="demanddraft">Demand Draft</MenuItem>
                                                    </Select>
                                                    <FormHelperText>
                                                        {errors.modeofpayment ? errors.modeofpayment.message : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>

                                        {selectedPaymentType === 'banktransfer' && (

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
                                                            defaultValue={formData6.bankname}
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
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        setFormData6((prev) => ({
                                                                            ...prev,
                                                                            bankname: e.target.value,
                                                                        }));
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
                                                            defaultValue={formData6.branchname}
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
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        setFormData6((prev) => ({
                                                                            ...prev,
                                                                            branchname: e.target.value,
                                                                        }));
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
                                                            defaultValue={formData6.ifsccode}
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
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        setFormData6((prev) => ({
                                                                            ...prev,
                                                                            ifsccode: e.target.value,
                                                                        }));
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container alignItems="center" paddingBottom={2}>
                                                    <Grid item xs={4}>
                                                        <StyledLabel>
                                                            Account Number <span style={{ color: 'red' }}>*</span>
                                                        </StyledLabel>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Controller
                                                            name="accountNumber"
                                                            control={control}
                                                            defaultValue={formData6.accountNumber}
                                                            render={({ field }) => (
                                                                <StyledInput
                                                                    {...field}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    error={!!errors.accountNumber}
                                                                    helperText={errors.accountNumber ? errors.accountNumber.message : ''}
                                                                    FormHelperTextProps={{
                                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        setFormData6((prev) => ({
                                                                            ...prev,
                                                                            accountNumber: e.target.value,
                                                                        }));
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container alignItems="center" paddingBottom={2}>
                                                    <Grid item xs={4}>
                                                        <StyledLabel>
                                                            Beneficiary Code <span style={{ color: 'red' }}>*</span>
                                                        </StyledLabel>
                                                    </Grid>

                                                    <Grid item xs={0}>
                                                        <StyledLabel>
                                                            :
                                                        </StyledLabel>
                                                    </Grid>

                                                    <Grid item xs={0} alignItems='flex-start'>
                                                        <StyledLabel>
                                                            Sathiskumar20027090924
                                                        </StyledLabel>
                                                    </Grid>
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
                    alignItems: 'center',
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

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2 }}>
                    <Gauge
                        width={70}
                        height={80}
                        value={percentagefunction()}
                        cornerRadius="50%"
                        sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 18,
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                                strokeWidth: 50,
                                fill: '#52b202',
                            },
                            [`& .${gaugeClasses.referenceArc}`]: {
                                fill: theme.palette.text.disabled,
                                strokeWidth: 15,
                            },
                        })}
                    />
                </Box>

                {activeStep === steps.length - 1 ? (
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit2} disabled={!isValid}>
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



