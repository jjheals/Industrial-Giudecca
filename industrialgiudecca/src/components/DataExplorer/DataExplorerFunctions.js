
import DataExplorerResultsTable from "./DataExplorerResultsTable";
import ReactDOM from 'react-dom';

import { nonRelationalColumns, productRelationColumns } from "./DataExplorerConstants";

/** setResultsTable(results, lof, isRelational)
 * @abstract 
 * @param {Array[int]} results - list of Factory_IDs to display information for
 * @param {Array[String]} lof - list of the filters that were used 
 * @param {Boolean} isRelational - bool whether the resulting table is a relational table (true) or an entity table (false)
 * @returns 
 */
export function setResultsTable(results, lof, featureLayers, formData) { 

    // Check if this is a relational table or not
    const isRelational = lof.includes('Product');

    // Get the results table container element to populate it 
    const resultsTableContainerElm = document.getElementById('results-table-container');

    // Check that resultsTableContainerElm actually exists to avoid errors 
    if(!resultsTableContainerElm) return [];

    // Init the keys as empty 
    let theseKeys = [];

    // Check thet featureLayers were given incase an error causes the function to be called multiple times
    if(!featureLayers) {
        console.log('no FLs given - rendering empty table');
        renderResultsTable(resultsTableContainerElm, theseKeys, []);
    }
    
    // Base case: No results are given
    if(results.length == 0) {
        console.log('no results given - rendering empty table');
        renderResultsTable(resultsTableContainerElm, theseKeys, []);
    }

    /* Format the table based on whether it is a relational query or not
     * 
     * NOTE: featureLayers will always contain at LEAST 
     * - factoriesFL ('Factory') 
     * - buildingFL ('Building')
     * - employmentOverTimeFL ('Employment')
     * - factoryAtBuildingFL ('Factory_At_Building')
     */
    const factoryFL = featureLayers['Factory'];
    const buildingFL = featureLayers['Building'];
    const employmentOverTimeFL = featureLayers['Employment'];
    const factoryAtBuildingFL = featureLayers['Factory_At_Building'];    

    /* Get the necessary data for each factory 
     * - English_Name
     * - Italian_Name 
     * - Current_Purpose
     * - Opening_Year
     * - Closing_Year
     * 
     * 
     * NOTE: Opening/Closing years are only displayed in non-relational tables, but for the sake of not going thru and iterating
     * over the results again, we can just find them here at the same time. The added time complexity is negligible. 
     */
    const factoriesDictionary = {};
    results.map(fid => { 
        // Get the factory details
        const thisFactory = factoryFL.find(factory => factory.attributes['Factory_ID'] === fid).attributes;
        
        // Get the current purpose using factoryAtBuildingFL and buildingFL
        const thisCurrentPurpose = findCurrentPurpose(buildingFL, factoryAtBuildingFL, thisFactory);

        // Get the location data if available
        const locationData = getLocationData(fid, buildingFL, factoryAtBuildingFL);

        // Get the min/max employment
        let thisMinEmployment = null;
        let thisMaxEmployment = null;
        const thisFactoryEmploymentData = employmentOverTimeFL.filter(r => r.attributes['Factory_ID'] === fid);

        // Check if there were results for employment data. If not, use null values
        if(thisFactoryEmploymentData.length > 0) { 
            const filteredEmpData = findMinMaxEmployment(thisFactoryEmploymentData, fid);
            thisMinEmployment = filteredEmpData.min;
            thisMaxEmployment = filteredEmpData.max;
        }

        factoriesDictionary[fid] = { 
            'English_Name': thisFactory.English_Name, 
            'Italian_Name': thisFactory.Italian_Name, 
            'Current_Purpose': thisCurrentPurpose,
            'Min_Employment': thisMinEmployment,
            'Max_Employment': thisMaxEmployment,
            'Opening_Year': thisFactory.Opening_Year,
            'Closing_Year': thisFactory.Closing_Year,
            'Latitude': locationData.lat,           
            'Longitude': locationData.long  
        }
    });

    // Render a non-relational table
    if(!isRelational) { 
        theseKeys = nonRelationalColumns;

        // NOTE: in a non-relational table, each row is a factory 
        let rows = results.map(fid => {
            const locationData = getLocationData(fid, buildingFL, factoryAtBuildingFL);

            return [
                fid,
                factoriesDictionary[fid]['English_Name'],    // English_Name
                factoriesDictionary[fid]['Italian_Name'],    // Italian_Name
                factoriesDictionary[fid]['Opening_Year'],    // Opening_Year
                factoriesDictionary[fid]['Closing_Year'],    // Closing_Year
                factoriesDictionary[fid]['Min_Employment'],  // Min employment
                factoriesDictionary[fid]['Max_Employment'],  // Max employment
                factoriesDictionary[fid]['Current_Purpose'], // Current purpose 
                locationData.lat,                            // Latitude
                locationData.long                            // Longitude
            ];
        });

        renderResultsTable(resultsTableContainerElm, theseKeys, rows);
    }

    // Render a relational table
    // NOTE: relational tables are used if the filters contain a relational filter, i.e. "Product" or "Employment"
    else { 

        // Check if a product filter was given 
        if(lof.includes('Product')) { 
            let rows = [];
            const productOverTimeFL = featureLayers['Product'];
            theseKeys = productRelationColumns;

            // Get the product data for each factory
            results.map(fid => { 
                const theseProducts = getProductData(productOverTimeFL, fid, formData.Product, formData.Min_Year, formData.Max_Year);
                const locationData = getLocationData(fid, buildingFL, factoryAtBuildingFL);
                
                // Iterate over the results and push each new row to rows
                theseProducts.map(product => { 
                    let thisRow = [
                        fid,
                        factoriesDictionary[fid]['English_Name'],
                        factoriesDictionary[fid]['Italian_Name'],
                        factoriesDictionary[fid]['Min_Employment'],
                        factoriesDictionary[fid]['Max_Employment'],
                        product.attributes['Year_Started'],
                        product.attributes['Year_Stopped'],
                        product.attributes['Product_en'],
                        locationData.lat,                            // Latitude
                        locationData.long                            // Longitude
                    ];
                    rows.push(thisRow);
                })
            });

            // Render the relational table
            renderResultsTable(resultsTableContainerElm, theseKeys, rows);
        }   
    }
}

