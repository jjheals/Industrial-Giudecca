// src/ArcGIS.js

/** 
 * @abstract This file contains functions related to ArcGIS. See each function for a detailed description of the parameters, methods, and 
 * return values. 
 * 
 * @exports
 *      @function latLongToPixel
 *      @function fetchFactoriesFL
 *      @function fetchFL
 *      @function filterFeatureLayer
 *      @function filterFeatureLayer
 *      @function formatTimeperiodString
 *      @function formatImageSource
 */
import { queryFeatures } from '@esri/arcgis-rest-feature-service';              // Method for retrieving feature layers from ArcGIS 
import Factory from './Factory.js';                                             // Custom Factory object (class)
import { 
    featureLayerServiceURLs,  // Dictionary containing the URLs for all feature layers
    minLong,                  // Minimum longitude on the maps for calculations
    minLat,                   // Minimum latitude on the maps for calculations
    deltaLat,                 // Change in latitude on the maps for calculations
    deltaLong                 // Change in longitude on the maps for calculations
} from './GlobalConstants.js';                 

/** latLongToPixel(lat, long) 
 * @abstract Converts latitude and longitude coordinates to pixels on a map using the min/max lat/long 
 * mapWidth/mapHeight, all defined in src/GlobalConstants.js
 * 
 * @param { float } lat 
 * @param { float } long 
 * @returns { dict } a dictionary containing the x and y coordinates on the map
 * 
 * @example 
 * import latLongToPixel from 'path/to/ArcGIS.js' 
 * 
 * const result = latLongToPixel(23.23456, -12.45613);
 * const x = result.x;
 * const y = result.y; 
 */
export function latLongToPixel(lat, long, mapWidth, mapHeight) {    
    
    const thisLongOffset = long - minLong;  // Offset from the left of the map in DEGREES
    const thisLatOffset = lat - minLat;     // Offset from the top of the map in DEGREES
    
    // Convert the long/lat offsets (degreees) into pixels 
    const pixelX = (thisLongOffset / deltaLong) * mapWidth;
    const pixelY = mapHeight - (thisLatOffset / deltaLat) * mapHeight;

    return { x: pixelX, y: pixelY };
}

/** fetchFactoriesFL(filters) 
 * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given; basically the same functionality as fetchFL, but returns the
 * results as an Array of Factory objects instead of dictionaries, and calls factory.getFactoryCoords() on each object
 * @param { String } filters - SQL style filters to filter the query 
 * @returns { Array[Factory] } array of Factory objects
 */
export async function fetchFactoriesFL(flFilters) { 

    // Query the factories FL to get the factory attributes         
    const response = await fetchFL(featureLayerServiceURLs['Factory'], flFilters);

    // Wait for the response, then iterate over the factories 
    const factories = await Promise.all(response.map(async feature => {
        const factory = new Factory(feature.attributes);    // Create a new Factory object using this feature
        await factory.getFactoryCoords();                   // Get the coords for this factory
        return factory;
    }));

    // Return the populated array         
    return factories;
}

/** fetchFL(serviceURL, filters)
 * @abstract Function that fetches the given feature layer (serviceURL) with the given filters (filters)
 * @param { String } serviceURL - ArcGIS service URL for the FL
 * @param { String }filters - string for the filters, e.g. "Factory_ID = 5 AND Opening_Year > 2000"
 * @returns { Array[Object] } in the format [ { 'attributes' : {...} }, { 'attributes' : {...} }, ... ] 
 * 
 * @example 
 * import { fetchFL } from 'path/to/ArcGIS.js';
 * 
 * const featureLayer = await fetchFL('http://service.arcgis.com/some/service/url/0', 'Factory_ID = 5');
 * console.log(featureLayer);
 */
export async function fetchFL(serviceURL, filters) { 

    // Use the ESRI/ArcGIS primitive queryFeatures to fetch the feature layer 
    const response = await queryFeatures({
        url: serviceURL,
        where: filters
    });

    // Parse the results and create features from it
    const results = await Promise.all(response.features.map(feature => { 
        return feature;
    }));

    // Return the results
    return results;
}

/** filterFeatureLayer(featureLayerDict, targetAttributeString, filterString)
 * @abstract Function that will filter a given FeatureLayer for a target attribute STRING
 * @param { dict } featureLayerDict - feature layer as dict to filter, in the format as returned by fetchFL()
 * @param { String } targetAttributeString - target attribute as a string
 * @param { String } filterString - string to search for
 * @returns { Array[int] }
 */
