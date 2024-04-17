// src/components/FactoryTimeline.js

import React, { useState, useEffect, useRef } from 'react';
import TimelineCircle from './Shapes/TimelineCircle';
import '../css/components/FactoryTimeline.css';

 
const FactoryTimeline = ({ factory, timeperiods, products, employment }) => {

    useEffect(() => {
        // Construct an array of timeperiods that also contains the factory's details
        console.log('FactoryTimeline factory');
        console.log(factory);

        console.log('FactoryTimeline timeperiods');
        console.log(timeperiods);

        console.log('FactoryTimeline products');
        console.log(products);
        
        console.log('FactoryTimeline employment');
        console.log(employment);

    }, [factory, timeperiods, products, employment]);

    return (
        <div className='factory-timeline-container'>
            <TimelineCircle timeperiodYear='1999' timeperiodDescription='Some shit that happened in 1999' />
        </div>
    );
};

export default FactoryTimeline;