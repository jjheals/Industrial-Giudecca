import Factory from './Factory.js';
import { queryFeatures, fetchAttachments } from '@esri/arcgis-rest-feature-service';
import { sDPTFactoriesTableURL } from './GlobalConstants.js';
import { mapHeight, mapWidth, minLong, minLat, deltaLat, deltaLong } from './GlobalConstants.js';

/** latLongToPixel(lat, long) 
 * @abstract Converts latitude and longitude coordinates to pixels on a map using the min/max lat/long 
 * defined in GlobalConstants.js
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
function latLongToPixel(lat, long) {    
    
    const thisLongOffset = long - minLong;  // Offset from the left of the map in DEGREES
    const thisLatOffset = lat - minLat;     // Offset from the top of the map in DEGREES
    
    // Convert the long/lat offsets (degreees) into pixels 
    const pixelX = (thisLongOffset / deltaLong) * mapWidth;
    const pixelY = mapHeight - (thisLatOffset / deltaLat) * mapHeight;

    return { x: pixelX, y: pixelY };
}

/** fetchAllFactoryImages(serviceURL, apiToken)
 * @abstract fetch all the images for all factories in the FL at the given serviceURL
 * @param {string} serviceURL - URL to the ArcGIS service hosting the FL
 * @param {string} apiToken - API token with access to the serivceURL
 * @returns {dict} a dictionary containing { key : val } => { Factory_ID : attachmentURLs_Array }
 * 
 * @example
 * import fetchAllFactoryImages from 'path/to/ArcGIS.js'
 * 
 * fetchAllFactoryImages(apiKey)
 * .then(imgsDict => { 
 *    console.log('imgsDict');
 *    console.log(imgsDict);
 * });
 */
function fetchAllFactoryImages() { 

    // Init empty return dict to contain { key : val } => { Factory_ID : attachmentURLs_Array }
    let attachmentsDict = {};
    const serviceURL = sDPTFactoriesTableURL;

    // Get the FactoriesFL first to get all the factories
    sDPTFetchFactoriesFL(serviceURL)
    .then(factories => { 

        // Check if factories list is empty
        if(factories.length == 0) { 
            console.error('No factories retrieved.');
            return [];
        }

        // For each factory, fetch all the images
        factories.forEach(factory => {
            factory.getAllFactoryImageURLs()
            .then(attachmentURLs => {
                // Add these URLs to attachmentsDict at the key [Factory_ID]
                attachmentsDict[factory.Factory_ID] = attachmentURLs;
            });
        });
    });

    // Return final populated dict
    return attachmentsDict;
}

/** sDPTFetchFactoriesFL(serviceURL, filters) 
 * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given
 * @param {string} serviceURL - ArcGIS service endpoint
 * @param {string} filters - SQL style filters to filter the query 
 * @returns {Array} array of Factory objects
 */
async function sDPTFetchFactoriesFL(serviceURL, filters) { 
    try {
        // Query the factories FL to get the factory attributes         
        const response = await queryFeatures({
            url: serviceURL,
            where: filters
        });

        // Wait for the response, then iterate over the factories 
        const factories = await Promise.all(response.features.map(async feature => {

            // Create a new factory object using the OBJECTID
            const factory = new Factory(feature.attributes, {'x':0, 'y':0});
            await factory.getOBJECTID();
            await factory.getFactoryCoords();
            
            return factory;
        }));

        // Return the populated array 
        return factories;

    } catch (error) {
        // Return an empty array in case of error
        console.error('Error fetching factories:', error);
        return [];  
    }
}

/** fetchFL(serviceURL, filters)
 * @abstract
 * @param {string} serviceURL 
 * @param filters 
 * @returns 
 * 
 */
async function fetchFL(serviceURL, filters) { 
    
    // Query the factories FL to get the factory attributes 
    console.log(`querying with filters: ${filters}`);

    const response = await queryFeatures({
        url: serviceURL,
        where: filters
    });

    const results = await Promise.all(response.features.map(feature => { 
        return feature;
    }));

    return results;
}


/** filterFeatureLayer(featureLayerDict, targetAttributeString, filterString)
 * @abstract Function that will filter a given FeatureLayer for a target attribute STRING
 * @param {Dictionary} featureLayerDict - feature layer as dict to filter, in the format as returned by fetchFL()
 * @param {String} targetAttributeString - target attribute as a string
 * @param {String} filterString - string to search for
 * @returns {Array[int]}
 */
function filterFeatureLayer(featureLayerDict, targetAttributeString, filterString) { 
    let matchedFactoryIDs = [];

    const matchedFactories = featureLayerDict.filter(dict => 
        (dict.attributes[targetAttributeString]) && 
        dict.attributes[targetAttributeString].toLowerCase().includes(filterString.toLowerCase())
    );

    matchedFactories.map(factoryDict => { 
        matchedFactoryIDs.push(factoryDict.attributes.Factory_ID);
    });

    return matchedFactoryIDs;
}

/** filterFeatureLayerTime(featureLayerDict, startYear, endYear, startYearCol, endYearCol)
 * @abstract Function that filters a feature layer to rows between a specified start and end date
 * @param {Dictionary} featureLayerDict - feature layer as dict to filter, in the format as returned by fetchFL()
 * @param {int} startYear - the minimum year as an int
 * @param {int} endYear - the maximum year as an int
 * @param {String} startYearCol - column name of the start year in the FL
 * @param {String} endYearCol - column name of the end year in the FL
 * @returns {Array [int]}
 */
function filterFeatureLayerTime(featureLayerDict, startYear, endYear, startYearCol, endYearCol) { 
    let matchedFactoryIDs = [];

    // Filter first by ones that have dates
    let matchedFactories = featureLayerDict.filter(dict => 
        (dict.attributes[startYearCol]) && (dict.attributes[endYearCol])
    );

    // Now refine to be within the startYear and endYear
    matchedFactories = matchedFactories.filter(dict => 
        (dict.attributes[startYearCol] >= startYear) && (dict.attributes[endYearCol] <= endYear)
    );

    // Map the matched factory dicts to the factory IDs
    matchedFactories.map(factoryDict => { 
        matchedFactoryIDs.push(factoryDict.attributes.Factory_ID);
    });

    return matchedFactoryIDs;
}

export { 
    latLongToPixel,
    fetchAllFactoryImages, 
    sDPTFetchFactoriesFL,
    fetchFL,
    filterFeatureLayer,
    filterFeatureLayerTime
};
