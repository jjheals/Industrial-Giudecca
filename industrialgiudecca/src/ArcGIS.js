import Factory from './Factory.js';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { queryFeatures, fetchAttachments } from '@esri/arcgis-rest-feature-service';
import { mapFactoryIDToObjectIDURL } from './GlobalConstants.js';


/** fetchFactoriesFL(serviceURL) 
 * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given
 * @param {string} serviceURL - ArcGIS service endpoint
 * @param {string} apiToken - API acccess token 
 * @returns {Array} array of Factory objects
 */
async function fetchFactoriesFL(serviceURL, apiToken, filter='') { 
    try {
        // Authentication for ArcGIS API
        const authentication = ApiKeyManager.fromKey(apiToken);
        const response = await queryFeatures({
            url: serviceURL,
            authentication,
            where: filter
        });

        // Process the response and convert features into factories
        const factories = response.features.map(feature => {
            let factory = new Factory(feature.attributes, feature.geometry);
            factory.getCoverImageURL();
            return factory;
        });
        
        // Return the list of factories
        return factories;

    } catch (error) {
        console.error('Error fetching factories:', error);
        return [];  // Return an empty array in case of error
    }
}

/** fetchAllFactoryImagse(serviceURL, apiToken)
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
function fetchAllFactoryImages(serviceURL) { 

    // Init empty return dict to contain { key : val } => { Factory_ID : attachmentURLs_Array }
    let attachmentsDict = {};

    // Get the FactoriesFL first to get all the factories
    fetchFactoriesFL(
        serviceURL,
    )
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

/** fetchFactoriesFL(serviceURL) 
 * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given
 * @param {string} serviceURL - ArcGIS service endpoint
 * @returns {Array} array of Factory objects
 */
async function sDPTFetchFactoriesFL(serviceURL, filter='') { 
    try {
        // Query the FL to get the factory attributes 
        const response = await queryFeatures({
            url: serviceURL,
            where: filter
        });

        // Wait for the response, then iterate over the factories 
        const factories = await Promise.all(response.features.map(async feature => {
            const factory = new Factory(feature.attributes, {'x':0, 'y':0});

            // Get the OBJECTID for this factory
            const resp = await queryFeatures({
                url: `${mapFactoryIDToObjectIDURL}`,
                where: `Factory_ID = ${factory.Factory_ID}`
            });

            // Iterate over the features of the response, i.e. the first element since there is only one,
            // and set the factory's OBJECTID if it exists; if it does not exist, then this factory does 
            // not have any associated images
            resp.features.forEach(f => {
                try { factory.OBJECTID = f.attributes.OBJECTID; } 
                catch { factory.OBJECTID = -1; }
            });

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

export { fetchFactoriesFL, fetchAllFactoryImages, sDPTFetchFactoriesFL };