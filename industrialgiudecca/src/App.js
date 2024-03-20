// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FactoryHomepage from './pages/FactoryHomepage';
import StuckyFactory from './pages/StuckyFactory';
import Homepage from './pages/Homepage';
import Photos from './pages/Photos';
import BasicFactoryTemplate from './pages/BasicFactoryTemplate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/factory" element={<FactoryHomepage />} />
                <Route path="/stucky" element={<StuckyFactory />} />
                <Route path={"/photos"} element={<Photos />} />
                <Route path={"/factory/:Factory_ID"} element={<BasicFactoryTemplate />} />
            </Routes>
        </Router>
    );
}

export default App;