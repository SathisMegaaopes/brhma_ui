import { } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material"
const interview_rounds = [
{ id: 1, name: "HR Round" },
{ id: 2, name: "Typing Test" },
{ id: 3, name: "Written Test" },
{ id: 4, name: "Team Lead Round" },
{ id: 5, name: "Operations Round" },
{ id: 6, name: "HR Final Discussion" }];


const interview_status = [
    { id: 1, name: "Selected" },
    { id: 2, name: "Rejected" },
    { id: 3, name: "Hold" },
    { id: 4, name: "Shortlist" },
];

const getStatusName = (val, arr = interview_status) => {
    let result = null;
    let data = arr;
    result = data.find(item => item.id == val);
    if (result !== undefined) {
        return result.name;
    }
    else {
        return "Pending Evaluation";
    }
}


const DateFormater = (val) => {
    let new_date = new Date(val);
    let year = new_date.getFullYear();
    let month = ("0" + (new_date.getMonth() + 1)).slice(-2);
    let date = ("0" + new_date.getDate()).slice(-2);

    return date + "/" + month + "/" + year;
}

const NewDateFormater = (val) => {
    let new_date = new Date(val);
    let year = new_date.getFullYear();
    let month = ("0" + (new_date.getMonth() + 1)).slice(-2);
    let date = ("0" + new_date.getDate()).slice(-2);

    return date + "-" + month + "-" + year;
}

const getRating = (val) => {
    if (val === 0) {
        return <><StarBorder /><StarBorder /><StarBorder /><StarBorder /><StarBorder /></>
    }
    else if (val === 1) {
        return <><Star /><StarBorder /><StarBorder /><StarBorder /><StarBorder /></>
    }
    else if (val === 2) {
        return <><Star /><Star /><StarBorder /><StarBorder /><StarBorder /></>
    }
    else if (val === 3) {
        return <><Star /><Star /><Star /><StarBorder /><StarBorder /></>
    }
    else if (val === 4) {
        return <><Star /><Star /><Star /><Star /><StarBorder /></>
    }
    else if (val === 5) {
        return <><Star /><Star /><Star /><Star /><Star /></>
    }
}

const finalStatus = (data) => {
    let result = interview_status.find(item => item.id == data);

    if (result === undefined || result === 0) {
        return "Awaiting Final Status";
    }
    else {
        return result.name;
    }
}

const referred_by_data = ["Walk In", "Walk In HR", "Consultancy",
    "Job Portal", "Google Search", "Instagram", "Facebook", "Newspaper", "Employee Reference", "Name board","Posters","Others"];

export { interview_rounds, interview_status, getStatusName, DateFormater,NewDateFormater, getRating, finalStatus, referred_by_data };