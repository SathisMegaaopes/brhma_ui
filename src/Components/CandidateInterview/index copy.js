import * as React from 'react';
import {Container,Grid,
    Button,TextField, Typography,
    Card,CardActions,CardContent,CardHeader,Avatar,IconButton,
Select,MenuItem,FormControl,FormLabel,FormControlLabel,
Radio,RadioGroup, CardActionArea,InputLabel,Autocomplete} from "@mui/material";
    import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
    import VisibilityIcon from '@mui/icons-material/Visibility';
    import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


    
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell from '@mui/material/TableCell';
    import TableHead from '@mui/material/TableHead';
    import TableRow from '@mui/material/TableRow';   
    

 import axios from 'axios';  

    import MOSFooter from '../Global/Footer';
    import MOSLogo from '../Global/Logo';

    import CandidateEvaluation from '../CandidateEvaluation';
    import TypingTest from '../TypingTest';
    import WritingTest from '../WritingTest';
    import FinalRound from '../Finalround';
import { HdrEnhancedSelectOutlined } from '@mui/icons-material';
import CandidateReportCard from '../ReportCard';

import URL from "../Global/Utils/url_route";


import { useNavigate } from 'react-router-dom';


function CandidateInterview(){

    const [candidate_result,setResult] = React.useState([]);
    const [client,setClient] = React.useState(null);
    const [userinfo,setUserinfo] = React.useState(JSON.parse(sessionStorage.getItem('user_info')));
    const rounds_data = [{id:1,name:"HR Round"},
    {id:2,name:"Typing Test"},
    {id:3,name:"Written Test"},
    {id:4,name:"Team Lead Round"},
    {id:5,name:"Operations Round"},
    {id:6,name:"HR Final Discussion"}];
    const history = useNavigate();
   
    
    const user_session = JSON.parse(sessionStorage.getItem("user_info"));
   
    
    const [currentRound,setCurrentRound] = React.useState(0);
    const [interviewName,setInterviewerName] = React.useState("");

    const [searchKey,setSearchKey] = React.useState("");
    const [searchError,setSearchError] = React.useState(false);

    const [employeeList,setEmployeeList] = React.useState(null);

    React.useEffect(()=>{
        if(user_session===undefined || user_session==="" || user_session===null)
        {
            history("/");
        }

        setInterviewerName(user_session?.user_details?.emp_id);
    },[]);
    const DateFormater = (val) =>{
        let new_date  =  new Date(val);
        let year = new_date.getFullYear();
    let month = ("0" + (new_date.getMonth() + 1)).slice(-2);
    let date = ("0" + new_date.getDate()).slice(-2);

    return date+" / "+month+" / "+year;
    }

    const searchCandidate = (event) =>{
        if(searchKey!=="" && event.keyCode === 13)
        {
            setClient(null);
        setResult([]);
        setCurrentRound(0);
        setInterviewerName("");
        let search_key = searchKey;
        let search_url = URL+"candidates/searchCandidate/"+search_key;
        axios.get(search_url)
        .then((response)=>{
            if(response.data.status===0 && response.data.data.length > 0)
            {
                setResult(response.data.data);
                setSearchKey("");
            }
            else
            {
                setSearchError(true);
                setSearchKey("");
            }
        })
        .catch((err)=>{
            console.log("ERROR ",JSON.stringify(err));
        })
        .finally(()=>{

        });
        }
        
        
        
    }

    const handleComplete = (e) =>{
        let name =  e.target.textContent;
        const myArray = name.split("-");
        let emp_id = myArray[0].trim();
        
        setInterviewerName(emp_id);
    }


    return(
        <Container sx={{marginTop:"24px",height:"100vh"}}>
            {/* <MOSLogo/> */}
            <Grid container spacing={2} >
                <Grid item sx={12} sm={12} md={12}>
                <Typography variant='h5'>
                Candidate Evaluation
            </Typography>
                </Grid>
                <Grid item sx={4} sm={4} md={4}>
                <TextField variant='outlined' label="Search Candidate" size='small' 
                fullWidth placeholder='Search By Candidate Name or ID or Mobile'
                onChange={e=>setSearchKey(e.target.value)}
                value={searchKey}
                error={searchError}
                onFocus={()=>setSearchError(false)}
                onKeyUp={e => searchCandidate(e)}
                helperText={searchError ? "No Results Found!" : "Press enter to search candidate"}
                
                />
                </Grid>
              
            </Grid>  
            <Grid container  spacing={2}  sx={{marginTop:"24px"}} > 
            {candidate_result.length > 0 && client===null ? 
            <Grid item sx={12} sm={12} md={12}>
            <Typography variant='body1'>
                Search Results
            </Typography> 
            </Grid>
            : null}
           { client===null && candidate_result.length > 0 && candidate_result.map(candidate=>{
            return (
<Grid item sx={6} sm={6} md={6}>
<Card>
<CardHeader
avatar={
<Avatar aria-label="candidate name" sx={{backgroundColor:"#272727",color:"#ede8de",textTransform:"capitalize"}}>
{candidate.f_name_basic.substring(0,2)}
</Avatar>
}
title={candidate.f_name_basic+" "+candidate.l_name_basic}
subheader={"ID "+candidate.candidate_id}
action={
<IconButton aria-label="Load Details" onClick={e=> setClient(candidate)}>
<VisibilityIcon />
</IconButton>
}
/>
 <CardContent>
 <Typography variant='body2'>Registration Date : {DateFormater(candidate.reg_date)}</Typography>   
<Typography variant='body2'>Designation : {candidate.job_profile_basic}</Typography>  
<Typography variant='body2'>Mobile : {candidate.mobile_basic}</Typography>   
<Typography variant='body2'>eMail : {candidate.email_basic}</Typography>     
</CardContent>   
</Card>    
</Grid>
            )

            })}
            {client!==null ? <>
            
            <Grid container  spacing={2}  sx={{marginTop:"24px"}} > 
            <Grid item sx={12} sm={12} md={12}>
                <Typography variant='body1'>
                    Scores & Description
                </Typography>
                <Typography variant='body2'>
                    0: Poor, 1: Below Average, 2: Average, 3: Met Expectations, 4: Above Expectations, 5: Exceptional
                </Typography>
            </Grid>
            <Grid item sx={6} sm={6} md={6}>
            <TextField variant='outlined' label="interviewer Name" size='small' 
                fullWidth 
                
                value={user_session?.user_details?.emp_id+" - "+user_session?.user_details?.emp_name}
                
                disabled
                helperText={searchError ? "No Results Found!" : "Press enter to search candidate"}
                
                />
           
            </Grid>
            <Grid item sx={6} sm={6} md={6}>
            <FormControl fullWidth size='small'>
            <InputLabel >Interview Type</InputLabel>
                <Select value={currentRound} 
                onChange={e=>setCurrentRound(e.target.value)}
                label="Interview Type">
                {rounds_data.map(data=>{
                return(
                    <MenuItem value={data.id}>{data.name}</MenuItem>
                )
            })}
                    
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
            <CandidateReportCard candidate={client}/>
               
            </Grid>
            </Grid> 
           </> : null }
             
             
             
            {interviewName!=="" && (currentRound===1 || currentRound===4 || currentRound===5) ?
            <CandidateEvaluation client={client} interviewName={interviewName} interviewRound={currentRound}/>
            : interviewName!=="" && currentRound===2 ? 
            <TypingTest client={client} interviewName={interviewName} interviewRound={currentRound}/> : 
            interviewName!=="" && currentRound===3 ? 
            <WritingTest client={client} interviewName={interviewName} interviewRound={currentRound}/> : 
            interviewName!=="" && currentRound===6 ? 
            <FinalRound client={client} interviewName={interviewName} interviewRound={currentRound}/> : ""}  
            </Grid>
            </Container>
    )
}


export default CandidateInterview;