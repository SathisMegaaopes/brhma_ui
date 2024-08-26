// // import './App.css';
// import { useEffect, useState } from 'react';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';

// function ResponsiveDateRangePickers() {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   const formatDate = (dateString)  =>{
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();

//     const formattedMonth = month < 10 ? `0${month}` : month;
//     const formattedDay = day < 10 ? `0${day}` : day;

//     return `${year}-${formattedMonth}-${formattedDay}`;
//   }


//   const handleSelect = (date) => {
//     setStartDate(formatDate(date.selection.startDate));
//     setEndDate(formatDate(date.selection.endDate));
//   };

//   const selectionRange = {
//     startDate: startDate,
//     endDate: endDate,
//     key: 'selection',
//   }

//   console.log(startDate)
//   console.log(endDate)


//   return (
//     <div className="App">
//       <DateRangePicker
//         ranges={[selectionRange]}
//         onChange={handleSelect}
//       />
//     </div>
//   );
// }


// export default ResponsiveDateRangePickers;

import React, { useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Box, Button } from '@mui/material';
import dayjs from 'dayjs';

export default function TaskTimingPicker() {
  
  const [startDateTime, setStartDateTime] = useState(dayjs(new Date()));
  const [endDateTime, setEndDateTime] = useState(dayjs(new Date()).add(1, 'hour')); // Default to 1 hour later

  const handleSubmit = () => {
    if (startDateTime && endDateTime) {
      console.log('Task Start Time:', startDateTime.toISOString());
      console.log('Task End Time:', endDateTime.toISOString());
    } else {
      console.error('Please select both start and end times.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 2 }}>
        <DateTimePicker
          label="Start Date & Time"
          value={startDateTime}
          onChange={(newValue) => setStartDateTime(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2 }} />}
        />
        <DateTimePicker
          label="End Date & Time"
          value={endDateTime}
          onChange={(newValue) => setEndDateTime(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2 }} />}
        />

      </Box>
    </LocalizationProvider>
  )
}

{/* <Button variant="contained" onClick={handleSubmit}>
Submit
</Button> */}


