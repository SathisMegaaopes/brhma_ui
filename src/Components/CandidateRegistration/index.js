import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import { Container, Grid, Typography, Tabs, Tab, Box, Button } from "@mui/material";

import BasicDetails from './BasicDetails';
import EduDetails from './EduDetails';
import WorkDetails from './Work';
import PersonalDetails from './Personal';
import ReferDetails from './Refer';

import UploadDetails from './UploadDetails'; //new


import MOSLogo from "../Global/Logo";
import MOSFooter from '../Global/Footer';

import URL from "../Global/Utils/url_route";

function TabPanel(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function MegaOpesCandidateRegistration() {

  const [value, setValue] = React.useState(0);
  sessionStorage.removeItem("candidate_id");
  let basicdetails = {
    mobile_number: "", fname: "",
    lname: "", alt_mobile: "", email: "", gender: "", designation: "", ref_by: "", ref_others: "", years: "", months: "", dob: ""
  };

  let eduDetails = {
    sslc_year: "", sslc_university: "",
    puc_year: "", puc_university: "",
    ug_year: "", ug_university: "",
    pg_year: "", pg_university: ""
  };

  let workDetails = [{
    company1: "",
    company1From: "",
    company1To: "",
    company1Desi: "",
    company1Refname: "",
    company1Refmob: "",
    company1Sal: ""
  },
  {
    company2: "",
    company2From: "",
    company2To: "",
    company2Desi: "",
    company2Refname: "",
    company2Refmob: "",
    company2Sal: ""
  },
  {
    company3: "",
    company3From: "",
    company3To: "",
    company3Desi: "",
    company3Refname: "",
    company3Refmob: "",
    company3Sal: ""
  },
  {
    company4: "",
    company4From: "",
    company4To: "",
    company4Desi: "",
    company4Refname: "",
    company4Refmob: "",
    company4Sal: ""
  }];


  let personalData = {
    fatherName: "", fatherAge: "", fatherOccu: "", fatherMob: "",
    motherName: "", motherAge: "", motherOccu: "", motherMob: "",
    guardName: "", guardAge: "", guardOccu: "", guardMob: "", profile_pic: "", address: ""
  };

  let uploadData = {     //new
    type: "",
  }

  let referData = { name1: "", mobile1: "", name2: "", mobile2: "", name3: "", mobile3: "", name4: "", mobile4: "", }

  const [basicdata, setBasicdata] = React.useState(basicdetails);
  const [edudata, setEdudata] = React.useState(eduDetails);
  const [workdata, setWorkdata] = React.useState(workDetails);
  const [personaldata, setPersonaldata] = React.useState(personalData);

  const [uploads, setuploads] = React.useState(uploadData)   //new


  const [referdata, setReferdata] = React.useState(referData);
  const [record_id, setRecordId] = React.useState(0);
  const [candidate_id, setCandidateId] = React.useState(0);

  const [mobExists, setMobExists] = React.useState(null);



  const history = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleNext() {
    if (value !== 5) {
      let newValue = value + 1;
      setValue(newValue);
    }
    else {
      alert("You Have Successfully Submited Your Details");
      setValue(0);
    }

  }
  function handlePrev() {
    let newValue = value - 1;
    setValue(newValue);
  }

  const handleBasic = (data) => {
    if (record_id === 0) {
      setBasicdata(data);
      let request = data;

      console.log(request)

      let basic_url = URL + "candidates";
      axios.post(basic_url, request)
        .then(function (response) {
          if (response.data.status === 0) {
            setRecordId(response.data.data.id);
            setCandidateId(response.data.data.candidate_id);
            sessionStorage.setItem("candidate_id", response.data.data.candidate_id);
            handleNext();
          }
          else {
            console.log("ERROR", response);
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      handleNext();
    }

  }

  const handleEdu = (data) => {

    setEdudata(data);
    let request = data;
    request.candidate_id = record_id;

    let edu_url = URL + "candidates/education";
    axios.post(edu_url, request)
      .then(function (response) {
        if (response.data.status === 0) {
          handleNext();
        }
        else {
          console.log("ERROR", response);
        }

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const handleWork = (data) => {
    setWorkdata(data);
    let request = data;
    request.push({ "candidate_id": record_id });

    let work_url = URL + "candidatework";
    axios.post(work_url, request)
      .then((response) => {
        if (response.data.status === 0) {
          handleNext();
        }
        else {
          console.log("ERROR", response);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const handlePersonal = (data) => {
    setPersonaldata(data);
    let request = data;
    request.candidate_id = record_id;

    let personal_url = URL + "candidatepersonal";
    axios.post(personal_url, request)
      .then((response) => {
        if (response.data.status === 0) {
          handleNext();
        }
        else {
          console.log("ERROR", response);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // const handleUpload = (data) => {   //new
  //   console.log(data, 'this is the data inside the handleupdate')
  //   let personal_url = URL + "candidateupload/sendingFiles";
  //   console.log(personal_url,'this is the url')
  // axios.post(personal_url, data)
  //   .then((response) => {
  //     if (response.data.status === 0) {
  //       // handleNext();
  //       console.log(response.data.status)
  //     }
  //     else {
  //       console.log("ERROR", response);
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }




  const handleRefer = (data) => {
    setReferdata(data);
    let request = data;
    request.candidate_id = record_id;

    let personal_url = URL + "candidaterefer";
    axios.post(personal_url, request)
      .then((response) => {
        if (response.data.status === 0) {
          setRecordId(0);
          setCandidateId(0);
          handleSubmit();

        }
        else {
          console.log("ERROR", response);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = () => {

    let api_data = {
      basicInfo: basicdata, eduInfo: edudata,
      workInfo: workdata, personalInfo: personaldata, referInfo: referdata
    };

    setBasicdata(basicdetails);
    setEdudata(eduDetails);
    setWorkdata(workDetails);
    setPersonaldata(personalData);
    setReferdata(referData);

    sessionStorage.setItem("candidate_id", candidate_id)


    // setuploads(uploadData);   //new 

    history("/thankyou");
  }
  return (
    <Container sx={{ height: "100vh" }}>
      <MOSLogo />
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          {record_id === 0 ? "" : <Typography variant='body1' sx={{ paddingLeft: "16px" }}>
            Candidate ID : {candidate_id}
          </Typography>}

          <Tabs value={value} aria-label="basic tabs example"> {/*onChange={handleChange} */}
            <Tab label="Basic Info" {...a11yProps(0)} />
            <Tab label="Educational Info" {...a11yProps(1)} />
            <Tab label="Work Experience" {...a11yProps(2)} />
            <Tab label="Personal Info" {...a11yProps(2)} />
            <Tab label="Uploads" {...a11yProps(2)} />
            <Tab label="Refer a Friend" {...a11yProps(2)} />

            {/* //my code */}

          </Tabs>

          <TabPanel value={value} index={0}>
            <BasicDetails data={basicdata} handleBasic={(data) => handleBasic(data)}
              handleNext={handleNext} mobExists={mobExists} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EduDetails data={edudata} handleEdu={(data) => handleEdu(data)} handleNext={handleNext} handlePrev={handlePrev} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <WorkDetails data={workdata} handleWork={(data) => handleWork(data)} handleNext={handleNext} handlePrev={handlePrev} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PersonalDetails data={personaldata} handlePersonal={(data) => handlePersonal(data)} handleNext={handleNext} handlePrev={handlePrev} />
          </TabPanel>


          <TabPanel value={value} index={4}>
            <UploadDetails id={candidate_id} handleNext={handleNext} handlePrev={handlePrev} />
          </TabPanel>

          {/* //handleUpload={(data) => handleUpload(data)} */}

          <TabPanel value={value} index={5}>
            <ReferDetails data={referdata} handleRefer={(data) => handleRefer(data)} handleSubmit={handleSubmit} handlePrev={handlePrev} />
          </TabPanel>
        </Grid>




      </Grid>
      <MOSFooter />
    </Container>
  )

}


export default MegaOpesCandidateRegistration



{/* // this is not added  */ }

{/* <Grid container  spacing={2} >
        <Grid item xs={6} sm={6} md={6}>
          {parseInt(value)!=0 ? 
                <Button variant='contained' color='primary' disableElevation fullWidth onClick={handlePrev}>
                    Previous 
                </Button> : ""}
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <Button variant='contained' color='success' disableElevation fullWidth onClick={handleNext}>
                {parseInt(value)===4 ? "SUBMIT" : "NEXT"}
                </Button>
            </Grid>
        </Grid> */}