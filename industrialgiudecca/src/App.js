// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/components/Title.css';
import ReactDOM from 'react-dom';
import LanguageSelector from './components/LanguageSelector.js';

import FactoryHomepage from './pages/FactoryHomepage';
import Homepage from './pages/Homepage';
import BasicFactoryTemplate from './pages/BasicFactoryTemplate';
import DataExplorerPage from './pages/DataExplorerPage';
import AboutPage from './pages/AboutPage';
import IndustrialStoriesPage from './pages/IndustrialStoriesPage.js';
import MapPage from './pages/MapPage.js';


function App() {
    sessionStorage.setItem('hasSelectedLanguage', 'false');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/industrial-sites" element={<FactoryHomepage />} />
                <Route path={"/industrial-sites/:Factory_ID"} element={<BasicFactoryTemplate />} />
                <Route path={"/data-explorer"} element={<DataExplorerPage />} />
                <Route path={"/industrial-stories"} element={<IndustrialStoriesPage />} />
                <Route path={"/map"} element={<MapPage />} />
                <Route path={"/about"} element={<AboutPage />} />
            </Routes>
        </Router>
    );
}

export default App;