// src/components/shapes/TimelineCircle.js

/** { Component } TimelineCircle
 * @abstract Component rendered on FactoryTimeline for the circles containing the timeperiod year and blurb about it.
 * @param { int } timeperiodYear - Year that appears in the center of the circle
 * @param { String } timeperiodDescription - Blurb/description that appears below the circle
 * @param { Array[3] } circleColor - Array containing RGB values in the format [R,G,B] for the color of the circle
 * @param { Array[3] } textColor - Array containing RGB values in the format [R,G,B] for the color of the text 
 */

import '../../css/components/TimelineCircle.css';

export default function TimelineCircle({ timeperiodYear, timeperiodDescription, circleColor, textColor }) {
    return (
        <div className="circle" style={{ borderColor: circleColor, backgroundColor: circleColor }}>
            <p className='timeperiod-year' style={{ color: textColor }}>{ timeperiodYear }</p>
            <p className='timeperiod-description' style={{ color: textColor }}>{ timeperiodDescription }</p>
        </div>
    );
  }
  