/** renderResultsTable(resultsTableContainerElm, keys, rows)
 * @abstract Function that renders a DataExplorerResultsTable in the given resultsTableContainerElm with the 
 * provided keys and rows 
 * @param { Element } resultsTableContainerElm - Parent container for the DataExplorerResultsTable
 * @param { Array[String] } keys - List of keys to use as the table column headers
 * @param { Array[Array] } rows - List of Array to use as the rows (i.e. each entity) 
 * @returns { null } Returns null but renders the table in the given container element 
 */
function renderResultsTable(resultsTableContainerElm, keys, rows) { 
    // Create the DataExplorerResutlsTable elememt
    const dataExplorerResultsTable = <DataExplorerResultsTable d={{ 'keys': keys, 'rows': rows }} />

    ReactDOM.unmountComponentAtNode(resultsTableContainerElm);              // Clear the table from previous queries
    ReactDOM.render(dataExplorerResultsTable, resultsTableContainerElm);    // Render the component on the page
}

/** findMinMaxEmployment(employmentDataFL, fid)
 * @abstract Finds the min and max employment for a given factory ID
 * @param { Array[dict] } employmentDataFL - Feature layer for employment in the format [ { attributes: {...} }, { attributes: {...} }, ... ]
 * @param { int } fid - Factory ID as an integer
 * @returns { dict } A dictionary in the format { min: [int | null], max: [int | null] }
 */
function findMinMaxEmployment(employmentDataFL, fid) { 
    // Init thisMin and thisMax to null 
    let thisMin = null;
    let thisMax = null;

    // Iterate over employmentDataFL to find the min and max employment for this factory
    employmentDataFL.map(empRow => { 
        if(empRow.attributes['Factory_ID'] == fid) { 
            const thisEmp = empRow.attributes['Employment'];

            if(!thisMin || thisEmp < thisMin) thisMin = thisEmp;
            if(!thisMax || thisEmp > thisMax) thisMax = thisEmp;
        }
    });

    // Return the final dictionary
    return { 'min': thisMin, 'max': thisMax };
}