export function filterFeatureLayer(featureLayerDict, targetAttributeString, filterString, returnAttribute) { 
    let matchedIDs = [];

    const matchedFeatures = featureLayerDict.filter(dict => 
        (dict.attributes[targetAttributeString]) && 
        dict.attributes[targetAttributeString].toLowerCase().includes(filterString.toLowerCase())
    );
    matchedFeatures.map(dict => { 
        matchedIDs.push(dict.attributes[returnAttribute]);
    });

    return matchedIDs;
}

/** filterFeatureLayerRange(featureLayerDict, startYear, endYear, startYearCol, endYearCol)
 * @abstract Function that filters a feature layer to rows between a specified start and end date
 * @param { dict } featureLayerDict - feature layer as dict to filter, in the format as returned by fetchFL()
 * @param { int } minVal - the minimum year as an int
 * @param { int } maxVal - the maximum year as an int
 * @param { String } startCol - column name containing the value to compare to minVal (i.e. such that featureLayerDict[startCol] >= minVal)
 * @param { String } endCol - column name containing the value to compare to minVal (i.e. such that featureLayerDict[endCol] <= maxVal)
 * @param { String } targetAttribute - column name of the attribute to filter by (i.e. such that featureLayerDict[targetAttribute == targetAttributeString])
 * @param { String || int } targetAttributeString - the string or int to match (i.e. such that featureLayerDict[targetAttribute == targetAttributeString])
 * @param { String } returnAttribute - column name for the attribute to return (should be a unique identifier of the objects in featureLayerDict, e.g. Factory_ID)
 * @returns { Array [int || String] } - an array containing the returnAttribute values of the matches (e.g. Building_ID, Factory_ID, etc.)
 */
export function filterFeatureLayerRange(featureLayerDict, minVal, maxVal, startCol, endCol, targetAttribute, targetAttributeString, returnAttribute) { 
    let matchedFactoryIDs = [];

    // Filter first by ones that have dates
    let matchedFactories = featureLayerDict.filter(dict => 
        (dict.attributes[startCol]) && (dict.attributes[endCol]) 
    );

    // Now refine to be within the minVal and maxVal and match the targetAttribute
    matchedFactories = matchedFactories.filter(dict => 
        (dict.attributes[startCol] && dict.attributes[endCol]) && 

        // Clause 1 & 2: checking whether the value range is completely contained within the target range (clause 1) 
        //               OR that the target range is completely contained within the value range (clause 2)
        (
            (dict.attributes[startCol] >= minVal) && (dict.attributes[endCol] <= maxVal) ||     // Clause 1: After minVal AND before maxVal
            (dict.attributes[startCol] <= minVal) && (dict.attributes[endCol] >= maxVal)        // Clause 2: Before minVal AND after maxVal 
        ) ||    

        // Final clause: either not given a target attribute OR matches target attribute
        (!targetAttribute || (dict.attributes[targetAttribute] == targetAttributeString)) 
    );
    
    // Map the matched factory dicts to the factory IDs
    matchedFactories.map(factoryDict => { 
        matchedFactoryIDs.push(factoryDict.attributes[returnAttribute]);
    });

    return matchedFactoryIDs;
}

/** formatTimeperiodString(timeperiodDict)
 * @abstract Formats a given timeperiod (as dict) into a string to appear on the screen with the start/end dates and the title
 * @param { Object } timeperiodDict - timeperiod as a dict containing at least an "End_Date", "Start_Date", and "Title_{lang}" (e.g. Title_en || Title_it)
 * @param { String[2] } lang - target language, e.g. "en" or "it"
 * @returns { String } the timeperiod formatted as a string in the format "([Start_Date]-[End_Date]) [Title_]"
 */
export function formatTimeperiodString(timeperiodDict, lang) {     
    if(timeperiodDict['Start_Date'] == timeperiodDict['End_Date']) { 
        return `(${timeperiodDict['Start_Date']}) ${timeperiodDict[`Title_${lang}`]}`;
    } else { 
        return `(${timeperiodDict['Start_Date']}-${timeperiodDict['End_Date']}) ${timeperiodDict[`Title_${lang}`]}`;
    }
}

/** formatImageSource(imgDict) 
 * @abstract Formats the citations for an image 
 * @param { Object } imgDict - the image details as a dictionary returned by the Photo_Sources FL in GlobalConstants.js
 * @returns { String } a string in the format "[Source_Name] ([ID_Inventory_Num]"
 */
export function formatImageSource(imgDict) { 
    let s = '';
    s += imgDict['Source_Name'];
    if(imgDict['ID_Inventory_Num']) s += ` (${imgDict['ID_Inventory_Num']})`;
    return s;
}

