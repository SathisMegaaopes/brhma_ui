import React, { useState } from 'react';
import { Calendar } from 'rsuite';
import { Card } from '@mui/material';
import 'rsuite/dist/rsuite.min.css';
import dayjs from 'dayjs';  

const CalendarComponent = () => {
    const [hoveredDate, setHoveredDate] = useState(null);

    const coloredDates = {
        '2024-09-12': '#FF0000',
        '2024-09-18': '#008000',
        '2024-09-20': '#808080',
    };

    const pointsData = {
        '2024-09-12': ['Event A', 'Meeting'],
        '2024-09-18': ['Holiday', 'Reminder'],
        '2024-09-20': ['Task Deadline', 'Conference'],
    };

    const handleMouseEnter = (date) => {
        const dateStr = dayjs(date).format('YYYY-MM-DD');

        if (coloredDates.hasOwnProperty(dateStr)) {
            setHoveredDate(dateStr);
        }
    };

    const handleMouseLeave = () => {
        setHoveredDate(null);
    };

    const renderCell = (date) => {
        const dateStr = dayjs(date).format('YYYY-MM-DD');
        const color = coloredDates[dateStr];
        const points = pointsData[dateStr] || [];

        return (
            <div
                className={`calendar-cell ${hoveredDate === dateStr ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(date)}
                onMouseLeave={handleMouseLeave}
                style={{
                    backgroundColor: color || 'transparent',
                    borderRadius: '20px',
                    marginTop: '-30px',
                    zIndex: 2
                }}
            >
                {hoveredDate === dateStr && (
                    <div className="points">
                        {points.map((point, index) => (
                            <div key={index}>{point}</div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <style>
                {`
                    .calendar-cell {
                        // position: relative;
                        // width: 100%;
                        // height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        cursor: default;
                        border: none; 
                        box-shadow: none; 
                    }

                    .calendar-cell .points {
                        display: none; /* Hide by default */
                        position: absolute;
                        bottom: -40px; /* Adjust as needed */
                        left: 0;
                        width: 100%;
                        background: white; /* Background for the hover content */
                        padding: 5px;
                        font-size: 10px;
                        border: 1px solid #ddd; /* Optional: border around the hover content */
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: shadow */
                        z-index: 1; /* Ensure hover content appears above other elements */
                        text-align: center; /* Center-align text */
                    }

                    .calendar-cell.hovered .points {
                        display: block;
                    }
                    
                    .rs-calendar *:focus {
                        outline: none !important;
                        box-shadow: none !important;
                    }


                    .rs-calendar {
                        box-shadow: none !important;
                    }


                `}
            </style>
            <Card>
                <Calendar
                    compact
                    isoWeek={false}
                    renderCell={renderCell}
                    onSelect={(date)=>handleMouseEnter(date)}
                />
            </Card>
        </>
    );
};

export default CalendarComponent;






