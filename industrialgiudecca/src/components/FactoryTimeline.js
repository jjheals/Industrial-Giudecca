// src/components/FactoryTimeline.js

/** { Component} FactoryTimeline
 * @abstract Component that renders on each industrial site page, i.e. BasicFactoryTemplate, with the important timeperiods in that
 * industrial site's history.
 * 
 * @param { Factory } factory - A factory object for this page 
 * @param { Object } timeperiods - An Object (dictionary) in the format [ key : val ] => [ year : timeperiod_as_dict ] 
 */
import React, { useState, useEffect } from 'react';
import TimelineCircle from './Shapes/TimelineCircle';
import TimelineLine from './Shapes/TimelineLine';
import '../css/components/FactoryTimeline.css';
 
const FactoryTimeline = ({ factory, timeperiods }) => {
    const [timelineRows, setTimelineRows] = useState([]);

    useEffect(() => {
        // Base case: some error occured and there is no given factory or timeperiods
        if(!factory || !timeperiods) return; 

        const years = Object.keys(timeperiods); // All the years in the timeperiods
        const numTimeperiods = years.length;    // Number of timeperiods/years given to calc the number of rows
        
        /* Calculate how many rows the timeline will need
         * - The rows alternate between 3 and 2 circles 
         * - The number of rows is directly proportional to the number of timeperiods
         * - Determining the number of rows is necessary to constructing the timeline properly
         */
        const numRows = Math.ceil((numTimeperiods / 5) * 2)

        // Construct the rows as a 2-D array
        let rows = [];  // Init array of all rows
        let c = 0;      // Counter

        // For each new row 
        for(let r = 0; r < numRows; r++) { 
            let thisRow = [];
        
            // Check how many timeperiods in this row 
            // Take the row number (r) + 1 mod 2 => if 0 then this row has 2 timeperiods, else it has 3 timeperiods
            const thisRowNumTimeperiods = (r + 1) % 2 == 0 ? 2 : 3;

            // For each year to be in this row
            for(let j = 0; j < thisRowNumTimeperiods; c++, j++) { 
                const thisYear = years[c]; 

                if(thisYear) { 
                    const theseTimeperiods = timeperiods[thisYear];
                    let concatTimeperiodTitle = '';
    
                    // For each timeperiod (event, timeperiod.Title) in this year
                    theseTimeperiods.forEach(timeperiod => { 
                        concatTimeperiodTitle += '\n' + timeperiod.Title;
                    });
                    
                    // If there are timeperiods, add them to this row. Note the conditional to avoid an empty row
                    if(theseTimeperiods) thisRow.push({ 'Title': concatTimeperiodTitle, 'Year': thisYear, 'Color': theseTimeperiods[0].Color });
                }    
            }

            // Append thisRow to the running array of rows
            rows.push(thisRow);
        }

        // Set the timeline rows on screen
        setTimelineRows(rows);

    }, [factory, timeperiods]);

    return (
        <div className='factory-timeline-container'>
            {
                // Iterate over the timelineRows and render each individually
                timelineRows.map(row => { 
                    // If there are items in this row 
                    if(row.length > 0) { 
                        return(
                            // Create this row 
                            <div className='factory-timeline-row'>
                                {/* Subrow for the initial line with an arrow on the far left */}
                                <div className={`factory-timeline-sub-row ${row.length == 3 ? "A" : "B"}`}>
                                    <TimelineLine length={ `${row.length == 3 ? "13.4" : row.length == 2 ? "23" : "42.5"}vw` } />
                                </div>
                                {/* Subrow for the main timeline content */}
                                <div className='factory-timeline-sub-row'>
                                    { 
                                        // Iterate over all the timeperiods in this row
                                        row.map((timeperiodDict, i) => {  
                                            return(
                                                // Subrow for this timeperiod circle component and a line with an arrow to follow
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