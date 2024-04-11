import Factory from './Factory.js';
import { queryFeatures, fetchAttachments } from '@esri/arcgis-rest-feature-service';
import { featureLayerServiceURLs } from './GlobalConstants.js';
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
    const serviceURL = featureLayerServiceURLs['Factory'];

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
function filterFeatureLayer(featureLayerDict, targetAttributeString, filterString, returnAttribute) { 
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

/** filterFeatureLayerTime(featureLayerDict, startYear, endYear, startYearCol, endYearCol)
 * @abstract Function that filters a feature layer to rows between a specified start and end date
 * @param {Dictionary} featureLayerDict - feature layer as dict to filter, in the format as returned by fetchFL()
 * @param {int} startYear - the minimum year as an int
 * @param {int} endYear - the maximum year as an int
 * @param {String} startYearCol - column name of the start year in the FL
 * @param {String} endYearCol - column name of the end year in the FL
 * @returns {Array [int]}
 */
function filterFeatureLayerRange(featureLayerDict, minVal, maxVal, startCol, endCol, targetAttribute, targetAttributeString, returnAttribute) { 
    let matchedFactoryIDs = [];

    // Filter first by ones that have dates
    let matchedFactories = featureLayerDict.filter(dict => 
        (dict.attributes[startCol]) && (dict.attributes[endCol]) 
    );

    // Now refine to be within the minVal and maxVal and match the targetAttribute
    matchedFactories = matchedFactories.filter(dict => 
        // Clause 1 & 2: checking whether the value range is completely contained within the target range (clause 1) 
        //               OR that the target range is completely contained within the value range (clause 2)
        (
            // Clause 1: After minVal AND before maxVal
            (dict.attributes[startCol] >= minVal) || (dict.attributes[endCol] <= maxVal) ||

            // Clause 2: Before minVal AND after maxVal 
            (dict.attribute[startCol] <= minVal) && (dict.attributes[endCol] >= maxVal)  
        ) &&    

        // Final clause: either not given a target attribute OR matches target attribute
        (!targetAttribute || (dict.attributes[targetAttribute] == targetAttributeString)) 
    );

    // Map the matched factory dicts to the factory IDs
    matchedFactories.map(factoryDict => { 
        matchedFactoryIDs.push(factoryDict.attributes[returnAttribute]);
    });

    return matchedFactoryIDs;
}

function filterFeatureLayerDualRange(featureLayerDict, minVal, maxVal, startCol, endCol, targetAttribute, minTargetAttribute, maxTargetAttribute, returnAttribute) { 
    let matchedFactoryIDs = [];

    // Filter first by ones that have dates
    let matchedFactories = featureLayerDict.filter(dict => 
        (dict.attributes[startCol]) && (dict.attributes[endCol]) 
    );

    // Now refine to be within the minVal and maxVal and match the targetAttribute
    matchedFactories = matchedFactories.filter(dict => 
        (dict.attributes[startCol] >= minVal) &&                    // After minVal
        (dict.attributes[endCol] <= maxVal) &&                      // Before maxVal
        (dict.attributes[targetAttribute] >= minTargetAttribute) && // Greater than minTargetAttribute
        (dict.attributes[targetAttribute] <= maxTargetAttribute)    // Less than maxTargetAttribute
    );

    // Map the matched factory dicts to the factory IDs
    matchedFactories.map(factoryDict => { 
        matchedFactoryIDs.push(factoryDict.attributes[returnAttribute]);
    });

    return matchedFactoryIDs;
}

export { 
    latLongToPixel,
    fetchAllFactoryImages, 
    sDPTFetchFactoriesFL,
    fetchFL,
    filterFeatureLayer,
    filterFeatureLayerRange,
    filterFeatureLayerDualRange
};
