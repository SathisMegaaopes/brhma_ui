// import React, { useEffect, useState } from 'react';
// import { Calendar } from 'rsuite';
// import { Card } from '@mui/material';
// import 'rsuite/dist/rsuite.min.css';
// import dayjs from 'dayjs';
// import URL from "../Global/Utils/url_route";

// // const CalendarComponent = () => {
// //     const [hoveredDate, setHoveredDate] = useState(null);

// //     const coloredDates = {
// //         '2024-09-12': '#FF0000',
// //         '2024-09-18': '#008000',
// //         '2024-09-20': '#808080',
// //     };

// //     const pointsData = {
// //         '2024-09-12': ['Event A', 'Meeting'],
// //         '2024-09-18': ['Holiday', 'Reminder'],
// //         '2024-09-20': ['Task Deadline', 'Conference'],
// //     };

// //     const handleMouseEnter = (date) => {
// //         const dateStr = dayjs(date).format('YYYY-MM-DD');

// //         if (coloredDates.hasOwnProperty(dateStr)) {
// //             setHoveredDate(dateStr);
// //         }
// //     };

// //     const handleMouseLeave = () => {
// //         setHoveredDate(null);
// //     };

// //     const renderCell = (date) => {
// //         const dateStr = dayjs(date).format('YYYY-MM-DD');
// //         const color = coloredDates[dateStr];
// //         const points = pointsData[dateStr] || [];

// //         return (
// //             <div
// //                 className={`calendar-cell ${hoveredDate === dateStr ? 'hovered' : ''}`}
// //                 onMouseEnter={() => handleMouseEnter(date)}
// //                 onMouseLeave={handleMouseLeave}
// //                 style={{
// //                     backgroundColor: color || 'transparent',
// //                     borderRadius: '20px',
// //                     marginTop: '-30px',
// //                     zIndex: 2
// //                 }}
// //             >
// //                 {hoveredDate === dateStr && (
// //                     <div className="points">
// //                         {points.map((point, index) => (
// //                             <div key={index}>{point}</div>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>
// //         );
// //     };

// //     return (
// //         <>
// //             <style>
// //                 {`
// //                     .calendar-cell {
// //                         // position: relative;
// //                         // width: 100%;
// //                         // height: 100%;
// //                         display: flex;
// //                         flex-direction: column;
// //                         justify-content: center;
// //                         align-items: center;
// //                         cursor: default;
// //                         border: none; 
// //                         box-shadow: none; 
// //                     }

// //                     .calendar-cell .points {
// //                         display: none; /* Hide by default */
// //                         position: absolute;
// //                         bottom: -40px; /* Adjust as needed */
// //                         left: 0;
// //                         width: 100%;
// //                         background: white; /* Background for the hover content */
// //                         padding: 5px;
// //                         font-size: 10px;
// //                         border: 1px solid #ddd; /* Optional: border around the hover content */
// //                         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: shadow */
// //                         z-index: 1; /* Ensure hover content appears above other elements */
// //                         text-align: center; /* Center-align text */
// //                     }

// //                     .calendar-cell.hovered .points {
// //                         display: block;
// //                     }

// //                     .rs-calendar *:focus {
// //                         outline: none !important;
// //                         box-shadow: none !important;
// //                     }


// //                     .rs-calendar {
// //                         box-shadow: none !important;
// //                     }


// //                 `}
// //             </style>
// //             <Card>
// //                 <Calendar
// //                     compact
// //                     isoWeek={false}
// //                     renderCell={renderCell}
// //                     onSelect={(date)=>handleMouseEnter(date)}
// //                 />
// //             </Card>
// //         </>
// //     );
// // };


// const CalendarComponent = () => {
//     const [hoveredDate, setHoveredDate] = useState(null);
//     const [coloredDates, setColoredDates] = useState({});
//     const [pointsData, setPointsData] = useState({});

//     // Fetch data from the backend when the component mounts
//     useEffect(() => {

//         let url = `${URL}/empactivity`

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 setColoredDates(data.coloredDates);
//                 setPointsData(data.pointsData);
//             })
//             .catch(error => console.error('Error fetching calendar data:', error));
//     }, []);

//     const handleMouseEnter = (date) => {
//         const dateStr = dayjs(date).format('YYYY-MM-DD');
//         if (coloredDates.hasOwnProperty(dateStr)) {
//             setHoveredDate(dateStr);
//         }
//     };

