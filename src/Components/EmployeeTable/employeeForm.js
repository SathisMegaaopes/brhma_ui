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
import { Alert, Autocomplete, Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { useForm, Controller, useWatch, set } from 'react-hook-form';
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
import { useFetchData } from './customHook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSharedContext } from '../../Context';
import { reference } from '@popperjs/core';
import { useNavigate } from 'react-router-dom';


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

    const { insertRequest, setInsertRequest, employeeAddTab, setEmployeeAddTab } = useSharedContext();

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);

    const { control, handleSubmit, getValues, setValue, trigger, formState: { errors, isValid, isSubmitting, isSubmitSuccessful } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(getValidationSchema(activeStep)),
    });

    const [isPFChecked, setIsPFChecked] = React.useState(false);
    const [isESIChecked, setIsESIChecked] = React.useState(false);
    const [isLWFChecked, setIsLWFChecked] = React.useState(false);
    const [copyToPermanent, setCopyToPermanent] = React.useState(false);

    const [loading2, setLoading] = React.useState(false);
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');


    const [requesType, setRequestType] = React.useState(null)
    const [interRequest, setInterRequest] = React.useState(0)

    const [profileImageUrl, setProfileImageUrl] = React.useState(null);

    const [departments, setDepartments] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [shifts, setShifts] = React.useState([]);
    const [grade, setgrade] = React.useState([]);
    const [designation, setDesignation] = React.useState([]);
    const [addressprof, setAddressprof] = React.useState([]);

    const [available, setAvailable] = React.useState(0); // 0 => not present in db ,  1 => present in db ....

    const [candidatePopulate, setCandidatePopulate] = React.useState([]);

    const [uploadFileName, setUploadFileName] = React.useState(null)

    const [uploadStatus, setUploadStatus] = React.useState(false)


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

        // firstname: candidatePopulate?.firstname || 'firstname',
        // lastname: candidatePopulate?.lastname || 'lastname',
        // dateOfBirth: candidatePopulate?.dateOfBirth || '2024-10-02',
        // employeeNumber: '20002',
        // gender: candidatePopulate?.gender || 'Male',
        // email: candidatePopulate?.email || 'samatap26@gmail.com',
        // mobileNumber: candidatePopulate?.mobileNumber || '9778164504',
        // phone: '87781645077',
        // bloodGroup: 'A',
        // dateOfJoining: '2024-10-04',
        // fathersName: 'qqqqqqqqqqq',
        // fathersOccupation: 'testfatheroccupation',
        // countryOfOrigin: 'testindia',
        // nationality: 'testIndian',
        // emergencyContactName: 'qqqqqq',
        // emergencyContactNumber: '8777842222',
        // emergencyContactRelation: 'testemergencycontactrelation',
        // spouseName: 'testspousename',
        // physicallyChallenged: 'Yes',
        // education: 'B.E.,',
        // addressprofType: null
    });


    const [formData2, setFormData2] = React.useState({
        // reportingmanager: null,
        // reportingteamlead: null,
        // designation: null,
        // department: null,
        // team: null,
        // referrdby: null,
        // employmentstatus: null,
        // employeestatus: null,
        // shift: null,
        // grade: null,
        // probabationperiod: null,
        // salaryofferred: null,
        // totalmonthlyctc: null,
        // attendancebonus: null,
        // totalyearlyctc: null,
        // billablestatus: null,
        // addresprofpath: null,

        reportingmanager: 'Kannan R',
        reportingteamlead: 'Kannan R',
        designation: 'CEO',
        department: 'Executive',
        team: 'IT Team',
        referrdby: 'Kannan R',
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
        addresprofpath: null,

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
        beneficiarycode: null
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

        const url = `${URL}employeeonboard/employeeCheckIds`;

        const checkId = async () => {
            try {
                const response = await axios.get(url);

                const allData = response.data.data;

                if (Array.isArray(allData)) {
                    if (allData.includes(Number(formData1.employeeNumber))) {
                        setAvailable(1)
                    } else {
                        setAvailable(0)
                    }
                } else {
                    console.log('Received data is not an array');
                }


            } catch (error) {
                console.log('Error fetching employee data:', error);
            }
        };

        checkId();

    }, [formData1.employeeNumber, requesType, interRequest, activeStep]);



    React.useEffect(() => {
        if (insertRequest === 1 || insertRequest === 2) {
            setInterRequest(1);
        } else {
            setInterRequest(0);
        }
    }, [insertRequest])


    const teamUrl = `${URL}todolist/teams`;
    const departmentUrl = `${URL}todolist/department`;
    const employeeUrl = `${URL}todolist/employee`;
    const shiftUrl = `${URL}employeeonboard/shift`;
    const gradeUrl = `${URL}employeeonboard/grade`;
    const desginationUrl = `${URL}employeeonboard/designations`;
    const addressprofUrl = `${URL}employeeonboard/addressprof`;

    const getCandidate = `${URL}employeeonboard/getCandidate`;


    const { data, loading, error } = useFetchData(teamUrl);

    const { data: departmentData, loading: departmentLoading, error: departError } = useFetchData(departmentUrl);

    const { data: employeeData, loading: employeeLoading, error: employeeError } = useFetchData(employeeUrl);

    const { data: shiftData, loading: shiftLoading, error: shiftError } = useFetchData(shiftUrl);

    const { data: gradeData, loading: gradeLoading, error: gradeError } = useFetchData(gradeUrl);

    const { data: designationData, loading: designationLoading, error: designationError } = useFetchData(desginationUrl);

    const { data: addressprofData, loading: addressprofLoading, error: addressprofError } = useFetchData(addressprofUrl);

    const useConditionalFetch = (request) => {

        if (insertRequest === 1) {
            return useFetchData(getCandidate, { id: employeeAddTab.candidateId }, request);
        }
        return { data: null, loading: false, error: null };
    };

    const { data: candidateData, loading: candidateLoading, error: candidateError } = useConditionalFetch(insertRequest);



    React.useEffect(() => {

        setTeams(data?.data);

    }, [data])


    React.useEffect(() => {

        setDepartments(departmentData?.data);

    }, [departmentData])


    React.useEffect(() => {

        setEmployees(employeeData?.data);

    }, [employeeData])


    React.useEffect(() => {

        setShifts(shiftData?.data);

    }, [shiftData])

    React.useEffect(() => {

        setgrade(gradeData?.data);

    }, [gradeData])


    React.useEffect(() => {

        setDesignation(designationData?.data);

    }, [designationData])


    React.useEffect(() => {

        setAddressprof(addressprofData?.data);

    }, [addressprofData])


    React.useEffect(() => {

        setCandidatePopulate(candidateData?.data[0]);

    }, [candidateData])


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
            setValue('bankname', null, { shouldValidate: true });
            setValue('branchname', null, { shouldValidate: true });
            setValue('ifsccode', null, { shouldValidate: true });
            setValue('accountNumber', null, { shouldValidate: true })

            setFormData6(preState => ({
                ...preState,
                bankname: null,
                branchname: null,
                ifsccode: null,
                accountNumber: null
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

            setValue('permanentAddress', null, { shouldValidate: true });
            setValue('permanentcity', null, { shouldValidate: true });
            setValue('permanentPincode', null, { shouldValidate: true });

            setFormData3(preState => ({
                ...preState,
                permanentAddress: null,
                permanentcity: null,
                permanentPincode: null,
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


        }

    }, [formData4.startdate1, formData4.enddate1])


    React.useEffect(() => {

        if (formData4.startdate2 && formData4.enddate2) {

            const experience2 = calculateExperience(formData4.startdate2, formData4.enddate2);

            setValue('totalExperience2', experience2, { shouldValidate: true });

            setFormData4(preState => ({
                ...preState,
                totalExperience2: experience2,
            }))

        }

    }, [formData4.startdate2, formData4.enddate2])


    React.useEffect(() => {

        if (formData4.startdate3 && formData4.enddate3) {

            const experience3 = calculateExperience(formData4.startdate3, formData4.enddate3);

            setValue('totalExperience3', experience3, { shouldValidate: true });

            setFormData4(preState => ({
                ...preState,
                totalExperience3: experience3,
            }))

        }

    }, [formData4.startdate3, formData4.enddate3])



    React.useEffect(() => {

        if (!isPFChecked) {
            setValue('pfnumber', null, { shouldValidate: true });
            setValue('pfjoindate', null, { shouldValidate: true });

            setFormData5(preState => ({
                ...preState,
                pfnumber: null,
                pfjoindate: null,
            }))
        } else if (!isESIChecked) {
            setValue('esinumber', null, { shouldValidate: true });

            setFormData5(preState => ({
                ...preState,
                esinumber: null,
            }))
        } else if (!isLWFChecked) {
            setValue('lwfnumber', null, { shouldValidate: true });

            setFormData5(preState => ({
                ...preState,
                lwfnumber: null,
            }))
        }

    }, [isESIChecked, isPFChecked, isLWFChecked])


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

    React.useEffect(() => {  // Inserting the Candidate as a Employee Function


        if (insertRequest === 1) {
            if (candidatePopulate) {

                setValue('firstname', candidatePopulate.firstname, { shouldValidate: true });
                setValue('lastname', candidatePopulate.lastname, { shouldValidate: true });
                setValue('dateOfBirth', candidatePopulate.dateOfBirth, { shouldValidate: true })

                setValue('email', candidatePopulate.email, { shouldValidate: true });
                setValue('mobileNumber', candidatePopulate.mobileNumber, { shouldValidate: true });
                setValue('fathersName', candidatePopulate.fathersName, { shouldValidate: true });
                setValue('fathersOccupation', candidatePopulate.fathersOccupation, { shouldValidate: true });
                // address
                setValue('currentaddress', candidatePopulate.address, { shouldValidate: true });

                setValue('organization1', candidatePopulate.organization1, { shouldValidate: true });
                setValue('designation1', candidatePopulate.designation1, { shouldValidate: true });
                setValue('organization2', candidatePopulate.organization2, { shouldValidate: true });
                setValue('designation2', candidatePopulate.designation2, { shouldValidate: true });
                setValue('organization3', candidatePopulate.organization3, { shouldValidate: true });
                setValue('designation3', candidatePopulate.designation3, { shouldValidate: true });

                setFormData1((prev) => ({
                    ...prev,
                    firstname: candidatePopulate.firstname,
                    lastname: candidatePopulate.lastname,
                    dateOfBirth: candidatePopulate.dateOfBirth,
                    email: candidatePopulate.email,
                    mobileNumber: candidatePopulate.mobileNumber,
                    fathersName: candidatePopulate.fathersName,
                    fathersOccupation: candidatePopulate.fathersOccupation,
                }))

                setFormData3((prev) => ({
                    ...prev,
                    currentaddress: candidatePopulate.address,
                }))

                setFormData4((prev) => ({
                    ...prev,
                    organization1: candidatePopulate.organization1,
                    designation1: candidatePopulate.designation1,
                    organization2: candidatePopulate.organization2,
                    designation2: candidatePopulate.designation2,
                    organization3: candidatePopulate.organization3,
                    designation3: candidatePopulate.designation3,
                }))

                if (candidatePopulate.profileUrl) {

                    const imageUrl = `${URL}${formatImageUrl(candidatePopulate?.profileUrl)}`

                    setProfileImageUrl(imageUrl);

                } else {
                    setProfileImageUrl(null)
                }
            }
        }
    }, [candidatePopulate])


    React.useEffect(() => {   //Updating the user request....

        let url = `${URL}employeeonboard/getEmployee`;

        if (insertRequest === 0) {

            const fetchData = async () => {

                const employeeID = { employee_id: employeeAddTab.candidateId };

                const response = await axios.get(url, { params: employeeID });

                if (response.data.status === 1) {

                    const data = response.data.data;

                    setValue('firstname', data.firstname, { shouldValidate: true });
                    setValue('lastname', data.lastname, { shouldValidate: true });
                    setValue('dateOfBirth', data.dateOfBirth, { shouldValidate: true });
                    setValue('employeeNumber', data.employeeNumber, { shouldValidate: true });
                    setValue('gender', data.gender, { shouldValidate: true });
                    setValue('email', data.email, { shouldValidate: true });
                    setValue('mobileNumber', data.mobileNumber, { shouldValidate: true });
                    setValue('phone', data.phone, { shouldValidate: true });
                    setValue('bloodGroup', data.bloodGroup, { shouldValidate: true });
                    setValue('dateOfJoining', data.dateOfJoining, { shouldValidate: true });
                    setValue('fathersName', data.fathersName, { shouldValidate: true });
                    setValue('fathersOccupation', data.fathersOccupation, { shouldValidate: true });
                    setValue('countryOfOrigin', data.countryOfOrigin, { shouldValidate: true });
                    setValue('nationality', data.nationality, { shouldValidate: true });
                    setValue('emergencyContactName', data.emergencyContactName, { shouldValidate: true });
                    setValue('emergencyContactNumber', data.emergencyContactNumber, { shouldValidate: true });
                    setValue('emergencyContactRelation', data.emergencyContactRelation, { shouldValidate: true });
                    setValue('spouseName', data.spouseName, { shouldValidate: true });
                    setValue('physicallyChallenged', data.physicallyChallenged, { shouldValidate: true });
                    setValue('education', data.education, { shouldValidate: true });
                    setValue('addressprofType', data.addressprofType, { shouldValidate: true });
                    setValue('reportingmanager', data.reportingmanager, { shouldValidate: true });
                    setValue('reportingteamlead', data.reportingteamlead, { shouldValidate: true });
                    setValue('designation', data.designation, { shouldValidate: true });
                    setValue('department', data.department, { shouldValidate: true });
                    setValue('team', data.team, { shouldValidate: true });
                    setValue('referrdby', data.referrdby, { shouldValidate: true });
                    setValue('employmentstatus', data.employmentstatus, { shouldValidate: true });
                    setValue('employeestatus', data.employeestatus, { shouldValidate: true });
                    setValue('shift', data.shift, { shouldValidate: true });
                    setValue('grade', data.grade, { shouldValidate: true });
                    setValue('probabationperiod', data.probabationperiod, { shouldValidate: true });
                    setValue('salaryofferred', data.salaryofferred, { shouldValidate: true });
                    setValue('totalmonthlyctc', data.totalmonthlyctc, { shouldValidate: true });
                    setValue('attendancebonus', data.attendancebonus, { shouldValidate: true });
                    setValue('totalyearlyctc', data.totalyearlyctc, { shouldValidate: true });
                    setValue('billablestatus', data.billablestatus, { shouldValidate: true });
                    setValue('addresprofpath', data.addresprofpath, { shouldValidate: true });
                    setValue('currentaddress', data.currentaddress, { shouldValidate: true });
                    setValue('permanentAddress', data.permanentAddress, { shouldValidate: true });
                    setValue('currentCity', data.currentCity, { shouldValidate: true });
                    setValue('currentPincode', data.currentPincode, { shouldValidate: true });
                    setValue('permanentcity', data.permanentcity, { shouldValidate: true });
                    setValue('permanentPincode', data.permanentPincode, { shouldValidate: true });
                    setValue('organization1', data.organization1, { shouldValidate: true });
                    setValue('designation1', data.designation1, { shouldValidate: true });
                    setValue('startdate1', data.startdate1, { shouldValidate: true });
                    setValue('enddate1', data.enddate1, { shouldValidate: true });
                    setValue('totalExperience1', data.totalExperience1, { shouldValidate: true });
                    setValue('organization2', data.organization2, { shouldValidate: true });
                    setValue('designation2', data.designation2, { shouldValidate: true });
                    setValue('startdate2', data.startdate2, { shouldValidate: true });
                    setValue('enddate2', data.enddate2, { shouldValidate: true });
                    setValue('totalExperience2', data.totalExperience2, { shouldValidate: true });
                    setValue('organization3', data.organization3, { shouldValidate: true });
                    setValue('designation3', data.designation3, { shouldValidate: true });
                    setValue('startdate3', data.startdate3, { shouldValidate: true });
                    setValue('enddate3', data.enddate3, { shouldValidate: true });
                    setValue('totalExperience3', data.totalExperience3, { shouldValidate: true });
                    setValue('aadhaarnumber', data.aadhaarnumber, { shouldValidate: true });
                    setValue('pannumber', data.pannumber, { shouldValidate: true });
                    setValue('passportnumber', data.passportnumber, { shouldValidate: true });
                    setValue('uannumber', data.uannumber, { shouldValidate: true });
                    setValue('pfnumber', data.pfnumber, { shouldValidate: true });
                    setValue('pfjoindate', data.pfjoindate, { shouldValidate: true });
                    setValue('esinumber', data.esinumber, { shouldValidate: true });
                    setValue('lwfnumber', data.lwfnumber, { shouldValidate: true });
                    setValue('modeofpayment', data.modeofpayment, { shouldValidate: true });
                    setValue('bankname', data.bankname, { shouldValidate: true });
                    setValue('branchname', data.branchname, { shouldValidate: true });
                    setValue('ifsccode', data.ifsccode, { shouldValidate: true });
                    setValue('accountNumber', data.accountNumber, { shouldValidate: true });
                    setValue('beneficiarycode', data.beneficiarycode, { shouldValidate: true });

                    setFormData1((prev) => ({
                        ...prev,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
                        employeeNumber: data.employeeNumber,
                        gender: data.gender,
                        email: data.email,
                        mobileNumber: data.mobileNumber,
                        phone: data.phone,
                        bloodGroup: data.bloodGroup,
                        dateOfJoining: data.dateOfJoining,
                        fathersName: data.fathersName,
                        fathersOccupation: data.fathersOccupation,
                        countryOfOrigin: data.countryOfOrigin,
                        nationality: data.nationality,
                        emergencyContactName: data.emergencyContactName,
                        emergencyContactNumber: data.emergencyContactNumber,
                        emergencyContactRelation: data.emergencyContactRelation,
                        spouseName: data.spouseName,
                        physicallyChallenged: data.physicallyChallenged,
                        education: data.education,
                        addressprofType: data.addressprofType,
                    }))


                    setFormData2((prev) => ({
                        ...prev,
                        reportingmanager: data.reportingmanager,
                        reportingteamlead: data.reportingteamlead,
                        designation: data.designation,
                        department: handleUpdateDepartment(data.department),
                        team: data.team,
                        referrdby: data.referrdby,
                        employmentstatus: data.employmentstatus,
                        employeestatus: data.employeestatus,
                        shift: data.shift,
                        grade: data.grade,
                        probabationperiod: data.probabationperiod,
                        salaryofferred: data.salaryofferred,
                        totalmonthlyctc: data.totalmonthlyctc,
                        attendancebonus: data.attendancebonus,
                        totalyearlyctc: data.totalyearlyctc,
                        billablestatus: data.billablestatus,
                        addresprofpath: data.addresprofpath,
                    }))


                    setFormData3((prev) => ({
                        ...prev,
                        currentaddress: data.currentaddress,
                        permanentAddress: data.permanentAddress,
                        currentCity: data.currentCity,
                        currentPincode: data.currentPincode,
                        permanentcity: data.permanentcity,
                        permanentPincode: data.permanentPincode
                    }))


                    setFormData4((prev) => ({
                        ...prev,
                        organization1: data.organization1,
                        designation1: data.designation1,
                        startdate1: data.startdate1,
                        enddate1: data.enddate1,
                        totalExperience1: data.totalExperience1,
                        organization2: data.organization2,
                        designation2: data.designation2,
                        startdate2: data.startdate2,
                        enddate2: data.enddate2,
                        totalExperience2: data.totalExperience2,
                        organization3: data.organization3,
                        designation3: data.designation3,
                        startdate3: data.startdate3,
                        enddate3: data.enddate3,
                        totalExperience3: data.totalExperience3,
                    }))


                    setFormData5((prev) => ({
                        ...prev,
                        aadhaarnumber: data.aadhaarnumber,
                        pannumber: data.pannumber,
                        passportnumber: data.passportnumber,
                        uannumber: data.uannumber,
                        pfnumber: data.pfnumber,
                        pfjoindate: data.pfjoindate,
                        esinumber: data.esinumber,
                        lwfnumber: data.lwfnumber
                    }))


                    setFormData6((prev) => ({
                        ...prev,
                        modeofpayment: data.modeofpayment,
                        bankname: data.bankname,
                        branchname: data.branchname,
                        ifsccode: data.ifsccode,
                        accountNumber: data.accountNumber,
                        beneficiarycode: data.beneficiarycode,
                    }))

                    setSelectedPaymentType(data.modeofpayment);

                    setProfileImageUrl(data.profileUrl);

                }
            }

            fetchData();
        }

    }, [])


    React.useEffect(() => {

        const demoData = { ...formData2 };

        if (departments) {
            const secondDemo = Object.entries(departments).find(([key, value]) => value.name === demoData.department)?.[1];

            const thirdDemo = Object.entries(teams).find(([key, value]) => value.name === demoData.team)?.[1];

            const fourthDemo = Object.entries(employees).find(([key, value]) => `${value.f_name} ${value.l_name}` === demoData.referrdby)?.[1];

            demoData.department = secondDemo?.id;
            demoData.team = thirdDemo?.id;
            demoData.referrdby = fourthDemo?.emp_id;

        }

    }, [formData2, departments, employees])



    const updateFormData2 = () => {
        const demoData = { ...formData2 };

        if (departments) {
            const secondDemo = Object.entries(departments).find(([key, value]) => value.name === demoData.department)?.[1];
            const thirdDemo = Object.entries(teams).find(([key, value]) => value.name === demoData.team)?.[1];
            const fourthDemo = Object.entries(employees).find(([key, value]) => `${value.f_name} ${value.l_name}` === demoData.referrdby)?.[1];

            demoData.department = secondDemo?.id;
            demoData.team = thirdDemo?.id;
            demoData.referrdby = fourthDemo?.emp_id;

            return demoData;
        }

        return formData2;
    };


    const handleNext = async () => {
        let url;
        let data

        if (activeStep === 0) {
            url = `${URL}employeeonboard/basicInformation`;
            data = formData1;
        } else if (activeStep === 1) {
            url = `${URL}employeeonboard/employeePosition`;
            // data = formData2;
            data = updateFormData2();
        } else if (activeStep === 2) {
            url = `${URL}employeeonboard/employeeAddress`;
            data = formData3;
        } else if (activeStep === 3) {
            url = `${URL}employeeonboard/employeeExperience`;
            data = formData4;
        } else if (activeStep === 4) {
            url = `${URL}employeeonboard/employeeStatutoryinfo`;
            data = formData5;
        }


        try {
            const response = await axios.post(url, {
                formData: data, operationType: insertRequest, requestType: interRequest, emp_id: Number(formData1.employeeNumber), referenceid: employeeAddTab.candidateId, activeStep: activeStep,
                profileUrl: profileImageUrl, available: available
            })

        } catch (error) {
            console.log(error, 'Youre getting error da sathis uh.... ')
        }

        const isStepValid = await trigger();
        if (isStepValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };



    React.useEffect(() => {

        function beneficiaryfn() {
            if (formData1.firstname && formData1.lastname && formData1.employeeNumber && formData1.dateOfJoining) {
                return `${formData1.firstname.replace(/\s+/g, '')}${formData1.lastname.replace(/\s+/g, '')}${formData1.employeeNumber}${formData1.dateOfJoining.replace(/-/g, '')}`;
            } else {
                return null;
            }
        }


        const code = beneficiaryfn();

        setValue('beneficiarycode', code, { shouldValidate: true });

        if (code) {
            setFormData6(preState => ({
                ...preState,
                beneficiarycode: code,
            }));
        }
    }, [formData1.firstname, formData1.lastname, formData1.employeeNumber, formData1.dateOfJoining]);


    const handleSubmit2 = async () => {

        let url = `${URL}employeeonboard/employeePaymentmode`;

        let data = formData6


        try {

            const response = await axios.post(url, { formData: data, operationType: insertRequest, requestType: interRequest, emp_id: Number(formData1.employeeNumber), referenceid: employeeAddTab.candidateId, activeStep: activeStep })


            if (response.data.status === 1) {
                setSnackbarMessage(1);
                setShowSnackbar(true);

                setLoading(true);

                setTimeout(() => {

                    setLoading(false);

                    setShowSnackbar(false);


                    setEmployeeAddTab((prev) => ({
                        ...prev,
                        status: 2,
                    }));


                }, 3000);
            }
            else {
                setSnackbarMessage(0);
                setShowSnackbar(true);
                setLoading(false);
            }


            // if (response.data.status === 1) {


            //     setEmployeeAddTab((prev) => ({
            //         ...prev,
            //         status: 2,
            //     }))

            // }
            // console.log(response.data.status, ' final Log ..... ')

        } catch (error) {
            setSnackbarMessage(0);
            setShowSnackbar(true);
            setLoading(false);
            console.log(error, 'Youre getting error da sathis uh.... ')

        }


    }


    const handlebackDataPopulate = async (val) => {

        let url = `${URL}employeeonboard/getPageData`;

        try {

            const params = {
                employee_id: formData1.employeeNumber,
                pageNumber: val,
            }

            const response = await axios.get(url, { params: params })

            if (response?.data?.status === 1) {

                const data = response?.data?.data;

                // console.log(data, ' blah blah blah blah blah blah hhhhhhh  ')

                if (val === 0) {

                    setValue('firstname', data.firstname, { shouldValidate: true });
                    setValue('lastname', data.lastname, { shouldValidate: true });
                    setValue('dateOfBirth', data.dateOfBirth, { shouldValidate: true });
                    setValue('employeeNumber', data.employeeNumber, { shouldValidate: true });
                    setValue('gender', data.gender, { shouldValidate: true });
                    setValue('email', data.email, { shouldValidate: true });
                    setValue('mobileNumber', data.mobileNumber, { shouldValidate: true });
                    setValue('phone', data.phone, { shouldValidate: true });
                    setValue('bloodGroup', data.bloodGroup, { shouldValidate: true });
                    setValue('dateOfJoining', data.dateOfJoining, { shouldValidate: true });
                    setValue('fathersName', data.fathersName, { shouldValidate: true });
                    setValue('fathersOccupation', data.fathersOccupation, { shouldValidate: true });
                    setValue('countryOfOrigin', data.countryOfOrigin, { shouldValidate: true });
                    setValue('nationality', data.nationality, { shouldValidate: true });
                    setValue('emergencyContactName', data.emergencyContactName, { shouldValidate: true });
                    setValue('emergencyContactNumber', data.emergencyContactNumber, { shouldValidate: true });
                    setValue('emergencyContactRelation', data.emergencyContactRelation, { shouldValidate: true });
                    setValue('spouseName', data.spouseName, { shouldValidate: true });
                    setValue('physicallyChallenged', data.physicallyChallenged, { shouldValidate: true });
                    setValue('education', data.education, { shouldValidate: true });
                    setValue('addressprofType', data.addressprofType, { shouldValidate: true });
                    // console.log('Yes da Sathis mame....')


                    setFormData1((prev) => ({
                        ...prev,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
                        employeeNumber: data.employeeNumber,
                        gender: data.gender,
                        email: data.email,
                        mobileNumber: data.mobileNumber,
                        phone: data.phone,
                        bloodGroup: data.bloodGroup,
                        dateOfJoining: data.dateOfJoining,
                        fathersName: data.fathersName,
                        fathersOccupation: data.fathersOccupation,
                        countryOfOrigin: data.countryOfOrigin,
                        nationality: data.nationality,
                        emergencyContactName: data.emergencyContactName,
                        emergencyContactNumber: data.emergencyContactNumber,
                        emergencyContactRelation: data.emergencyContactRelation,
                        spouseName: data.spouseName,
                        physicallyChallenged: data.physicallyChallenged,
                        education: data.education,
                        addressprofType: data.addressprofType,
                    }))


                } else if (val === 1) {

                    setValue('reportingmanager', data.reportingmanager, { shouldValidate: true });
                    setValue('reportingteamlead', data.reportingteamlead, { shouldValidate: true });
                    setValue('designation', data.designation, { shouldValidate: true });
                    setValue('department', data.department, { shouldValidate: true });
                    setValue('team', data.team, { shouldValidate: true });
                    setValue('referrdby', data.referrdby, { shouldValidate: true });
                    setValue('employmentstatus', data.employmentstatus, { shouldValidate: true });
                    setValue('employeestatus', data.employeestatus, { shouldValidate: true });
                    setValue('shift', data.shift, { shouldValidate: true });
                    setValue('grade', data.grade, { shouldValidate: true });
                    setValue('probabationperiod', data.probabationperiod, { shouldValidate: true });
                    setValue('salaryofferred', data.salaryofferred, { shouldValidate: true });
                    setValue('totalmonthlyctc', data.totalmonthlyctc, { shouldValidate: true });
                    setValue('attendancebonus', data.attendancebonus, { shouldValidate: true });
                    setValue('totalyearlyctc', data.totalyearlyctc, { shouldValidate: true });
                    setValue('billablestatus', data.billablestatus, { shouldValidate: true });
                    setValue('addresprofpath', data.addresprofpath, { shouldValidate: true });


                    setFormData2((prev) => ({
                        ...prev,
                        reportingmanager: data.reportingmanager,
                        reportingteamlead: data.reportingteamlead,
                        designation: data.designation,
                        department: data.department,
                        team: data.team,
                        referrdby: data.referrdby,
                        employmentstatus: data.employmentstatus,
                        employeestatus: data.employeestatus,
                        shift: data.shift,
                        grade: data.grade,
                        probabationperiod: data.probabationperiod,
                        salaryofferred: data.salaryofferred,
                        totalmonthlyctc: data.totalmonthlyctc,
                        attendancebonus: data.attendancebonus,
                        totalyearlyctc: data.totalyearlyctc,
                        billablestatus: data.billablestatus,
                        addresprofpath: data.addresprofpath,
                    }))

                } else if (val === 2) {
                    setValue('currentaddress', data.currentaddress, { shouldValidate: true });
                    setValue('permanentAddress', data.permanentAddress, { shouldValidate: true });
                    setValue('currentCity', data.currentCity, { shouldValidate: true });
                    setValue('currentPincode', data.currentPincode, { shouldValidate: true });
                    setValue('permanentcity', data.permanentcity, { shouldValidate: true });
                    setValue('permanentPincode', data.permanentPincode, { shouldValidate: true });

                    setFormData3((prev) => ({
                        ...prev,
                        currentaddress: data.currentaddress,
                        permanentAddress: data.permanentAddress,
                        currentCity: data.currentCity,
                        currentPincode: data.currentPincode,
                        permanentcity: data.permanentcity,
                        permanentPincode: data.permanentPincode
                    }))

                } else if (val === 3) {
                    setValue('organization1', data.organization1, { shouldValidate: true });
                    setValue('designation1', data.designation1, { shouldValidate: true });
                    setValue('startdate1', data.startdate1, { shouldValidate: true });
                    setValue('enddate1', data.enddate1, { shouldValidate: true });
                    setValue('totalExperience1', data.totalExperience1, { shouldValidate: true });
                    setValue('organization2', data.organization2, { shouldValidate: true });
                    setValue('designation2', data.designation2, { shouldValidate: true });
                    setValue('startdate2', data.startdate2, { shouldValidate: true });
                    setValue('enddate2', data.enddate2, { shouldValidate: true });
                    setValue('totalExperience2', data.totalExperience2, { shouldValidate: true });
                    setValue('organization3', data.organization3, { shouldValidate: true });
                    setValue('designation3', data.designation3, { shouldValidate: true });
                    setValue('startdate3', data.startdate3, { shouldValidate: true });
                    setValue('enddate3', data.enddate3, { shouldValidate: true });
                    setValue('totalExperience3', data.totalExperience3, { shouldValidate: true });

                    setFormData4((prev) => ({
                        ...prev,
                        organization1: data.organization1,
                        designation1: data.designation1,
                        startdate1: data.startdate1,
                        enddate1: data.enddate1,
                        totalExperience1: data.totalExperience1,
                        organization2: data.organization2,
                        designation2: data.designation2,
                        startdate2: data.startdate2,
                        enddate2: data.enddate2,
                        totalExperience2: data.totalExperience2,
                        organization3: data.organization3,
                        designation3: data.designation3,
                        startdate3: data.startdate3,
                        enddate3: data.enddate3,
                        totalExperience3: data.totalExperience3,
                    }))

                } else if (val === 4) {
                    setValue('aadhaarnumber', data.aadhaarnumber, { shouldValidate: true });
                    setValue('pannumber', data.pannumber, { shouldValidate: true });
                    setValue('passportnumber', data.passportnumber, { shouldValidate: true });
                    setValue('uannumber', data.uannumber, { shouldValidate: true });
                    setValue('pfnumber', data.pfnumber, { shouldValidate: true });
                    setValue('pfjoindate', data.pfjoindate, { shouldValidate: true });
                    setValue('esinumber', data.esinumber, { shouldValidate: true });
                    setValue('lwfnumber', data.lwfnumber, { shouldValidate: true });

                    setFormData5((prev) => ({
                        ...prev,
                        aadhaarnumber: data.aadhaarnumber,
                        pannumber: data.pannumber,
                        passportnumber: data.passportnumber,
                        uannumber: data.uannumber,
                        pfnumber: data.pfnumber,
                        pfjoindate: data.pfjoindate,
                        esinumber: data.esinumber,
                        lwfnumber: data.lwfnumber
                    }))

                }
            }

        }
        // console.log(response?.data?.data, 'important da Sathis uh .....')

        catch (error) {

        }
    }





    const handleBack = () => {

        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        const value = activeStep - 1;

        handlebackDataPopulate(value);

        // console.log(activeStep - 1, 'This is the active step , when I clicking on the back button.....');

        //Here I need to make a api call,,,,


        // console.log(formData1.employeeNumber, 'This is the employee number , Im going to get the details from the api dude....')



        // console.log('So form here only I have to select , whether it is a , current step or not the current step......')
    };


    const onSubmit = (data) => {
        // setFormData((prevData) => ({ ...prevData, ...data }));
    };


    const mapOptions = (data) => {
        return data.map(item => ({
            label: item.name,
            value: item.name
        }));
    }

    const employeeMap = (data) => {
        return data.map((item) => ({
            label: item.f_name + " " + item.l_name,
            value: item.f_name + " " + item.l_name
        }))
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



    const handleProofUpload = async (event) => {

        const selectedFile = event.target.files[0];

        setUploadFileName(selectedFile.name);

        const addressData = new FormData();
        addressData.append('file', selectedFile);
        addressData.append('id', formData1.employeeNumber ? formData1.employeeNumber : Math.floor(1000 + Math.random() * 9000))

        let url = URL + "employeeonboard/addressprof";

        try {

            const response = await axios.post(url, addressData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })


            if (response?.data?.status === 1) {
                setUploadStatus(!uploadStatus)
            }

            setFormData2((prev) => ({
                ...prev,
                addresprofpath: response?.data?.data?.url,
            }))

        } catch (error) {
            console.log(error, 'This is the error in the uploadfile')
            setUploadStatus(false)
        }

    }


    // addressprof

    const handleProfileUpload = async (e) => {

        const file = e.target.files[0];

        const profileFormData = new FormData();

        profileFormData.append('file', file);


        let url = URL + "employeeonboard/profileUpload";

        try {

            const response = await axios.post(url, profileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response?.data?.status === 1) {

                if (response?.data?.data?.url) {

                    const imageUrl = `${URL}${formatImageUrl(response?.data?.data?.url)}`;

                    setProfileImageUrl(imageUrl);

                } else {
                    setProfileImageUrl(null)
                }

            }

        } catch (error) {
            console.log(error, 'Error in uploading the profile picture....')
        }


    }

    const handleUpdateDepartment = (val) => {

        if (departments) {

            console.log(val)

            console.log(departments)

            const gettingName = Object.entries(departments).find(([key, value]) => value.id === val)

            console.log(gettingName, 'This is important dude .......')

            return val ;

        }

    }


    return (
        <Box sx={{ width: '100%', paddingLeft: 6 }}>
            {loading2 &&

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress />
                </Box>

            }

            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(!showSnackbar)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    zIndex: 2,
                }}
            >
                <Alert
                    onClose={() => setShowSnackbar(!showSnackbar)}
                    severity={snackbarMessage === 1 ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage === 1 ? 'Successfully Completed' : 'Something went Wrong !'}
                </Alert>
            </Snackbar>


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

                                <Grid item xs={2} > {/* Avatar container */}

                                    <Grid item xs={12} paddingLeft={5} position="fixed">
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleProfileUpload}
                                            id="file-input"
                                        />
                                        <label htmlFor="file-input">
                                            <Avatar
                                                sx={{ width: 200, height: 200, cursor: 'pointer' }}
                                                alt="Profile Image"
                                                src={profileImageUrl}
                                            />
                                        </label>
                                    </Grid>


                                </Grid>

                                <Grid container xs={10} paddingLeft={6} columnGap={2} >  {/* Basic Details , like name and other container */}

                                    <Grid container xs={6} spacing={1} >  {/* First Half container */}

                                        <Grid container >
                                            <Grid xs={6} container alignItems="center" paddingBottom={2} >
                                                <Grid item xs={4} >
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
                                                                    style: { margin: 0, position: 'absolute', bottom: '-20px', width: 'max-content' }
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
                                                                    style: { margin: 0, position: 'absolute', bottom: '-20px', width: 'max-content' }
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
                                                                style: { margin: 0, position: 'relative', bottom: '-8px' }
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
                                                    defaultValue={formData1.gender || ''}
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
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
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
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
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
                                                    />
                                                )}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
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
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid container xs={4} bgcolor={''}> {/* Second Half child - 2 Container */}

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4} >
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
                                                    />
                                                )}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>

                                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
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
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" paddingBottom={2}>
                                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
                                            <StyledLabel>
                                                Physically Challenged (Yes/No)
                                            </StyledLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Controller
                                                name="physicallyChallenged"
                                                control={control}
                                                defaultValue={formData1.physicallyChallenged || ''}
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
                                                defaultValue={formData1.addressprofType || ''}
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
                                                        {addressprof?.map(item => (
                                                            <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                                        ))}
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
                                            defaultValue={formData2.reportingmanager || ''}
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

                                                    onChange={(event, value) => {
                                                        const newValue = value ? value.value : null;
                                                        setFormData2((prevData) => ({
                                                            ...prevData,
                                                            reportingmanager: newValue,
                                                        }));
                                                        field.onChange(newValue);
                                                    }}
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
                                            defaultValue={formData2.reportingteamlead || ''}
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
                                                    onChange={(event, value) => {
                                                        const newValue = value ? value.value : null;
                                                        setFormData2((prevData) => ({
                                                            ...prevData,
                                                            reportingteamlead: newValue,
                                                        }));
                                                        field.onChange(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
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
                                            defaultValue={formData2.designation || ''}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(designation)}
                                                    onChange={(event, value) => {
                                                        const newValue = value ? value.value : null;
                                                        setFormData2((prevData) => ({
                                                            ...prevData,
                                                            designation: newValue,
                                                        }));
                                                        field.onChange(newValue);
                                                    }}
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
                                            defaultValue={formData2.department || ''}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(departments)}
                                                    onChange={(event, value) => {
                                                        const newValue = value ? value.value : null;
                                                        setFormData2((prevData) => ({
                                                            ...prevData,
                                                            department: newValue,
                                                        }));
                                                        field.onChange(newValue);
                                                    }}
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
                                            defaultValue={formData2.team || ''}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={mapOptions(teams)}
                                                    onChange={(event, value) => {
                                                        const newValue = value ? value.value : null;
                                                        setFormData2((prevData) => ({
                                                            ...prevData,
                                                            team: newValue,
                                                        }));
                                                        field.onChange(newValue);
                                                    }}
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
                                            defaultValue={formData2.referrdby || ''}
                                            render={({ field }) => (

                                                <Autocomplete
                                                    {...field}
                                                    options={employeeMap(employees)}
                                                    onChange={(event, value) => {
                                                        const newValue = value ? value.value : null;
                                                        setFormData2((prevData) => ({
                                                            ...prevData,
                                                            referrdby: newValue,
                                                        }));
                                                        field.onChange(newValue);
                                                    }}
                                                    isOptionEqualToValue={(option, value) => option.value === value}
                                                    renderInput={(params) => (
                                                        <StyledInput
                                                            {...params}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            employmentstatus: e.target.value,
                                                        }));
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            employeestatus: e.target.value,
                                                        }));
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
                                                    onChange={(event, value) => {
                                                        const newValue = value ? value.value : null;
                                                        setFormData2((prevData) => ({
                                                            ...prevData,
                                                            shift: newValue,
                                                        }));
                                                        field.onChange(newValue);
                                                    }}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            grade: e.target.value,
                                                        }));
                                                    }}
                                                >
                                                    {grade.map(item => (
                                                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                                    ))}
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            probabationperiod: e.target.value,
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            salaryofferred: e.target.value,
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            attendancebonus: e.target.value,
                                                        }));
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            totalmonthlyctc: e.target.value,
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            totalyearlyctc: e.target.value,
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
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData2((prev) => ({
                                                            ...prev,
                                                            billablestatus: e.target.value,
                                                        }));
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

                                {/* {(insertRequest === 1 || insertRequest === 2) && */}

                                <Grid container alignItems="center" paddingBottom={2}>
                                    <Grid item xs={4}>
                                        <StyledLabel>
                                            Upload Address Proof <span style={{ color: 'red' }}>*</span>
                                        </StyledLabel>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Controller
                                            name="fileupload"
                                            control={control}
                                            defaultValue={formData2.addresprofpath}
                                            render={({ field }) => (
                                                <div>
                                                    <Button
                                                        variant="outlined"
                                                        component="label"
                                                        fullWidth
                                                        color="primary"
                                                        style={{ marginBottom: '3px' }}
                                                    >
                                                        {uploadStatus ? 'File Uploaded' : 'Upload File'}
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={(e) => { handleProofUpload(e) }}
                                                        />

                                                        {uploadFileName && (
                                                            uploadStatus ? <CheckCircleIcon style={{ color: 'green', marginLeft: '12px' }} /> :
                                                                <CancelIcon style={{ color: 'red', marginLeft: '12px' }} />
                                                        )}

                                                    </Button>

                                                    <FormHelperText style={{ color: errors.fileupload ? 'red' : 'inherit' }}>
                                                        {errors.fileupload?.message ? ` - ${errors.fileupload.message}` : uploadFileName ? uploadFileName : 'No file selected'}
                                                    </FormHelperText>
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                {/* } */}


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
                                                    error={!!errors.organization1}
                                                    helperText={errors.organization1 ? errors.organization1.message : ''}
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
                                                    error={!!errors.startdate1}
                                                    helperText={errors.startdate1 ? errors.startdate1.message : ''}
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
                                                    error={!!errors.enddate1}
                                                    helperText={errors.enddate1 ? errors.enddate1.message : ''}
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
                                                    error={!!errors.totalExperience1}
                                                    helperText={errors.totalExperience1 ? errors.totalExperience1.message : ''}
                                                    disabled
                                                    FormHelperTextProps={{
                                                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                                    }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFormData4((prev) => ({
                                                            ...prev,
                                                            totalExperience1: e.target.value,
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
                                                    error={!!errors.organization2}
                                                    helperText={errors.organization2 ? errors.organization2.message : ''}
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
                                                    error={!!errors.designation2}
                                                    helperText={errors.designation2 ? errors.designation2.message : ''}
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
                                                    error={!!errors.startdate2}
                                                    helperText={errors.startdate2 ? errors.startdate2.message : ''}
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
                                                    error={!!errors.enddate2}
                                                    helperText={errors.enddate2 ? errors.enddate2.message : ''}
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
                                                    error={!!errors.totalExperience2}
                                                    helperText={errors.totalExperience2 ? errors.totalExperience2.message : ''}
                                                    disabled
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
                                                    error={!!errors.organization3}
                                                    helperText={errors.organization3 ? errors.organization3.message : ''}
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
                                                    error={!!errors.designation3}
                                                    helperText={errors.designation3 ? errors.designation3.message : ''}
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
                                                    error={!!errors.startdate3}
                                                    helperText={errors.startdate3 ? errors.startdate3.message : ''}
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
                                                    error={!!errors.enddate3}
                                                    helperText={errors.enddate3 ? errors.enddate3.message : ''}
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
                                                    error={!!errors.totalExperience3}
                                                    helperText={errors.totalExperience3 ? errors.totalExperience3.message : ''}
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
                                                    {`${formData1.firstname.replace(/\s+/g, '')}${formData1.lastname.replace(/\s+/g, '')}${formData1.employeeNumber}${formData1.dateOfJoining.replace(/-/g, '')}`}
                                                </StyledLabel>
                                            </Grid>
                                        </Grid>

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
                    // <Button variant="outlined" color="primary" onClick={handleNext} disabled={!isValid || (activeStep === 1 && !formData2.addresprofpath)}>
                    <Button variant="outlined" color="primary" onClick={handleNext} disabled={!isValid}>
                        Next
                    </Button>
                )}
            </Box>

        </Box >

    );
}