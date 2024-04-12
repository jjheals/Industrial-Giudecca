// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/components/Title.css';

import FactoryHomepage from './pages/FactoryHomepage';
import Homepage from './pages/Homepage';
import BasicFactoryTemplate from './pages/BasicFactoryTemplate';
import DataExplorerPage from './pages/DataExplorerPage';
import AboutPage from './pages/AboutPage';
import HistoricalStoriesPage from './pages/HistoricalStoriesPage';
import StoryPage from './pages/StoryPage';
import "./i18n.js";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/industrial-sites" element={<FactoryHomepage />} />
                <Route path={"/industrial-sites/:Factory_ID"} element={<BasicFactoryTemplate />} />
                <Route path={"/data-explorer"} element={<DataExplorerPage />} />
                <Route path={"/historical-stories"} element={<HistoricalStoriesPage />} />
                <Route path={"/historical-stories/:Story_ID"} element={<StoryPage />} />
                <Route path={"/about"} element={<AboutPage />} />
            </Routes>
        </Router>
    );
}

export default App;