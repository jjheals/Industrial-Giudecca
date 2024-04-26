// src/components/shapes/TimelineTriangle.js

/** { Component } TimelineTriangle
 * @abstract Component rendered on FactoryTimeline that creates the triangles/arrows on the lines between timeperiod circles. 
 * Renders within TimelineLine.
 */

export default function TimelineTriangle() {
    return (
    <div className='timeline-triangle-container'>
        <div
            className="triangle"
            style={{
                position: 'relative',
                top: '-0.4vw',
                left: '5vw',
                width: '3vw',
                transform: 'rotate(45deg)',
                border: '1px solid #ea5b41'
            }}
            ></div>
            <div
            className="triangle"
            style={{
                position: 'relative',
                top: '1.7vw',
                left: '5vw',
                width: '3vw',
                transform: 'rotate(135deg)',
                border: '1px solid #ea5b41'
            }}
            ></div>
    </div>
      
    );
  }