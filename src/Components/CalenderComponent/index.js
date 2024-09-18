import React, { useEffect, useState } from 'react';
import { Calendar, Tooltip, Whisper } from 'rsuite';
import { Card } from '@mui/material';
import 'rsuite/dist/rsuite.min.css';
import dayjs from 'dayjs';
import URL from "../Global/Utils/url_route";
import axios from 'axios'


const CalendarComponent = () => {
    const [hoveredDate, setHoveredDate] = useState(null);
    const [dateData, setdateData] = useState([]);

    const userinfo = JSON.parse(sessionStorage.getItem("user_info"));

    useEffect(() => {

        const fetchData = async () => {
            try {
                const url = `${URL}empactivity`;
                const username = userinfo.user_name;

                const response = await axios.get(url, {
                    params: {
                        emp_id: username
                    }
                });
                setdateData(response.data.data)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    const dateMap = dateData.reduce((map, item) => {
        map[item.date] = item;
        return map;
    }, {});

    const handleMouseEnter = (date) => {
        const dateStr = dayjs(date).format('YYYY-MM-DD');

        if (dateMap.hasOwnProperty(dateStr)) {
            setHoveredDate(dateStr);
        }
    };

    const handleMouseLeave = () => {
        setHoveredDate(null);
    };

    const renderCell = (date) => {
        const dateStr = dayjs(date).format('YYYY-MM-DD');
        const { color = 'transparent', content = '' } = dateMap[dateStr] || {};

        return (
            <div
                className={`calendar-cell ${hoveredDate === dateStr ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(date)}
                onMouseLeave={handleMouseLeave}
                style={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    margin: '-40px auto',
                    // zIndex: 5,
                }}
            >
                {hoveredDate === dateStr && content && (
                    <div className="points">
                        {content}
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
            width: 40px;
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: none; 
            box-shadow: none; 
        }

        .calendar-cell .points {
            display: none; 
            position: relative;
            bottom: 40px;
            left: 0;
            width: max-content;
            background: white; 
            padding: 5px;
            font-size: 15px;
            border: 1px solid #ddd; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
            z-index: 10; 
            text-align: center;
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
                    onSelect={(date) => handleMouseEnter(date)}
                />
            </Card>
        </>
    );
};


export default CalendarComponent;