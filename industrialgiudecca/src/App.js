// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FactoryHomepage from './pages/FactoryHomepage';
import StuckyFactory from './pages/StuckyFactory';
import Homepage from './pages/Homepage';
import Photos from './pages/Photos';
import BasicFactoryTemplate from './pages/BasicFactoryTemplate';
import DataExplorerPage from './pages/DataExplorerPage';

import TimelineGridA_page from './pages/TimelineGridA_page';
import TimelineGridB_page from './pages/TimelineGridB_page';

function App() {

    

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/factory" element={<FactoryHomepage />} />
                <Route path="/stucky" element={<StuckyFactory />} />
                <Route path={"/photos"} element={<Photos />} />
                <Route path={"/factory/:Factory_ID"} element={<BasicFactoryTemplate />} />
                <Route path={"/timelinegridA"} element={<TimelineGridA_page />} />
                <Route path={"/timelinegridB"} element={<TimelineGridB_page />} />
                <Route path={"/data-explorer"} element={<DataExplorerPage />} />
            </Routes>
        </Router>
    );
}

export default App;