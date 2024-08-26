import * as React from 'react';

import {Grid,Table,TableBody,TableHead,
    TableRow,TableCell,Typography}  from "@mui/material";

import {getRating,getStatusName} from "../../Components/Global/Utils/common_data";

import axios from 'axios';
import HRRoundCard from '../HRRoundCard';
import URL from "../Global/Utils/url_route";

function CandidateEvaludationCard(props){

    const candidate_id = props.candidate_id;
    const round = props.round;
    const [results,setResults] = React.useState(null);
    const complete_data = props.complete_data;


    React.useEffect(()=>{
        if(round!==0)
            {
                let request_url = URL+"interviewevaluation/getresult/"+candidate_id+"/"+round;
                // if(round===1 || round===3 || round===4)
                // {
                    axios.get(request_url)
                    .then((res)=>{
                       if(res.data.status===0 && res.data.data.length > 0)
                       {
                            setResults(res.data.data[0]);
                            
                            
                       } 
                       else
                       {
                        setResults(null);
                       }    
                    })
                    .catch((err)=>{
                        console.log(JSON.stringify(err));
                    })
                    .finally();
                
            }
       
        
        
    },[])
    return (
        round===1 || round===4 || round===5 ? 
        <Table size="small">
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2}  sx={{fontWeight:"bold",background:"#FFFBF7"}}>
                    Appearance
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Dress</TableCell>
                    <TableCell>{results!==null ? getRating(results.dress) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Grooming</TableCell>
                    <TableCell>{results!==null ? getRating(results.grooming) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Body Language</TableCell>
                    <TableCell>{results!==null ? getRating(results.body) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Eye Contact</TableCell>
                    <TableCell>{results!==null ? getRating(results.eye) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>
                        Comments <br/>
                        {results!==null ? results.comments : null}
                    </TableCell>
                </TableRow>
           </TableBody>
           <TableBody>
            <TableRow>
                    <TableCell colSpan={2}  sx={{fontWeight:"bold",background:"#FFFBF7"}}>
                    Characteristics
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Assertive</TableCell>
                    <TableCell>{results!==null ? getRating(results.assertive) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Cooperative</TableCell>
                    <TableCell>{results!==null ? getRating(results.cooperative) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Responsible</TableCell>
                    <TableCell>{results!==null ? getRating(results.responsible) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Dedicated</TableCell>
                    <TableCell>{results!==null ? getRating(results.dedicated) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Maturity</TableCell>
                    <TableCell>{results!==null ? getRating(results.maturity) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Professional</TableCell>
                    <TableCell>{results!==null ? getRating(results.professional) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Ability to Learn</TableCell>
                    <TableCell>{results!==null ? getRating(results.ability) : null}</TableCell>
                </TableRow>
                
            </TableBody>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2}  sx={{fontWeight:"bold",background:"#FFFBF7"}}>
                    Goals / Self Perception
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Realistic self-appraisal</TableCell>
                    <TableCell>{results!==null ? getRating(results.real_rating) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Reason for interest in CC</TableCell>
                    <TableCell>{results!==null ? getRating(results.interest) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Realistic career goal</TableCell>
                    <TableCell>{results!==null ? getRating(results.career) : null}</TableCell>
                </TableRow>
                
           </TableBody>
           <TableBody>
                <TableRow>
                    <TableCell colSpan={2}  sx={{fontWeight:"bold",background:"#FFFBF7"}}>
                    Why MOS ?
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Commitment</TableCell>
                    <TableCell>{results!==null ? getRating(results.commitment) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Knowledge on MOS</TableCell>
                    <TableCell>{results!==null ? getRating(results.knowledge) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Knowledge on Industry</TableCell>
                    <TableCell>{results!==null ? getRating(results.industry) : null}</TableCell>
                </TableRow>
                
           </TableBody>
           <TableBody>
                <TableRow>
                    <TableCell colSpan={2}  sx={{fontWeight:"bold",background:"#FFFBF7"}}>
                    Job Expectations
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Was it realistic</TableCell>
                    <TableCell>{results!==null ? getRating(results.job_realistic) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Matches the requirement</TableCell>
                    <TableCell>{results!==null ? getRating(results.job_match) : null}</TableCell>
                </TableRow>
           </TableBody>
           <TableBody>
                <TableRow>
                    <TableCell colSpan={2}  sx={{fontWeight:"bold",background:"#FFFBF7"}}>
                    Long term objectives
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Was it realistic</TableCell>
                    <TableCell>{results!==null ? getRating(results.long_real) : null}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Has potential to grow</TableCell>
                    <TableCell>{results!==null ? getRating(results.long_grow) : null}</TableCell>
                </TableRow>
           </TableBody>
           <TableBody>
           <TableRow>
                    <TableCell colSpan={2}>
                        <b>Final Comments</b> <br/>
                        {results!==null ? results.final_comments : null}
                    </TableCell>
                </TableRow>
           </TableBody>
        </Table> : round === 2 ? 
        <Table size='small'>
            <TableRow>
                <TableCell>Typing Speed</TableCell>
                <TableCell>{results!==null ? results.typing_speed : null}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Accuracy Percentage</TableCell>
                <TableCell>{results!==null ? results.accuracy+" %" : null}</TableCell>
            </TableRow>
            <TableRow>
                    <TableCell colSpan={2}>
                        <b>Interview Comments</b> <br/>
                        {results!==null ? results.comments : null}
                    </TableCell>
                </TableRow>
            {/* <TableRow>
                <TableCell>Interview Status</TableCell>
                <TableCell>{results!==null ? getStatusName(results.result) : null}</TableCell>
            </TableRow> */}
        </Table>
        : round === 3 ? 
        <Table size='small'>
            <TableRow>
                <TableCell>Rating</TableCell>
                <TableCell>{results!==null ? getRating(results.rating) : null}</TableCell>
            </TableRow>
           
        </Table> : round === 6 ? 
        <HRRoundCard round={round} candidate_id={candidate_id} complete_data={complete_data}/> : null 
    )
}    


export default CandidateEvaludationCard;