//     const handleMouseLeave = () => {
//         setHoveredDate(null);
//     };

//     const renderCell = (date) => {
//         const dateStr = dayjs(date).format('YYYY-MM-DD');
//         const color = coloredDates[dateStr];
//         const points = pointsData[dateStr] || [];

//         return (
//             <div
//                 className={`calendar-cell ${hoveredDate === dateStr ? 'hovered' : ''}`}
//                 onMouseEnter={() => handleMouseEnter(date)}
//                 onMouseLeave={handleMouseLeave}
//                 style={{
//                     backgroundColor: color || 'transparent',
//                     borderRadius: '20px',
//                     marginTop: '-30px',
//                     zIndex: 2
//                 }}
//             >
//                 {hoveredDate === dateStr && (
//                     <div className="points">
//                         {points.map((point, index) => (
//                             <div key={index}>{point}</div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <>
//             <style>
//                 {`
//                     .calendar-cell {
//                         display: flex;
//                         flex-direction: column;
//                         justify-content: center;
//                         align-items: center;
//                         cursor: default;
//                         border: none; 
//                         box-shadow: none; 
//                     }

//                     .calendar-cell .points {
//                         display: none; /* Hide by default */
//                         position: absolute;
//                         bottom: -40px; /* Adjust as needed */
//                         left: 0;
//                         width: 100%;
//                         background: white; /* Background for the hover content */
//                         padding: 5px;
//                         font-size: 10px;
//                         border: 1px solid #ddd; /* Optional: border around the hover content */
//                         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: shadow */
//                         z-index: 1; /* Ensure hover content appears above other elements */
//                         text-align: center; /* Center-align text */
//                     }

//                     .calendar-cell.hovered .points {
//                         display: block;
//                     }

//                     .rs-calendar *:focus {
//                         outline: none !important;
//                         box-shadow: none !important;
//                     }

//                     .rs-calendar {
//                         box-shadow: none !important;
//                     }
//                 `}
//             </style>
//             <Card>
//                 <Calendar
//                     compact
//                     isoWeek={false}
//                     renderCell={renderCell}
//                     onSelect={(date) => handleMouseEnter(date)}
//                 />
//             </Card>
//         </>
//     );
// };


// export default CalendarComponent;





import React from 'react';
import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

// Your data for coloring the dates
const coloredDates = {
    '2024-09-12': '#FF0000',
    '2024-09-18': '#008000',
    '2024-09-20': '#808080'
};

const renderDateCell = (date) => {
    if (!date) return null; // Ensure date is valid

    const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const todayDateString = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD
    const backgroundColor = coloredDates[dateString] || 'transparent'; // Get the background color or set it to transparent
    const tooltipText = `Info for ${date.getDate()}`; // Customize this text as needed

    return (
        <div style={{
            position: 'relative', // Position for tooltip positioning
            display: 'inline-block',
            textAlign: 'center', // Center text horizontally
            verticalAlign: 'middle', // Center text vertically
        }}>
            <div
                style={{
                    backgroundColor,
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%', // Perfectly round the cell
                    display: 'flex', // Flexbox for centering content
                    justifyContent: 'center', // Horizontally center
                    alignItems: 'center', // Vertically center
                    color: '#fff',
                    margin: '8px', // Margin around the cell
                    cursor: 'pointer', // Indicate that the cell is interactive
                    border: dateString === todayDateString ? '2px solid #ff0000' : 'none', // Highlight today's date
                    fontWeight: dateString === todayDateString ? 'bold' : 'normal' // Make today's date bold
                }}
            >
                {date.getDate()} {/* Display the date number */}
            </div>
            <div
                style={{
                    // visibility: 'hidden',
                    width: '120px',
                    backgroundColor: '#333',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '5px',
                    padding: '5px 0',
                    position: 'absolute',
                    zIndex: '1',
                    bottom: '125%',
                    left: '50%',
                    marginLeft: '-60px', // Center the tooltip
                    opacity: 0,
                    transition: 'opacity 0.3s'
                }}
                className="tooltip"
            >
                {tooltipText}
            </div>
        </div>
    );
};





const CalendarComponent = () => {
    return (
        <Calendar
            compact
            renderCell={(date) => renderDateCell(date)}
        />
    );
};

export default CalendarComponent;







