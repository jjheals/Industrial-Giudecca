import Factory from './Factory.js';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';

/** fetchFactoriesFL(serviceURL) 
 * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given
 * @param {string} serviceURL 
 * @returns {dict} dictionary of the { features, attributes }
 */
async function fetchFactoriesFL(serviceURL, apiToken) { 
    try {
        // Authentication for ArcGIS API
        const authentication = ApiKeyManager.fromKey(apiToken);
        const response = await queryFeatures({
            url: serviceURL,
            authentication
        });

        // Process the response and convert features into factories
        const factories = response.features.map(feature => {
            let factory = new Factory(feature.attributes, feature.geometry);
            factory.getCoverImageURL(apiToken);
            return factory;
        });
        
        // Return the list of factories
        return factories;

    } catch (error) {
        console.error('Error fetching factories:', error);
        return [];  // Return an empty array in case of error
    }
}

export default fetchFactoriesFL;