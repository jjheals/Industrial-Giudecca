
// API key with access to the below serviceURL
const apiKey = '3NKHt6i2urmWtqOuugvr9XvrxixuU6m-ewJ8uoRtJdWT0FX_pBJoM2Q2n7TWUNic0N9GIMWsNtsOYPSWQWoELuWRXCwiE5OT9nQqNP0OdiDKZYDQX5pIvtJZX5RO4Z4V';

// URL endpoint to the service hosting the FactoriesFL
const factoriesServiceURL = 'https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0';

// URL endpoint to the factories_table hosted in SerenDPT ArcGIS
const sDPTFactoriesTable = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_table/FeatureServer/0';

// URL endpoint to the factories_images FL in SerenDPT ArcGIS
const sDPTImagesURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_images_view/FeatureServer/0';

// URL endpoint to map factory IDs to objectids
const mapFactoryIDToObjectIDURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/map_factory_id_to_objectid/FeatureServer/0';

const attachmentsBaseURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_images_view/FeatureServer/0/'

const sDPT_API_KEY = 'AAPK59d4c0044b53432197cd9e4ed464506aQeTHK0iQ9Hb_7xaPtEAbZRSly6r9qtbWlHsaYOc7NsADvtOYxASd3CF21w6VGuCE';


export { 
    apiKey, 
    factoriesServiceURL, 
    sDPTFactoriesTable, 
    sDPTImagesURL, 
    sDPT_API_KEY, 
    mapFactoryIDToObjectIDURL,
    attachmentsBaseURL
 }