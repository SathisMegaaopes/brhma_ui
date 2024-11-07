import * as React from 'react';
import {Container,Grid,Button,TextField,
    TableContainer,Table,TableBody,
    TableCell,TableHead,TableRow} from "@mui/material";



function WorkDetails(props){
    const [company1,setCompany1] = React.useState(props.data.company1);
    const [company1From,setCompany1From] = React.useState(props.data.company1From);
    const [company1To,setCompany1To] = React.useState(props.data.company1To);
    const [company1Desi,setCompany1Desi] = React.useState(props.data.company1Desi);
    const [company1Refname,setCompany1Refname] = React.useState(props.data.company1Refname);
    const [company1Refmob,setCompany1Refmob] = React.useState(props.data.company1Refmob);
    const [company1sal,setCompany1sal] = React.useState(props.data.company1sal);
    
    const [company2,setCompany2] = React.useState(props.data.company2);
    const [company2From,setCompany2From] = React.useState(props.data.company2From);
    const [company2To,setCompany2To] = React.useState(props.data.company2To);
    const [company2Desi,setCompany2Desi] = React.useState(props.data.company2Desi);
    const [company2Refname,setCompany2Refname] = React.useState(props.data.company2Refname);
    const [company2Refmob,setCompany2Refmob] = React.useState(props.data.company2Refmob);
    const [company2sal,setCompany2sal] = React.useState(props.data.company2sal);

    const [company3,setCompany3] = React.useState(props.data.company3);
    const [company3From,setCompany3From] = React.useState(props.data.company3From);
    const [company3To,setCompany3To] = React.useState(props.data.company3To);
    const [company3Desi,setCompany3Desi] = React.useState(props.data.company3Desi);
    const [company3Refname,setCompany3Refname] = React.useState(props.data.company3Refname);
    const [company3Refmob,setCompany3Refmob] = React.useState(props.data.company3Refmob);
    const [company3sal,setCompany3sal] = React.useState(props.data.company3sal);

    const [company4,setCompany4] = React.useState(props.data.company4);
    const [company4From,setCompany4From] = React.useState(props.data.company4From);
    const [company4To,setCompany4To] = React.useState(props.data.company4To);
    const [company4Desi,setCompany4Desi] = React.useState(props.data.company4Desi);
    const [company4Refname,setCompany4Refname] = React.useState(props.data.company4Refname);
    const [company4Refmob,setCompany4Refmob] = React.useState(props.data.company4Refmob);
    const [company4sal,setCompany4sal] = React.useState(props.data.company4sal);


    const handleClick = () =>{
        let data = [{
            company1 : company1,
            company1From : company1From,
            company1To:company1To,
            company1Desi : company1Desi,
            company1Refname : company1Refname,
            company1Refmob : company1Refmob,
            company1Sal : company1sal
          },
          {
            company2 : company2,
            company2From : company2From,
            company2To:company2To,
            company2Desi : company2Desi,
            company2Refname : company2Refname,
            company2Refmob : company2Refmob,
            company2Sal : company2sal
          },
          {
            company3 : company3,
            company3From : company3From,
            company3To:company3To,
            company3Desi : company3Desi,
            company3Refname :company3Refname,
            company3Refmob : company3Refmob,
            company3Sal : company3sal
          },
          {
            company4 : company4,
            company4From : company4From,
            company4To:company4To,
            company4Desi : company4Desi,
            company4Refname :company4Refname,
            company4Refmob : company4Refmob,
            company4Sal : company4sal
          }];

        props.handleWork(data);
        props.handleNext();
    }

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
                        Company 1
                    </TableCell>
                    <TableCell>
                        Company 2
                    </TableCell>
                    <TableCell>
                     Company 3
                    </TableCell>
                    <TableCell>
                        Company 4
                    </TableCell>
                    
                </TableRow>
                </TableHead>
                <TableRow>
                    <TableCell>
                        Company
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="com_1" label="Company Name" 
                    variant="outlined" size="small"
                    value={company1} 
                    onChange={e=>setCompany1(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="com_2" label="Company Name" 
                    variant="outlined" size="small" 
                    value={company2} 
                    onChange={e=>setCompany2(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="com_3" label="Company Name" 
                    variant="outlined" size="small"
                    value={company3} 
                    onChange={e=>setCompany3(e.target.value)} />
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="com_4" label="Company Name" 
                    variant="outlined" size="small" 
                    value={company4} 
                    onChange={e=>setCompany4(e.target.value)}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Duration
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="from_1" label="From" 
                    variant="outlined" size="small" 
                    value={company1From} 
                    onChange={e=>setCompany1From(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="from_2" label="From" 
                    variant="outlined" size="small" 
                    value={company2From} 
                    onChange={e=>setCompany2From(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="from_3" label="From" 
                    variant="outlined" size="small" 
                    value={company3From} 
                    onChange={e=>setCompany3From(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="from_4" label="From" 
                    variant="outlined" size="small" 
                    value={company4From} 
                    onChange={e=>setCompany4From(e.target.value)}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Duration
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="to_1" label="To" 
                    variant="outlined" size="small" 
                    value={company1To} 
                    onChange={e=>setCompany1To(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="to_2" label="To" 
                    variant="outlined" size="small" 
                    value={company2To} 
                    onChange={e=>setCompany2To(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="to_3" label="To" 
                    variant="outlined" size="small" 
                    value={company3To} 
                    onChange={e=>setCompany3To(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="to_4" label="To" 
                    variant="outlined" size="small" 
                    value={company4To} 
                    onChange={e=>setCompany4To(e.target.value)}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Designation
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="des_1" label="Designation" 
                    variant="outlined" size="small" 
                    value={company1Desi} 
                    onChange={e=>setCompany1Desi(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="des_2" label="Designation" 
                    variant="outlined" size="small" 
                    value={company2Desi} 
                    onChange={e=>setCompany2Desi(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="des_3" label="Designation" 
                    variant="outlined" size="small"
                    value={company3Desi} 
                    onChange={e=>setCompany3Desi(e.target.value)} />
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="des_4" label="Designation" 
                    variant="outlined" size="small" 
                    value={company4Desi} 
                    onChange={e=>setCompany4Desi(e.target.value)}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Reference
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="ref_name_1" label="Name" 
                    variant="outlined" size="small" 
                    value={company1Refname} 
                    onChange={e=>setCompany1Refname(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="ref_name_2" label="Name" 
                    variant="outlined" size="small" 
                    value={company2Refname} 
                    onChange={e=>setCompany2Refname(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="ref_name_3" label="Name" 
                    variant="outlined" size="small" 
                    value={company3Refname} 
                    onChange={e=>setCompany3Refname(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="ref_name_4" label="Name" 
                    variant="outlined" size="small" 
                    value={company4Refname} 
                    onChange={e=>setCompany4Refname(e.target.value)}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Reference
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="mob_1" label="Phone" 
                    variant="outlined" size="small" 
                    value={company1Refmob} 
                    onChange={e=>setCompany1Refmob(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="mob_1" label="Phone" 
                    variant="outlined" size="small" 
                    value={company2Refmob} 
                    onChange={e=>setCompany2Refmob(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="mob_3" label="Phone" 
                    variant="outlined" size="small" 
                    value={company3Refmob} 
                    onChange={e=>setCompany3Refmob(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="mob_4" label="Phone" 
                    variant="outlined" size="small" 
                    value={company4Refmob} 
                    onChange={e=>setCompany4Refmob(e.target.value)}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Salary
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="net_1" label="Net Pay" 
                    variant="outlined" size="small" 
                    value={company1sal} 
                    onChange={e=>setCompany1sal(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="net_2" label="Net Pay" 
                    variant="outlined" size="small"
                    value={company2sal} 
                    onChange={e=>setCompany2sal(e.target.value)} />
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="net_3" label="Net Pay" 
                    variant="outlined" size="small"
                    value={company3sal} 
                    onChange={e=>setCompany3sal(e.target.value)} />
                    </TableCell>
                    <TableCell>
                    <TextField fullWidth id="net_4" label="Net Pay" 
                    variant="outlined" size="small" 
                    value={company4sal} 
                    onChange={e=>setCompany4sal(e.target.value)}/>
                    </TableCell>
                </TableRow>
            </Table>
            
            
        </TableContainer>
        <Grid container spacing={2}>

      <Grid item xs={12} sm={12} md={12}>
          <Button variant='contained' color='success' 
          disableElevation fullWidth  onClick={handleClick}>
          NEXT
          </Button>{/* disabled={disableNext} */}
      </Grid>
        </Grid>
        
        </Container>
    )
}

export default WorkDetails;