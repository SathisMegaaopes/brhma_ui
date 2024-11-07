import React from "react";
import {Grid, Typography, Container,Card, CardContent, CardHeader, Divider,Paper} from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';

import URL from "../Global/Utils/url_route";
import axios from 'axios';

import {referred_by_data} from "../Global/Utils/common_data";

import CandidateTable from "../CandidateTable";

export default function MOSDashboard1() {
    const userinfo = JSON.parse(sessionStorage.getItem('user_info'));

    const user_session = sessionStorage.getItem("user_info");
    const history = useNavigate();
    const [candidates,setCandidates] = React.useState([]);
    const [candidateList,setCandidatelist] = React.useState([]);
    
    const [total,setTotal] = React.useState(0);

    const [shortlist,setShortlist] = React.useState(0);
    const [myShort,setMyshort] = React.useState(0);

    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

    React.useEffect(()=>{
        if(user_session===undefined || user_session==="" || user_session===null)
        {
            history("/"); 
        }
        const from_date = year+"-"+month+"-"+day+" 00:00:00";
        const to_date = year+"-"+month+"-"+day+" 23:59:59";
        let url = URL+"candidates/searchByDate/"+from_date+"/"+to_date;
        axios.get(url)
        .then((response)=>{
            if(response.data.status===0)
            {
                setCandidates(response.data.data);
                setCandidatelist(response.data.data);
            }
            else{
                console.log("ERROR : ",JSON.stringify(response.data));
            }
        })
        .catch()
        .finally(()=>{
        });
    },[]);

    React.useEffect(()=>{
        if(candidates.length!==0)
            {
                setTotal(candidates.length);

            }
    },[candidates]);

    const handleNavigate = (val) =>{
        if(val===1)
            {
                history("/dashboard/evalution");
            }
            else{
                history("/dashboard/candidate-master");
            }
    }   


    const fnCountByRef=(ref)=>{
       

        let data = candidates.filter(item => {return item.ref_by_basic===ref;});

        return data.length;
    }
   
    const fnLoadRefData=(ref)=>{
        if(ref!==null)
            {
                let data = candidates.filter(item => {return item.ref_by_basic===ref;});
                setCandidatelist(data); 
            }
            else{
                setCandidatelist(candidates);
            }
      
    }
    return (
        <Container maxWidth="lg" sx={{marginTop:"20px",}}>
            <Typography variant="h5" sx={{margin:"8px"}}>Welcome {userinfo?.user_details?.emp_name} !</Typography>
            <Grid container spacing={4}>
                <Grid item xs={4} md={3} lg={3}>
                
                    <Card variant="outlined" onClick={e=>handleNavigate(1)} sx={{cursor:"pointer", background:"#FEFAE0"}}>
                        <CardHeader  title="Candidate Evaluation"/>
                        
                    </Card>
                    
                </Grid>
                
                <Grid item xs={4} md={3} lg={3}>
                    {userinfo?.user_role===1 ? 
                <Card variant="outlined"onClick={e=>handleNavigate(2)} sx={{cursor:"pointer",background:"#FEFAE0"}}>
                        <CardHeader title="Candidate Database"/>
                        
                    </Card> : "" }
                </Grid>
                
            </Grid>
            <Paper elevation={2} sx={{padding:"8px", margin:"4px"}}>
            <Grid container spacing={2} sx={{marginTop:"8px"}} direction="row"
  justifyContent="center"
  alignItems="center">
                
            <Grid item xs={9} sm={9} md={9} lg={9}>
            <Typography variant="h5" sx={{margin:"8px"}}>Today's Overview!!</Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
            <Typography variant="h5" sx={{margin:"8px"}}>Date : {currentDate}</Typography>
            </Grid>
                <Grid item xs={6} sm={2}  md={2} lg={2}>
                <Card variant="outlined">
                    
                    <CardContent  sx={{textAlign:"center", background:"#FEFAE0"}} onClick={e => {fnLoadRefData(null)}}>
                    <Typography variant="body1">Registration</Typography>
                        <Typography variant="h5">{total}</Typography>
                        
                    </CardContent>
                    </Card>
                </Grid>
                {referred_by_data.map(item =>{
                    return (
                        <Grid item xs={6} sm={2}  md={2} lg={2}>
                            <Card variant="outlined"  sx={{textAlign:"center", background:"#FEFAE0",cursor:"pointer"}} onClick={e => {fnLoadRefData(item)}}>
                            <CardContent>
                            <Typography variant="body1">{item}</Typography>
                            <Typography variant="h5"  >{fnCountByRef(item)}</Typography>
                        
                        </CardContent>
                            </Card>
                            </Grid>
                    )            
                })}
                <Grid>
                   {candidateList.length!==0 ?  <CandidateTable data={candidateList}/> : ""}
                </Grid>
        
        
            </Grid></Paper>
            </Container>
    )
}

