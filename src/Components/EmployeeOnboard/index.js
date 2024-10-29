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
import { Alert, Autocomplete, Avatar, Breadcrumbs, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, Link, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
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
import { useFetchData } from '../EmployeeTable/customHook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSharedContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'rsuite';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import EmployeeBasicInformation from './employeeBasicInformation';
import EmployeePosition from './emloyeePosition';
import EmployeeAddress from './employeeAddress';
import EmployeeExperience from './employeeExperience';
import EmployeeStatuoryinfo from './employeeStatuoryinfo';
import EmployeePaymentMode from './employeePaymentMode';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


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
        .min(5, 'At least five digit is required')
    ,
    lastname: Yup.string()
        .required('Employee Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Employee Name must contain only characters..')
        .min(1, 'At least one digit is required')
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
    education: Yup.string()
        .required('Education is required'),
    addressprofType: Yup.string()
        .required('Please mention the type of address'),
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
        .matches(/^\d+$/, 'Aadhar Number must contain only digits')
        .required('Aadhaar number is required.')
        .min(12, 'Enter a valid Aadhaar number')
        .max(12, 'Addhar number cannot exceed more that 12 digits'),
    pannumber: Yup.string()
        .required('PAN number is required.')
        .min(10, 'Enter a valid PAN number')
        .max(10, 'PAN number cannot exceed more that 10 digits'),
})

