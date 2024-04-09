// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/components/Title.css';

import FactoryHomepage from './pages/FactoryHomepage';
import StuckyFactory from './pages/StuckyFactory';
import Homepage from './pages/Homepage';
import GalleryPage from './pages/GalleryPage';
import BasicFactoryTemplate from './pages/BasicFactoryTemplate';
import DataExplorerPage from './pages/DataExplorerPage';
import AboutPage from './pages/AboutPage';
function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/factory" element={<FactoryHomepage />} />
                <Route path="/stucky" element={<StuckyFactory />} />
                <Route path={"/photos"} element={<GalleryPage />} />
                <Route path={"/factory/:Factory_ID"} element={<BasicFactoryTemplate />} />
                <Route path={"/data-explorer"} element={<DataExplorerPage />} />
                <Route path={"/about"} element={<AboutPage />} />
            </Routes>
        </Router>
    );
}

export default App;