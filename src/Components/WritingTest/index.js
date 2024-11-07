import * as React from 'react';


import {Grid,TextField,FormControl,FormLabel,Select,Button,Radio,
    RadioGroup,FormControlLabel,MenuItem,Dialog,DialogTitle,Typography} from "@mui/material";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import axios from 'axios';
import URL from "../Global/Utils/url_route";


function WritingTest(props)
{
    const [rating,setRating] = React.useState(null);
    const [status,setStatus] = React.useState("");
    const [comments,setComments] = React.useState("");
    const [disable,setDisable] = React.useState(true);
    const [showAlert,setShowAlert] = React.useState(false);

    const handleAlertClose = () =>{
        setShowAlert(false);
        window.location.reload(true);
    }

    React.useEffect(()=>{
        if(rating!==null && status!=="" && comments!=="")
        {
            setDisable(false);
        }
        else
        {
            setDisable(true);
        }
    },[rating,status,comments]);

    const handleClick=()=>{
        let round = props.interviewRound;
        let name = props.interviewName;
        let client = props.client;
        let candidate_id = client.id;

        let request = {candidate_id : candidate_id,
                        round : round,
                        interviewName : name,
                        rating:rating,
                status:status,
            comments:comments}
        let writingtest_url = URL+"writingtest"
        axios.post(writingtest_url,request)    
        .then((response)=>{
            if(response.data.status===0)
            {
                setShowAlert(true);
            }
            else
            {
                console.log("ERROR : ",JSON.stringify(response.data));
            }
        })
        .catch()
        .finally();
    }


    return (
        <Grid container spacing={2}  sx={{marginTop:"8px"}}>
            
            <Grid item xs={12} sm={12} md={12}>
                <FormControl fullWidth required>
                    <FormLabel>
                        Rating
                    </FormLabel>
                    <RadioGroup row value={rating} required error={rating===null ? true : false} 
                    onChange={e=>setRating(e.target.value)}>
                            <FormControlLabel value="0" control={<Radio />} label="Poor" />
                            <FormControlLabel value="1" control={<Radio />} label="Below Average" />
                            <FormControlLabel value="2" control={<Radio />} label="Average" />
                            <FormControlLabel value="3" control={<Radio />} label="Met Expectation" />
                            <FormControlLabel value="4" control={<Radio />} label="Above Expectation" />
                            <FormControlLabel value="5" control={<Radio />} label="Exceptional" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            
            <Grid item xs={6} sm={6} md={6}>
                <FormControl fullWidth required>
                    <FormLabel>Interview Status</FormLabel>
                    <Select value={status} onChange={e=>setStatus(e.target.value)} required 
                    error={status==="" ? true : false}>
                        <MenuItem value={1}>Selected</MenuItem>
                        <MenuItem value={2}>Rejected</MenuItem>
                        <MenuItem value={3}>Hold</MenuItem>
                        <MenuItem value={4}>Shortlisted</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <TextField rows={2} label='Comments' required 
                fullWidth multiline
                value={comments}
                error={comments==="" ? true : false}
                onChange={e=>setComments(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
            <Button variant='contained' color='primary' 
            disableElevation fullWidth size='large' 
            sx={{backgroundImage:"linear-Gradient(to right,#272727,#ECE6DB)"}}
            onClick={handleClick} disabled={disable}>
                    SUBMIT EVALUATION
                </Button>
            </Grid>
            <Dialog onClose={handleAlertClose} open={showAlert} >
                <DialogTitle sx={{textAlign:"center"}}>
                    <AutoAwesomeOutlinedIcon fontSize='large' color='success'/>
                    <Typography variant='h5'>
                        Great!!
                        
                        </Typography> 
                        <Typography variant='body1'>You Have Successfully Submitted<br/>
                        Your Evaluation!!</Typography>               
                </DialogTitle>
             </Dialog>
        </Grid>
    )
}


export default WritingTest;