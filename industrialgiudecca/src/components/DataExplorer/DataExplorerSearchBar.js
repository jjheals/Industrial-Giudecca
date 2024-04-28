// src/components/DataExplorer/DataExplorerSearchBar.js

/**  { Component } DataExplorerSearchBar
 *
 * @abstract The DataExplorerSearchBar is a component that is displayed on the DataExplorer Page. The search bar provides the filters and 
 * search functions for the DataExplorer. The fields correspond to the Entities and Relationships in the ArcGIS database.  
 * 
 */
import React, { useState, useEffect, useContext } from 'react';
import '../../css/DataExplorer.css';

import { featureLayerServiceURLs, intersection } from '../../GlobalConstants.js';
import { fetchFL, filterFeatureLayer, filterFeatureLayerRange, filterFeatureLayerDualRange } from '../../ArcGIS.js';
import { setResultsTable, getProductCategories, getCurrPurposes } from './DataExplorerFunctions.js';
import { LanguageContext } from '../../context/LanguageContext.js';

const DataExplorerSearchBar = () => {
    const [ products, setProducts ] = useState(['test']);
    const [ purposes, setPurposes ] = useState(['test']);
    const { t, language } = useContext(LanguageContext);  
    
    // Define state variables to track form data
    const [formData, setFormData] = useState({
        English_Name: '',
        Italian_Name: '',
        Product: '',
        Current_Purpose: '',
        Min_Employment: 0,
        Max_Employment: null,
        Min_Year: 0,
        Max_Year: null,
    });

    /** handleInputChange = (e) => {} 
     * @constant handleInputChange
     * @abstract Event handler to update the form data when input fields change
     * @param { Event } e
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    /** handleSubmit = (e) => {}
     * @constant handleSubmit
     * @abstract Event handler to handle the submission of a form, including making the necessary API calls
     * @param { Event } e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('submission');

        let isRelational = false;   // Flag to determine whether the returned table will be relational or not 
        let queriedFLs = {};         // Keep a dict of the feature layers we query so we can pass them to the resulting table at the end 

        // Query the FLs that are needed for every return table, i.e. Factory, Employment, Factory_At_Building, and Building 
        const factoryFL = await fetchFL(featureLayerServiceURLs['Factory']);
        const buildingFL = await fetchFL(featureLayerServiceURLs['Building']);
        const employmentOverTimeFL = await fetchFL(featureLayerServiceURLs['Employment_Over_Time']);
        const factoryAtBuildingFL = await fetchFL(featureLayerServiceURLs['Factory_At_Building']);

        queriedFLs['Factory'] = factoryFL;
        queriedFLs['Building'] = buildingFL;
        queriedFLs['Employment'] = employmentOverTimeFL;
        queriedFLs['Factory_At_Building'] = factoryAtBuildingFL;

        /* matchedFactoryIDs =: Dict containing [ key : val ] => [ filter_name : matched_factory_ids ]        
         *  - Each filter will be a key containing a value that is an array of the matched factory IDs for that filter
         *  - After each filter is applied, the INTERSECTION of all values in the dictionary will be taken to determine the
         *    factory IDs that match every filter 
         *  
         * NOTE: throughout the filtering process, if a filter returns no results, then the filtering is immediately stopped and 
         * "No Results Found" is returned to the user
         */
        let matchedFactoryIDs = {};
        const theseFilters = Object.keys(formData).filter(filter => formData[filter]);

        console.log('theseFilters');
        console.log(theseFilters);

        // Base case: If not given any filters, then we just want every factory
        if(theseFilters.length == 0) { 
            console.log('theseFilers.length == 0');
            console.log('getting all factories');

            const allFactoryIDs = factoryFL.map(dict => { return dict.attributes.Factory_ID; });            
            setResultsTable(allFactoryIDs, [], queriedFLs, formData, language);
            return;
        }

        // -- Filter 1: English and/or italian name -- // 
        if(theseFilters.includes('English_Name')) { 
            matchedFactoryIDs['English_Name'] = filterFeatureLayer(factoryFL, 'English_Name', formData.English_Name, 'Factory_ID');

            // NOTE: already added factoryFL to queriedFLs
            if(matchedFactoryIDs['English_Name'].length == 0) {
                // Filter given but no matches found, so we can stop searching since this is an AND query
                setResultsTable([], [], queriedFLs, formData, language);
                return;
            }
        }

        if(theseFilters.includes('Italian_Name')) { 
            matchedFactoryIDs['Italian_Name'] = filterFeatureLayer(factoryFL, 'Italian_Name', formData.Italian_Name, 'Factory_ID');

            // NOTE: already added factoryFL to queriedFLs
            if(matchedFactoryIDs['Italian_Name'].length == 0) {
                // Filter given but no matches found, so we can stop searching since this is an AND query
                setResultsTable([], [], queriedFLs, formData, language);
                return;
            }
        }

        // -- Filter 2: Product over time -- //
        if(theseFilters.includes('Product')) { 
            const productOverTimeFL = await fetchFL(featureLayerServiceURLs['Product_Over_Time']);
            isRelational = true;

            // Add Product FL to queriedFLs
            queriedFLs['Product'] = productOverTimeFL;

            // Check if a time frame was also given 
            if(theseFilters.includes('Min_Year') || theseFilters.includes('Max_Year')) { 
                // Init minYear as 0 and maxYear as 9999 to capture the entire timeframe desired
                let minYear = 0;
                let maxYear = 9999;

                // Check if given a max and min year and set the values accordingly so the search captures the timeframe desired
                if(theseFilters.includes('Min_Year')) minYear = formData.Min_Year;
                if(theseFilters.includes('Max_Year')) maxYear = formData.Max_Year;

                const matchProductTimes = filterFeatureLayerRange(
                    productOverTimeFL, 
                    minYear, 
                    maxYear, 
                    'Year_Started', 
                    'Year_Stopped', 
                    'Product', 
                    formData.Product,
                    'Factory_ID'
                );

                matchedFactoryIDs['Product'] = matchProductTimes;

            } else { 
                const matchedProducts = filterFeatureLayer(productOverTimeFL, `Product_Cat_${language}`, formData.Product, 'Factory_ID');
                matchedFactoryIDs['Product'] = matchedProducts;
            }

            if(matchedFactoryIDs['Product'].length == 0) {
                // Filter given but no matches found, so we can stop searching since this is an AND query
                setResultsTable([], [], queriedFLs, formData, language);
                return;
            }
        }

        // -- Filter 3: Current Purpose -- // 
        if(theseFilters.includes('Current_Purpose')) { 

            // Filter for building current purpose
            const matchBuildingCurrPurpose = filterFeatureLayer(buildingFL, 'Now_Used_For', formData.Current_Purpose, 'Building_ID');

            // Check for results 
            if(matchBuildingCurrPurpose.length == 0) {
                // Filter given but no matches found, so we can stop searching since this is an AND query
                setResultsTable([], [], queriedFLs, formData, language);
                return;
            }

            // Map the building IDs to the factories that operated at that building
            // Get the factoryAtBuildingFL 
            // Construct the "where" filter for each building IDs
            let buildingIDFilter = '';
            for(let i = 0; i < matchBuildingCurrPurpose.length; i++) {
                buildingIDFilter += `Building_ID = ${matchBuildingCurrPurpose[i]} or `;
            }

            // Remove the trailing " or " 
            buildingIDFilter = buildingIDFilter.slice(0, -4);
            const factoryAtBuildingFL2 = await fetchFL(featureLayerServiceURLs['Factory_At_Building'], buildingIDFilter);

            // Extract the factory IDs from factoryAtBuildingFL and add them to matchedFactoryIDs at the "Current_Purpose" key
            const currPurposeMatchedFactoryIDs = factoryAtBuildingFL2.map(dict => { return dict.attributes.Factory_ID; })
            matchedFactoryIDs['Current_Purpose'] = currPurposeMatchedFactoryIDs;
        } 

        // -- Filter 4: Employment -- //
        if(theseFilters.includes('Max_Employment') || theseFilters.includes('Min_Employment')) { 

            // Check if a time frame was also given 
            if(theseFilters.includes('Min_Year') || theseFilters.includes('Max_Year')) { 
                // Init minYear as 0 and maxYear as 9999 to capture the entire timeframe desired
                let minYear = 0;
                let maxYear = 9999;

                // Check if given a max and min year and set the values accordingly so the search captures the timeframe desired
                if(theseFilters.includes('Min_Year')) minYear = formData.Min_Year;
                if(theseFilters.includes('Max_Year')) maxYear = formData.Max_Year;

                // Init minEmployment as 0 and maxEmployment as 9999999 to capture the entire employment range desired
                let minEmployment = 0;
                let maxEmployment = 999999;

                if(theseFilters.includes('Min_Employment')) minEmployment = formData.Min_Employment;
                if(theseFilters.includes('Max_Employment')) maxEmployment = formData.Max_Employment;

                const matchEmploymentTimes = filterFeatureLayerDualRange(
                    employmentOverTimeFL, 
                    minYear, 
                    maxYear, 
                    'Year', 
                    'Year', 
                    'Employment',
                    minEmployment,
                    maxEmployment,
                    'Factory_ID'
                );

                matchedFactoryIDs['Employment_Over_Time'] = matchEmploymentTimes;

            } else { 
                const matchedEmployment = filterFeatureLayerRange(employmentOverTimeFL, formData.Min_Employment, formData.Max_Employment, 'Employment', 'Employment', 'Factory_ID');
                matchedFactoryIDs['Employment_Over_Time'] = matchedEmployment;
            }

            if(matchedFactoryIDs['Employment_Over_Time'].length == 0) {
                // Filter given but no matches found, so we can stop searching since this is an AND query
                setResultsTable([], [], queriedFLs, formData, language);
                return;
            }
            
        }

        // -- Filter 5: Min_Year & Max_Year -- //
        /* NOTE: only to be ran if Product, Employment are not given, since those already include the min and max years
         * - If ran, min and max years correspond to the factory's operating dates
         * - If Product or Employment are given as filters, then do not run */
        if( 
            (theseFilters.includes('Min_Year') || theseFilters.includes['Max_Year']) &&     // Filters include Min_Year OR Max_Year
            !(theseFilters.includes('Product') || theseFilters.includes('Employment'))      // Filters DO NOT include Product NOR Employment
        ) { 
            // Init minYear as 0 and maxYear as 9999 to capture the entire timeframe desired
            let minYear = 0;
            let maxYear = 9999;

            // Check if given a max and min year and set the values accordingly so the search captures the timeframe desired
            if(theseFilters.includes('Min_Year')) minYear = formData.Min_Year;
            if(theseFilters.includes('Max_Year')) maxYear = formData.Max_Year;

            matchedFactoryIDs['Years'] = filterFeatureLayerRange(factoryFL, minYear, maxYear, 'Opening_Year', 'Closing_Year', '', '', 'Factory_ID');
            if(matchedFactoryIDs['Years'].length == 0) {
                // Filter given but no matches found, so we can stop searching since this is an AND query
                setResultsTable([], [], queriedFLs, formData, language);
                return;
            }
        }

        // -- DONE WITH FILTERS -- // 

        // Now intersect all the arrays in matchedFactoryIDs to get the factory IDs that match every parameter
        const allMatches = Object.values(matchedFactoryIDs);

        // Base case: no matches were found (should never happen, but to prevent future errors)
        if(allMatches.length == 0) setResultsTable([], [], queriedFLs, formData, language); 

        // Edge case: only one filter was used
        else if(allMatches.length == 1) setResultsTable(allMatches[0], theseFilters, queriedFLs, formData, language);
    
        // Default case: more than one filter used, so intersect all of them to get the final AND result
        else { 
            // Init intersectMatches as the first array in allMatches, so that we can keep intersecting intersectMatches with itself
            let intersectMatches = allMatches[0];

            // Iterate over the remaining matches arrays and continually intersect them
            for(let i = 1; i < allMatches.length; i++) intersectMatches = intersection(intersectMatches, allMatches[i]);

            // DONE
            setResultsTable(intersectMatches, theseFilters, queriedFLs, formData, language);
            return;
        }
    };

    // useEffect => dynamically pull all possible products AND purposes from the DB to populate the options on the sheet
    useEffect(() => { 
        async function getProducts() { setProducts((await getProductCategories(language)).sort()); }
        async function getPurposes() { setPurposes((await getCurrPurposes()).sort()); }
        getProducts();
        getPurposes();
    }, [language]);

    return (
        <div className='de-search-bar'>
            <form id='de-search-form' onSubmit={handleSubmit}>

                {/* Row 1 of inputs */}
                <div className='de-search-bar-row'>
                    <div className='input-container'><input type='text' className='de-search-input' name='English_Name' placeholder={ t('factoryNameEnglish') } onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='text' className='de-search-input' name='Italian_Name' placeholder={ t('factoryNameItalian') } onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Min_Employment' placeholder={ t('minEmployment') } onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Min_Year' placeholder={ t('minYear') } onChange={handleInputChange}></input></div>
                </div>

                {/* Row 2 of inputs */}
                <div className='de-search-bar-row'>
                    <div className='input-container'>
                        <select className='de-search-input' name='Product' onChange={handleInputChange}>
                            <option className='de-select-option' value='' onChange={handleInputChange}>{ t('selectProduct') }</option>
                            {
                                products.map(product => { 
                                    return <option className='de-select-option' name={ product } value={ product } onChange={handleInputChange}>{ product }</option> 
                                })
                            }
                        </select>
                    </div>
                    <div className='input-container'>
                        <select className='de-search-input' name='Current_Purpose' onChange={handleInputChange}>
                            <option className='de-select-option' value='' onChange={handleInputChange}>{ t('selectCurrentPurpose') }</option>
                            {
                                purposes.map(purpose => { 
                                    return <option className='de-select-option' name={ 'Current_Purpose' } value={ purpose } onChange={handleInputChange}>{ purpose }</option> 
                                })
                            }
                        </select>
                    </div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Max_Employment' placeholder={ t('maxEmployment') } onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Max_Year' placeholder={ t('maxYear') } onChange={handleInputChange}></input></div>
                </div>

                {/* Row 3 for submit button */}
                <div className='de-search-bar-row'>
                    <button type='submit' className='de-search-submit'>{ t('search') }</button>
                </div>
            </form>
        </div>
    );
};

export default DataExplorerSearchBar;