/** findCurrentPurpose()
 * @abstract Function that takes in a Building FL and a Factory At Building FL and a factory as dict and finds the 
 * current purpose for the building that the factory resided at. 
 * @param { Array[dict] } buildingsFL - FL for Building entity in the format [ { attributes: {...} }, { attributes: {...} }, ... ]
 * @param { Array[dict] } factoryAtBuildingFL - FL for the relationship between a Factory and Building in the format [ { attributes: {...} }, { attributes: {...} }, ... ]
 * @param { dict } factoryDict - Factory formatted as a dictionary 
 */
function findCurrentPurpose(buildingsFL, factoryAtBuildingFL, factoryDict) { 
    // Init thisCurrPurpose as null
    let thisCurrPurpose = null;

    // Extract the Factory_ID and search for the building the factory was at 
    const thisFactoryID = factoryDict['Factory_ID'];
    const factoryAtBuildingMatch = factoryAtBuildingFL.find(dict => dict.attributes['Factory_ID'] === thisFactoryID);

    try { 
        // Get the building ID
        const thisBuildingID = factoryAtBuildingMatch.attributes['Building_ID'];

        // Throw error for the catch statement to handle if the Building ID doesn't exist
        if(!thisBuildingID) throw new Error();

        // Extract the current purpose for this building 
        thisCurrPurpose = buildingsFL.find(dict => dict.attributes['Building_ID'] === thisBuildingID).attributes['Now_Used_For'];
    } catch {}

    return thisCurrPurpose;
}

/** getProductData(productOverTimeFL, fid, startYear, endYear)
 * @abstract Function that will retrieve the product information for a given factory ID (fid) from the provided FL (productOverTimeFL) 
 * over the specified period of time
 * @param {*} productOverTimeFL  - Feature layer for product in the format [ { attributes: {...} }, { attributes: {...} }, ... ]
 * @param {*} fid - Factory ID of interest
 * @param {*} startYear - Year to start looking for products
 * @param {*} endYear - Year to stop looking for products
 * @returns {*}
 */
function getProductData(productOverTimeFL, fid, product, startYear, endYear) { 

    // If not given a start and end year, then set startYear as 0 and endYear as a max value (999999) 
    if(!startYear) startYear = 0;
    if(!endYear) endYear = 999999;

    // Filter first by ones that have dates and match the factory ID
    let matchedRows = productOverTimeFL.filter(dict => 
        (dict.attributes['Year_Started']) && (dict.attributes['Year_Stopped']) &&   // Have years
        (dict.attributes['Factory_ID'] == fid) &&                                   // Match factory ID
        (dict.attributes['Product_en'] == product)                                     // Match product
    );

    // Now refine to be within the minVal and maxVal and match the targetAttribute
    matchedRows = matchedRows.filter(dict => 
        // Clause 1 & 2: checking whether the value range is completely contained within the target range (clause 1) 
        //               OR that the target range is completely contained within the value range (clause 2)
        (
            // Clause 1: After minVal AND before maxVal
            (dict.attributes['Year_Started'] >= startYear) || (dict.attributes['Year_Stopped'] <= endYear) ||

            // Clause 2: Before minVal AND after maxVal 
            (dict.attributes['Year_Started'] <= startYear) && (dict.attributes['Year_Stopped'] > endYear)  
        )
    );

    return matchedRows;
}

function getLocationData(fid, buildingFL, factoryAtBuildingFL) { 
    const factoryAtBuildingMatch = factoryAtBuildingFL.find(dict => dict.attributes['Factory_ID'] === fid);
    let returnDict = { lat: 0, long: 0 }
    try { 
        // Get the building ID
        const thisBuildingID = factoryAtBuildingMatch.attributes['Building_ID'];

        // Throw error for the catch statement to handle if the Building ID doesn't exist
        if(!thisBuildingID) throw new Error();

        // Extract the current purpose for this building 
        const thisBuilding = buildingFL.find(dict => dict.attributes['Building_ID'] === thisBuildingID).attributes;
        returnDict.lat = thisBuilding['Latitude_'];
        returnDict.long = thisBuilding['Longitude_'];
    } catch {}

    return returnDict;
}