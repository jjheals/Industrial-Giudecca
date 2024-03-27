// src/pages/TimelineGridA.js
import React, { useState, useEffect, useRef } from 'react';

import '../css/TimelineGridA.css';

import Sidebar from '../components/Sidebar';
import TimelineGridA from '../components/TimelineGridA.js';

function TimelineGridA_page() {

    return (
        <div className="homepage">
            <header>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Judson"/>

                <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css"/>
                <script src="https://js.arcgis.com/4.28/"></script>
                <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
                <script type="module" src="https://js.arcgis.com/calcite-components/1.9.2/calcite.esm.js"></script>
                <link rel="stylesheet" type="text/css"
                      href="https://js.arcgis.com/calcite-components/1.9.2/calcite.css"/>
                <link rel="stylesheet" href="../static/index.css"/>
            </header>

            <head>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
                <meta charSet="utf-8"/>
                <title>Industrial Giudecca</title>
            </head>

            <div><Sidebar /></div>
            <div className="timeline-container"><TimelineGridA /></div>

        </div>
    );
}

export default TimelineGridA_page;