const schemaValidationForForm5 = Yup.object().shape({
    modeofpayment: Yup.string()
        .required('Payment mode is required..')

})

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

    const { control, handleSubmit, getValues, setValue, reset, trigger, formState: { errors, isValid, isSubmitting, isSubmitSuccessful } } = useForm({
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

    const [accordianExpand, setAccordianExpand] = React.useState(0)

    const [available, setAvailable] = React.useState(0); // 0 => not present in db ,  1 => present in db ....

    const [candidatePopulate, setCandidatePopulate] = React.useState([]);

    const [uploadFileName, setUploadFileName] = React.useState(null)

    const [uploadStatus, setUploadStatus] = React.useState(false);

    const [openEdit, setOpenEdit] = React.useState((insertRequest === 0) ? true : false);
    // const [openEdit, setOpenEdit] = React.useState(true);  /// ithu ena nu pakkanum sathis ...... 
    const [openEdittwo, setOpenEdittwo] = React.useState((insertRequest === 0) ? true : false);
    const [openEditthree, setOpenEditthree] = React.useState((insertRequest === 0) ? true : false);
    const [openEditfour, setOpenEditfour] = React.useState((insertRequest === 0) ? true : false);
    const [openEditfive, setOpenEditfive] = React.useState((insertRequest === 0) ? true : false);
    const [openEditsix, setOpenEditsix] = React.useState((insertRequest === 0) ? true : false);


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
        reportingmanager: null,
        reportingteamlead: null,
        designation: null,
        department: null,
        team: null,
        referrdby: null,
        employmentstatus: null,
        employeestatus: null,
        shift: null,
        grade: null,
        probabationperiod: null,
        salaryofferred: null,
        totalmonthlyctc: null,
        attendancebonus: null,
        totalyearlyctc: null,
        billablestatus: null,
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


    React.useEffect(() => {

        const url = `${URL}employeeonboard/employeeCheckIds`;

        const checkId = async () => {
            try {
                const response = await axios.get(url);

                const allData = response.data.data;

                if (Array.isArray(allData)) {
                    if (allData.includes(Number(formData1.employeeNumber))) {
                        if (activeStep === 0) {
                            setAvailable(1)
                        } else {
                            setAvailable(0)
                        }
                    } else {
                        setAvailable(0)
                    }
                } else {
                    console.log('Received data is not an array');
                }


            } catch (error) {
                console.error('Error fetching employee data:', error);
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

    }, [salaryOfferred, formData2.salaryofferred]);

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

            const data = formData3?.currentaddress

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
                permanentAddress: null,
                permanentcity: null,
                permanentPincode: null,
            }))

        }

    }, [copyToPermanent,])

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

    //ithula error iruku pakkanum da sathis , keep in mind .......
    React.useEffect(() => {

        const demoData = { ...formData2 };

        if (departments) {
            const secondDemo = Object.entries(departments).find(([key, value]) => value?.name === demoData?.department)?.[1];

            const thirdDemo = Object.entries(teams).find(([key, value]) => value?.name === demoData?.team)?.[1];

            const fourthDemo = Object.entries(employees).find(([key, value]) => `${value?.f_name} ${value?.l_name}` === demoData?.referrdby)?.[1];

            demoData.department = secondDemo?.id;
            demoData.team = thirdDemo?.id;
            demoData.referrdby = fourthDemo?.emp_id;

        }

    }, [formData2, departments, employees])




    function calculateExperience(startDate, endDate) {
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        const years = Math.max(0, end.diff(start, 'year'));
        const months = Math.max(0, end.diff(start.add(years, 'year'), 'month'));
        const days = Math.max(0, end.diff(start.add(years, 'year').add(months, 'month'), 'day'));

        return `${years}.${months}`
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



    const updateFormData2 = () => {
        const demoData = { ...formData2 };

        if (departments) {

            const secondDemo = Object.entries(departments).find(([key, value]) => value?.name === demoData?.department)?.[1];
            const thirdDemo = Object.entries(teams).find(([key, value]) => value?.name === demoData?.team)?.[1];
            const fourthDemo = Object.entries(employees).find(([key, value]) => `${value?.f_name} ${value.l_name}` === demoData?.referrdby)?.[1];
            const shiftChange = Object.entries(shifts).find(([key, value]) => `${value?.start}-${value?.end}` === demoData?.shift)?.[1];
            const gradeChange = Object.entries(grade).find(([key, value]) => value?.name === demoData?.grade)?.[1];

            demoData.department = secondDemo?.id;
            demoData.team = thirdDemo?.id;
            demoData.referrdby = fourthDemo?.emp_id;
            demoData.shift = shiftChange?.id;
            demoData.grade = gradeChange?.id;

            return demoData;

        }

        return formData2;
    };



    const updateAddressproofintoID = () => {

        const demoData = { ...formData1 };

        if (addressprof) {

            const addresdproofId = Object.entries(addressprof).find(([key, value]) => value?.name === demoData?.addressprofType)?.[1];

            demoData.addressprofType = addresdproofId?.id;

            return demoData;

        } else {

            return formData1;
        }

    }

    
    const handleNext = async () => {
        let url;
        let data

        if (activeStep === 0) {
            url = `${URL}employeeonboard/basicInformation`;
            data = updateAddressproofintoID();
        } else if (activeStep === 1) {
            url = `${URL}employeeonboard/employeePosition`;
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

            if (response.data.status === 1) {

                if (!openEdit && insertRequest === 0) {
                    setOpenEdit(true);
                }

                const isStepValid = await trigger();
                if (isStepValid) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            }


        } catch (error) {
            console.error(error, 'Getting error in moving towards the next page .... ')
        }


    };

    const handleSubmit2 = async () => {

        let url;
        let data

        if (activeStep === 0) {
            url = `${URL}employeeonboard/basicInformation`;
            data = updateAddressproofintoID();
        } else if (activeStep === 1) {
            url = `${URL}employeeonboard/employeePosition`;
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
        } else if (activeStep === 5) {
            url = `${URL}employeeonboard/employeePaymentmode`;
            data = formData6
        }

        try {

            const response = await axios.post(url, {
                formData: data, operationType: insertRequest, requestType: interRequest, emp_id: Number(formData1.employeeNumber), referenceid: employeeAddTab.candidateId, activeStep: activeStep,
                profileUrl: profileImageUrl, available: available
            })

            if (response.data.status === 1) {
                setSnackbarMessage(1);
                setShowSnackbar(true);
                setLoading(true);

                setTimeout(() => {

                    setEmployeeAddTab((prev) => ({
                        ...prev,
                        status: 2,
                    }));

                }, 200);
            }
            else {
                setSnackbarMessage(0);
                setShowSnackbar(true);
                setLoading(false);
            }

        } catch (error) {
            setSnackbarMessage(0);
            setShowSnackbar(true);
            setLoading(false);

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

        catch (error) {

        }
    }

    const handleBack = () => {


        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        const value = activeStep - 1;

        handlebackDataPopulate(value);


    };

    const onSubmit = (data) => {
    };

    const mapOptions = (data) => {

        if (data) {
            return data.map(item => ({
                label: item?.name,
                value: item?.name
            }));
        } else {

            return [{
                label: 'Loading data',
                value: 'Loading data'
            }, {
                label: 'Loading data',
                value: 'Loading data'
            }
            ]
        }
    }


    const mapShiftOptions = (data) => {
        if (data) {
            return data.map(item => ({
                label: `${item?.start}-${item?.end}`,
                value: `${item?.start}-${item?.end}`
            }));
        } else {

            return [{
                label: 'Loading data',
                value: 'Loading data'
            }, {
                label: 'Loading data',
                value: 'Loading data'
            }
            ]
        }
    }



    const employeeMap = (data) => {
        if (data) {
            return data.map((item) => ({
                label: item.f_name + " " + item.l_name,
                value: item.f_name + " " + item.l_name
            }))

        } else {
            return [{
                label: 'Loading data',
                value: 'Loading data'
            }, {
                label: 'Loading data',
                value: 'Loading data'
            }
            ]
        }
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
            console.error(error, 'This is the error in the uploadfile')
            setUploadStatus(false)
        }

    }

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
            console.error(error, 'Error in uploading the profile picture....')
        }


    }

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


    const hanldeUpdate = async (val) => {

        let url;
        let data

        if (val === 0) {
            url = `${URL}employeeonboard/basicInformation`;
            data = updateAddressproofintoID();
        } else if (val === 1) {
            url = `${URL}employeeonboard/employeePosition`;
            data = updateFormData2();
        } else if (val === 2) {
            url = `${URL}employeeonboard/employeeAddress`;
            data = formData3;
        } else if (val === 3) {
            url = `${URL}employeeonboard/employeeExperience`;
            data = formData4;
        } else if (val === 4) {
            url = `${URL}employeeonboard/employeeStatutoryinfo`;
            data = formData5;
        } else if (val === 5) {
            url = `${URL}employeeonboard/employeePaymentmode`;
            data = formData6
        }

        try {

            const response = await axios.post(url, {
                formData: data, operationType: insertRequest, requestType: interRequest, emp_id: Number(formData1.employeeNumber), referenceid: employeeAddTab.candidateId, activeStep: activeStep,
                profileUrl: profileImageUrl, available: available
            })

            if (response.data.status === 1) {
                setSnackbarMessage(1);
                setShowSnackbar(true);
                setLoading(true);

                setTimeout(() => {
                    if (val === 0) {
                        setOpenEdit(true);
                    } else if (val === 1) {
                        setOpenEdittwo(true);
                    } else if (val === 2) {
                        setOpenEditthree(true);
                    } else if (val === 3) {
                        setOpenEditfour(true);
                    } else if (val === 4) {
                        setOpenEditfive(true);
                    } else if (val === 5) {
                        setOpenEditsix(true);
                    }

                    setLoading(false);
                    setShowSnackbar(false);

                }, 200);
            }
            else {
                setSnackbarMessage(0);
                setShowSnackbar(true);
                setLoading(false);
            }

        } catch (error) {
            setSnackbarMessage(0);
            setShowSnackbar(true);
            setLoading(false);
            console.error(error, 'Getting error in the submitting the form .... ')

        }


    }


    React.useEffect(() => {
        if (insertRequest !== 0 && (activeStep !== 0 && activeStep !== 1)) {
            reset();
        }
    }, [activeStep])


    return (


        <Box sx={{ width: '100%', paddingLeft: 6 }}>

            {(available && (insertRequest === 1 || insertRequest === 2)) ? (

                <Box
                    sx={{
                        width: '20%',
                        position: 'fixed',
                        top: '90%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                    }}
                >
                    <Alert variant="filled" severity="error">
                        Employee Number is already present
                    </Alert>
                </Box>
            ) : ''}


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



            {(insertRequest === 1 || insertRequest === 2) &&
                <Stack sx={{ width: '100%' }} spacing={4}>
                    <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>}


            {
                (insertRequest === 1 || insertRequest === 2) ? (
                    <Box component="form" sx={{ mt: 6, backgroundColor: '', position: 'relative', }} onSubmit={handleSubmit(onSubmit)}  >
                        <Grid container >
                            <>
                                {activeStep === 0 && (
                                    <EmployeeBasicInformation
                                        handleProfileUpload={handleProfileUpload}
                                        profileImageUrl={profileImageUrl}
                                        control={control}
                                        formData1={formData1}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdit}
                                        addressprof={addressprof}
                                        setFormData1={setFormData1}
                                        interRequest={interRequest}
                                    />
                                )}

                                {activeStep === 1 && (
                                    <EmployeePosition
                                        designation={designation}
                                        departments={departments}
                                        handleProofUpload={handleProofUpload}
                                        uploadFileName={uploadFileName}
                                        shifts={shifts}
                                        grade={grade}
                                        uploadStatus={uploadStatus}
                                        teams={teams}
                                        employees={employees}
                                        employeeMap={employeeMap}
                                        StyledLabel={StyledLabel}
                                        mapOptions={mapOptions}
                                        mapShiftOptions={mapShiftOptions}
                                        control={control}
                                        formData2={formData2}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdit}
                                        addressprof={addressprof}
                                        setFormData2={setFormData2}
                                    />
                                )}

                                {activeStep === 2 && (
                                    <EmployeeAddress
                                        copyToPermanent={copyToPermanent}
                                        handleCheckboxChange2={handleCheckboxChange2}
                                        MultilineTextField={MultilineTextField}
                                        StyledLabel={StyledLabel}
                                        mapOptions={mapOptions}
                                        control={control}
                                        formData3={formData3}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdit}
                                        addressprof={addressprof}
                                        setFormData3={setFormData3}
                                    />
                                )}

                                {activeStep === 3 && (
                                    <EmployeeExperience
                                        StyledLabel={StyledLabel}
                                        control={control}
                                        formData4={formData4}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdit}
                                        addressprof={addressprof}
                                        setFormData4={setFormData4}
                                    />
                                )}

                                {activeStep === 4 && (
                                    <EmployeeStatuoryinfo
                                        isPFChecked={isPFChecked}
                                        handleCheckboxChange={handleCheckboxChange}
                                        isESIChecked={isESIChecked}
                                        handleCheckboxESIChange={handleCheckboxESIChange}
                                        isLWFChecked={isLWFChecked}
                                        handleCheckboxLWFChange={handleCheckboxLWFChange}
                                        StyledLabel={StyledLabel}
                                        control={control}
                                        formData5={formData5}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdit}
                                        setFormData5={setFormData5}
                                    />
                                )}

                                {activeStep === 5 && (
                                    <EmployeePaymentMode
                                        formData1={formData1}
                                        selectedPaymentType={selectedPaymentType}
                                        handlePaymentTypeChange={handlePaymentTypeChange}
                                        StyledLabel={StyledLabel}
                                        control={control}
                                        formData6={formData6}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdit}
                                        setFormData6={setFormData6}
                                    />
                                )}
                            </>
                        </Grid>
                    </Box>
                ) : (insertRequest === 0 ? (
                    <Box component="form" sx={{ mt: 0, backgroundColor: '', position: 'relative', }} onSubmit={handleSubmit(onSubmit)}  >
                        <Grid container >
                            <Grid sx={{ width: '100%', paddingRight: 0, }} >

                                <Grid item xs={12} md={12} lg={12} sx={{ padding: 0, py: 1 }}>
                                    <Breadcrumbs aria-label="breadcrumb">
                                        <Link underline="hover" color="inherit" style={{ cursor: 'pointer' }} onClick={() => {

                                            setEmployeeAddTab((prev) => ({
                                                ...prev,
                                                status: 2,
                                            }));
                                        }} >
                                            Employee
                                        </Link>

                                        <Typography color="text.primary" variant='h5'>Employee Form</Typography>
                                    </Breadcrumbs>
                                </Grid>

                                <Grid sx={{ border: '1px solid black', pl: 4, pt: 2, pr: 2, mb: 4, mt: 2, borderRadius: 0 }}> {/*Basic Information*/}

                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
                                        <Grid item>
                                            <Typography variant='h6'> Basic Information</Typography>
                                        </Grid>
                                        <Grid item sx={{ justifyContent: 'flex-end' }}>

                                            {openEdit ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setActiveStep(0);
                                                        setOpenEdit(false)
                                                    }
                                                    }
                                                    sx={{
                                                        zIndex: 5,
                                                        backgroundColor: '#1976d2',
                                                        borderRadius: '50%',
                                                        width: 50,
                                                        height: 50,
                                                        minWidth: 0,
                                                        padding: 0,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            ) : ''}

                                        </Grid>
                                    </Grid>

                                    <EmployeeBasicInformation
                                        handleProfileUpload={handleProfileUpload}
                                        profileImageUrl={profileImageUrl}
                                        control={control}
                                        formData1={formData1}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdit}
                                        addressprof={addressprof}
                                        setFormData1={setFormData1}
                                        interRequest={interRequest}
                                    />

                                    <Grid display='flex' justifyContent='flex-end' sx={{ paddingRight: 6, pb: 3 }} >
                                        {(!openEdit) &&
                                            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                                                <Grid item >
                                                    <Button variant="outlined" color="error" type="submit"
                                                        onClick={() => setOpenEdit(true)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={() => {
                                                            hanldeUpdate(0)
                                                        }}
                                                        disabled={!isValid}
                                                    >
                                                        Update
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        }
                                    </Grid >

                                </Grid>

                                <Grid sx={{ border: '1px solid black', pl: 4, pt: 2, pr: 0, mb: 4 }}> {/*Employee Position*/}

                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
                                        <Grid item>
                                            <Typography variant='h6'>Employee Position</Typography>
                                        </Grid>
                                        <Grid item sx={{ justifyContent: 'flex-end' }}>

                                            {openEdittwo ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setActiveStep(1);
                                                        setOpenEdittwo(false);
                                                    }}
                                                    sx={{
                                                        zIndex: 5,
                                                        backgroundColor: '#1976d2',
                                                        borderRadius: '50%',
                                                        width: 50,
                                                        height: 50,
                                                        minWidth: 0,
                                                        padding: 0,
                                                        display: 'flex',
                                                        left: -20,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            ) : ''}
                                        </Grid>

                                    </Grid>

                                    <EmployeePosition
                                        designation={designation}
                                        departments={departments}
                                        handleProofUpload={handleProofUpload}
                                        uploadFileName={uploadFileName}
                                        shifts={shifts}
                                        grade={grade}
                                        uploadStatus={uploadStatus}
                                        teams={teams}
                                        employees={employees}
                                        employeeMap={employeeMap}
                                        StyledLabel={StyledLabel}
                                        mapOptions={mapOptions}
                                        control={control}
                                        formData2={formData2}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEdittwo}
                                        addressprof={addressprof}
                                        setFormData2={setFormData2}
                                        mapShiftOptions={mapShiftOptions}
                                    />

                                    <Grid display='flex' justifyContent='flex-end' sx={{ paddingRight: 6, pb: 3 }} >
                                        {(!openEdittwo) &&
                                            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                                                <Grid item >
                                                    <Button variant="outlined" color="error" type="submit"
                                                        onClick={() => setOpenEdittwo(true)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={() => {
                                                            hanldeUpdate(1)
                                                        }}
                                                        disabled={!isValid}
                                                    >
                                                        Update
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        }




                                    </Grid >

                                </Grid>


                                <Grid sx={{ border: '1px solid black', pl: 4, pt: 2, pr: 0, mb: 4 }} > {/*Employee Address */}

                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
                                        <Grid item>
                                            <Typography variant='h6'>Employee Address</Typography>
                                        </Grid>
                                        <Grid item sx={{ justifyContent: 'flex-end' }}>

                                            {openEditthree ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setActiveStep(2);
                                                        setOpenEditthree(false)
                                                    }
                                                    }
                                                    sx={{
                                                        zIndex: 5,
                                                        backgroundColor: '#1976d2',
                                                        borderRadius: '50%',
                                                        width: 50,
                                                        height: 50,
                                                        minWidth: 0,
                                                        padding: 0,
                                                        display: 'flex',
                                                        left: -20,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            ) : ''}
                                        </Grid>

                                    </Grid>


                                    <EmployeeAddress
                                        copyToPermanent={copyToPermanent}
                                        handleCheckboxChange2={handleCheckboxChange2}
                                        MultilineTextField={MultilineTextField}
                                        StyledLabel={StyledLabel}
                                        mapOptions={mapOptions}
                                        control={control}
                                        formData3={formData3}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEditthree}
                                        addressprof={addressprof}
                                        setFormData3={setFormData3}
                                    />

                                    <Grid display='flex' justifyContent='flex-end' sx={{ paddingRight: 6, pb: 3 }} >
                                        {(!openEditthree) &&
                                            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                                                <Grid item >
                                                    <Button variant="outlined" color="error" type="submit"
                                                        onClick={() => setOpenEditthree(true)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={() => {
                                                            hanldeUpdate(2)
                                                        }}
                                                        disabled={!isValid}
                                                    >
                                                        Update
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        }

                                    </Grid >

                                </Grid>


                                <Grid sx={{ border: '1px solid black', pl: 4, pt: 2, pr: 0, mb: 4 }} > {/*Employee Experience*/}

                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
                                        <Grid item>
                                            <Typography variant='h6'>Employee Experience</Typography>
                                        </Grid>
                                        <Grid item sx={{ justifyContent: 'flex-end' }}>

                                            {openEditfour ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setActiveStep(3);
                                                        setOpenEditfour(false)
                                                    }
                                                    }
                                                    sx={{
                                                        zIndex: 5,
                                                        backgroundColor: '#1976d2',
                                                        borderRadius: '50%',
                                                        width: 50,
                                                        height: 50,
                                                        minWidth: 0,
                                                        padding: 0,
                                                        display: 'flex',
                                                        left: -20,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            ) : ''}

                                        </Grid>

                                    </Grid>

                                    <EmployeeExperience
                                        StyledLabel={StyledLabel}
                                        control={control}
                                        formData4={formData4}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEditfour}
                                        addressprof={addressprof}
                                        setFormData4={setFormData4}
                                        insertRequest={insertRequest}
                                    />

                                    <Grid display='flex' justifyContent='flex-end' sx={{ paddingRight: 6, pb: 3 }} >
                                        {(!openEditfour) &&
                                            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                                                <Grid item >
                                                    <Button variant="outlined" color="error" type="submit"
                                                        onClick={() => setOpenEditfour(true)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={() => {
                                                            hanldeUpdate(3)
                                                        }}
                                                        disabled={!isValid}
                                                    >
                                                        Update
                                                    </Button>
                                                </Grid>

                                            </Grid>

                                        }


                                    </Grid >

                                </Grid>


                                <Grid sx={{ border: '1px solid black', pl: 4, pt: 2, pr: 0, mb: 4 }}> {/*Employee Statuory information*/}

                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
                                        <Grid item>
                                            <Typography variant='h6'> Employee Statuory Information</Typography>
                                        </Grid>
                                        <Grid item sx={{ justifyContent: 'flex-end' }}>

                                            {openEditfive ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setActiveStep(4);
                                                        setOpenEditfive(false)
                                                    }
                                                    }
                                                    sx={{
                                                        zIndex: 5,
                                                        backgroundColor: '#1976d2',
                                                        borderRadius: '50%',
                                                        width: 50,
                                                        height: 50,
                                                        minWidth: 0,
                                                        padding: 0,
                                                        display: 'flex',
                                                        left: -20,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            ) : ''}

                                        </Grid>
                                    </Grid>

                                    <EmployeeStatuoryinfo
                                        isPFChecked={isPFChecked}
                                        handleCheckboxChange={handleCheckboxChange}
                                        isESIChecked={isESIChecked}
                                        handleCheckboxESIChange={handleCheckboxESIChange}
                                        isLWFChecked={isLWFChecked}
                                        handleCheckboxLWFChange={handleCheckboxLWFChange}
                                        StyledLabel={StyledLabel}
                                        control={control}
                                        formData5={formData5}
                                        StyledInput={StyledInput}
                                        errors={errors}
                                        openEdit={openEditfive}
                                        setFormData5={setFormData5}
                                    />

                                    <Grid display='flex' justifyContent='flex-end' sx={{ paddingRight: 6, pb: 3 }} >
                                        {(!openEditfive) &&
                                            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                                                <Grid item >
                                                    <Button variant="outlined" color="error" type="submit"
                                                        onClick={() => setOpenEditfive(true)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={() => {
                                                            hanldeUpdate(4)
                                                        }}
                                                        disabled={!isValid}
                                                    >
                                                        Update
                                                    </Button>
                                                </Grid>

                                            </Grid>

                                        }

                                    </Grid >


                                </Grid>


                                <Grid sx={{ border: '1px solid black', pl: 4, pt: 2, pr: 0, mb: 4 }}> {/*Employee Payment information*/}
                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
                                        <Grid item>
                                            <Typography variant='h6'>Payment Method</Typography>
                                        </Grid>
                                        <Grid item sx={{ justifyContent: 'flex-end' }}>
                                            {openEditsix ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setActiveStep(5);
                                                        setOpenEditsix(false)
                                                    }
                                                    }
                                                    sx={{
                                                        zIndex: 5,
                                                        backgroundColor: '#1976d2',
                                                        borderRadius: '50%',
                                                        width: 50,
                                                        height: 50,
                                                        minWidth: 0,
                                                        padding: 0,
                                                        display: 'flex',
                                                        left: -20,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            ) : ''}

                                        </Grid>
                                    </Grid>

                                    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>

                                        <EmployeePaymentMode
                                            formData1={formData1}
                                            selectedPaymentType={selectedPaymentType}
                                            handlePaymentTypeChange={handlePaymentTypeChange}
                                            StyledLabel={StyledLabel}
                                            control={control}
                                            formData6={formData6}
                                            StyledInput={StyledInput}
                                            errors={errors}
                                            openEdit={openEditsix}
                                            setFormData6={setFormData6}
                                        />
                                    </Grid>

                                    <Grid display='flex' justifyContent='flex-end' sx={{ paddingRight: 6, pb: 3 }} >
                                        {(!openEditsix) &&
                                            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                                                <Grid item >
                                                    <Button variant="outlined" color="error" type="submit"
                                                        onClick={() => setOpenEditsix(true)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={() => {
                                                            hanldeUpdate(5)
                                                        }}
                                                        disabled={!isValid}
                                                    >
                                                        Update
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        }

                                    </Grid >

                                </Grid>

                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Grid items xs={12} sm={12} md={12} sx={{ textAlign: "center", height: "100vh", marginTop: "20%" }}>
                        <Typography variant='h4' >
                            OOPS ! ... You have refresh the page ...
                        </Typography>
                        <Link to={"/"}>
                            <Button variant='contained'
                                disableElevation color='primary'
                                sx={{ marginTop: '20px' }}
                                onClick={() => {
                                    setEmployeeAddTab((prev) => ({
                                        ...prev,
                                        status: 2,
                                    }));
                                }}
                            >Go To Employee View</Button>
                        </Link>

                    </Grid>
                ))
            }


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    px: 12,
                    pb: 3,
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                {(insertRequest === 1 || insertRequest === 2) && (
                    <>
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

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mx: 2 }}>
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
                    </>
                )}


            </Box>

        </Box >

    );
}