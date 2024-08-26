import * as React from 'react';

import {Grid,Table,TableBody,TableHead,
    TableRow,TableCell,Typography}  from "@mui/material";

import {DateFormater} from "../../Components/Global/Utils/common_data";




import axios from 'axios';
import URL from "../Global/Utils/url_route";

function HRRoundCard(props) {

    const candidate_id = props.candidate_id;
    const round = props.complete_data.round_6;
    const complete_data = props.complete_data;
    const [results,setResults] = React.useState(null);
    React.useEffect(()=>{
        let request_url = URL+"interviewevaluation/gethrresult/"+candidate_id+"/"+round;
        
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
        
        
        
    },[])
    
    return(
        
        <Table size="small">
            {results!==null && round===1 ? 
        <TableBody>
            <TableRow>
                <TableCell>Salary Offered (INR)</TableCell>
                <TableCell> {results.salary_offered}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Salary Accepted (INR)</TableCell>
                <TableCell> {results.salary_accepted}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Bonus Amount (INR)</TableCell>
                <TableCell> {results.bonus_amt}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Joining Date</TableCell>
                <TableCell> {results.date_of_joining}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>CTC (INR)</TableCell>
                <TableCell> {results.ctc_offered}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Net Take Home (INR)</TableCell>
                <TableCell> {results.net_offered}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Designation Offered</TableCell>
                <TableCell> {results.offered_designation}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Campaign</TableCell>
                <TableCell> {results.campaign}</TableCell>
            </TableRow>
        </TableBody> : results!==null && round===2 ? 
        <TableBody>
        <TableRow>
            <TableCell>Rejected Reason</TableCell>
            <TableCell> {results.reason}</TableCell>
        </TableRow>
        </TableBody>
        : results!==null && round===3 ? 
        <TableBody>
        <TableRow>
            <TableCell>Salary Offered (INR)</TableCell>
            <TableCell> {results.salary_offered}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Designation Offered</TableCell>
            <TableCell> {results.designation}</TableCell>
        </TableRow>
        </TableBody>
        : results!==null && round===4 ? 
        <TableBody>
        <TableRow>
            <TableCell>Salary Offered (INR)</TableCell>
            <TableCell> {results.salary_offered}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Designation Offered</TableCell>
            <TableCell> {results.designation}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Campaign</TableCell>
            <TableCell> {results.campaign}</TableCell>
        </TableRow>
        </TableBody> : null }
        </Table>    
    )
}


export default HRRoundCard;