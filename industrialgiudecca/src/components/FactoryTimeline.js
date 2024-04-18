// src/components/FactoryTimeline.js

import React, { useState, useEffect } from 'react';
import TimelineCircle from './Shapes/TimelineCircle';
import TimelineLine from './Shapes/TimelineLine';
import '../css/components/FactoryTimeline.css';

 
const FactoryTimeline = ({ factory, timeperiods }) => {
    const [timelineRows, setTimelineRows] = useState([]);

    useEffect(() => {
        if(!factory || !timeperiods) return; 

        const years = Object.keys(timeperiods);
        const numTimeperiods = years.length;
        
        /* Calculate how many rows the timeline will need
         * - The rows alternate between 3 and 2 circles 
         * - The number of rows is directly proportional to the number of timeperiods
         * - Determining the number of rows is necessary to constructing the timeline properly
         */
        const numRows = Math.ceil((numTimeperiods / 5) * 2)

        // Construct the rows as a 2-D array
        let rows = [];
        let c = 0;
        for(let r = 0; r < numRows; r++) { 
            let thisRow = [];
            

            // Check how many timeperiods in this row 
            // Take the row number (r) + 1 mod 2 => if 0 then this row has 2 timeperiods, else it has 3 timeperiods
            const thisRowNumTimeperiods = (r + 1) % 2 == 0 ? 2 : 3;

            for(let j = 0; j < thisRowNumTimeperiods; c++, j++) { 
                const thisYear = years[c];   

                if(thisYear) { 
                    const theseTimeperiods = timeperiods[thisYear];
                    let concatTimeperiodTitle = '';
    
                    theseTimeperiods.forEach(timeperiod => { 
                        concatTimeperiodTitle += '\n' + timeperiod.Title;
                    });
    
                    if(theseTimeperiods) thisRow.push({ 'Title': concatTimeperiodTitle, 'Year': thisYear, 'Color': theseTimeperiods[0].Color });
                }    
            }
            rows.push(thisRow);
        }

        setTimelineRows(rows);

    }, [factory, timeperiods]);

    return (
        <div className='factory-timeline-container'>
            {
                timelineRows.map(row => { 
                    if(row.length > 0) { 
                        return(
                            <div className='factory-timeline-row'>
                                <div className={`factory-timeline-sub-row ${row.length == 3 ? "A" : "B"}`}>
                                    <TimelineLine length={ `${row.length == 3 ? "13.4" : row.length == 2 ? "23" : "42.5"}vw` } />
                                </div>
                                <div className='factory-timeline-sub-row'>
                                    { 
                                        row.map((timeperiodDict, i) => {  
                                            return(
                                                <div className={`factory-timeline-sub-row ${row.length == 3 ? "A" : "B"}`}>
                                                    <TimelineCircle 
                                                        timeperiodYear={timeperiodDict.Year} 
                                                        timeperiodDescription={timeperiodDict.Title} 
                                                        circleColor={`rgba(${timeperiodDict.Color[0]}, ${timeperiodDict.Color[1]}, ${timeperiodDict.Color[2]}, 0.3)`} 
                                                        textColor={`rgb(${timeperiodDict.Color[0]}, ${timeperiodDict.Color[1]}, ${timeperiodDict.Color[2]})`}
                                                    />
                                                    <TimelineLine length={ `${row.length == 3 ? "13.4" : row.length == 2 ? "23" : "42.5"}vw` } />
                                                </div>                         
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                })
            }
            
            
        </div>
    );
};

export default FactoryTimeline;