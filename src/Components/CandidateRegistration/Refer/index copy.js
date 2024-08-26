import * as React from 'react';
import {Container,Grid,Button,TextField,
    TableContainer,Table,TableBody,
    TableCell,TableHead,TableRow} from "@mui/material";



function ReferDetails(){
    return (
        <Container>
        <TableContainer>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>
                       &nbsp;
                    </TableCell>
                    <TableCell>
                        Name 1
                    </TableCell>
                    <TableCell>
                        Name 2
                    </TableCell>
                    
                    
                </TableRow>
                </TableHead>
                <TableRow>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="c_1" label="Candidate Name" variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth id="c_2" label="Candidate Name" variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                        Mobile
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="c1_mob" label="Candidate Mobile" variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth id="c2_mob" label="Candidate Mobile" variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                        Skill Set
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth multiline rows={2} placeholder='Enter comma seperated values' id="c1_skill" label="Candidate Skill Set" variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth multiline rows={2}  placeholder='Enter comma seperated values' id="c2_skill" label="Candidate Skill Set" variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                        Total Exp.
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="exp_1" label="Candidate Experience" placeholder='eg. 4.6'  variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth id="exp_2" label="Candidate Experience" placeholder='eg. 4.6' variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                        Current Salary
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="sal_1" label="Current Salary" variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth id="sal_2" label="Current Salary" variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                        Expected Salary
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="ext_1" label="Expected Salary" variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth id="ext_2" label="Expected Salary" variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                        Location
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="loc_1" label="Candidate Location" variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth id="loc_2" label="Candidate Loction" variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                        Commments
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth multiline rows={3} id="comm_1" label="Comments" variant="outlined" size="small" required/>
                    </TableCell>

                    <TableCell>
                    <TextField fullWidth multiline rows={3} id="comm_2" label="Comments" variant="outlined" size="small" required/>
                    </TableCell>
                    
                </TableRow>
            </Table>
            
            
        </TableContainer>
        
        </Container>
    )
}

export default ReferDetails;