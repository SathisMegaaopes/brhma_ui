import * as React from 'react';
import { Grid, Typography, IconButton, TextField, Breadcrumbs, Link } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MOSFooter from '../Global/Footer';
import MOSCandiateTable from '../CandidateTable/index.js';
import axios from 'axios';
import { DateFormater } from "../../Components/Global/Utils/common_data.js";
import URL from "../Global/Utils/url_route";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useSharedContext } from '../../Context.js';



function MOSCandidate({ emp_id, fromDate, toDate }) {

    const { sharedTab, setSharedTab, rerender } = useSharedContext();

    const [loader, setLoader] = React.useState(false);
    const [candidates, setCandidates] = React.useState([]);
    const [emp_details, setEmp] = React.useState([]);

    const user_session = sessionStorage.getItem("user_info");


    const history = useNavigate();

    React.useEffect(() => {
        if (user_session === undefined || user_session === "" || user_session === null) {
            history("/");
        }
        setLoader(true);

        let url;

        if (sharedTab.active === 1) {
            url = URL + sharedTab.backendUrl
        } else {
            url = URL + "candidates"

        }


        axios.get(url)
            .then((response) => {
                if (response.data.status === 0) {
                    setCandidates(response.data.data)
                    setEmp(response.data.emp_details);
                }
                else {
                    console.log("ERROR : ", JSON.stringify(response.data));
                }
            })
            .catch()
            .finally(() => {
                setLoader(false);
            });

    }, [rerender]);



    const [anchorEl, setAnchorEl] = React.useState(null);

    const [searchKey, setSearchKey] = React.useState("");


    const searchCandidate = (event) => {
        if (searchKey !== "" && event.keyCode === 13) {
            let search_key = searchKey;
            let search_url = URL + "candidates/searchCandidate/" + search_key;
            axios.get(search_url)
                .then((response) => {
                    if (response.data.status === 0 && response.data.data.length > 0) {
                        setCandidates([]);
                        setCandidates(response.data.data);
                        setEmp(response.data.emp_details);
                        setSearchKey("");
                    }
                    else {
                        setSearchKey("");
                    }
                })
                .catch((err) => {
                    console.log("ERROR ", JSON.stringify(err));
                })
                .finally(() => {

                });
        }

    }


    const downloadExcel = () => {

        let firstpartname;
        let secondpartname;

        let fullfilename;

        if (emp_id) {
            const datefrom = new Date(fromDate)
            const datefrom2 = DateFormater(datefrom)
            firstpartname = datefrom2

            const dateto = new Date(toDate)
            const dateto2 = DateFormater(dateto)
            secondpartname = dateto2

            const empolyerdetails = emp_details.filter((item) => item.emp_id === Number(emp_id))
            const employername = empolyerdetails[0].emp_name

            fullfilename = employername + " " + firstpartname + "--" + secondpartname;

        } else {
            fullfilename = 'dumbData ';
        }

        const date = new Date();

        const name = DateFormater(date)

        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(candidates);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        saveAs(blob, `${fullfilename}.xlsx`);
    };


    return (
        <>
            <Grid container spacing={2} sx={{ paddingY: 3, paddingX: 2, paddingLeft: 6 }} >
                <Grid item xs={12} md={12} lg={4} xl={4}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/dashboard">
                            Dashboard
                        </Link>

                        <Typography color="text.primary" variant='h5'>Candidate Database</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={2} xl={3}>
                    {" "}
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                    <TextField variant='outlined' label="Search Candidate" size='small'
                        fullWidth placeholder='Search By Name or ID' onKeyUp={e => searchCandidate(e)} onChange={e => setSearchKey(e.target.value)} />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2} xl={1} alignItems='center' justifyContent='center'>
                    <IconButton onClick={downloadExcel} style={{ marginTop: '-5px' }}>
                        <CloudDownloadIcon fontSize="large" color="primary" />
                    </IconButton>
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {candidates.length === 0 ? "" : <MOSCandiateTable data={candidates} emp_details={emp_details} />}
                </Grid>
            </Grid>

            {loader ? <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </>
                : null}
            <MOSFooter />

        </>
    )
}


export default MOSCandidate;