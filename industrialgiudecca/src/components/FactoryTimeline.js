// src/components/FactoryTimeline.js

import React, { useState, useEffect, useRef } from 'react';

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
            
        </div>
    );
};

export default FactoryTimeline;