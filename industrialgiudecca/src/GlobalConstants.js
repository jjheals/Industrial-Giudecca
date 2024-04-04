
// URL endpoint to the service hosting the FactoriesFL
export const factoriesServiceURL = 'https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0';

// URL endpoint to the factories_table hosted in SerenDPT ArcGIS
export const sDPTFactoriesTableURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_table/FeatureServer/0';

// URL endpoint to the Factories_Coords_FL hosted in SerenDPT ArcGIS
export const sDPTFactoryCoordsURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords_FL/FeatureServer/0';

// URL endpoint to the factories_images FL in SerenDPT ArcGIS
export const sDPTImagesURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_images_view/FeatureServer/0';

// URL endpoint to the attachments FL containing images for each factory
export const attachmentsBaseURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_images_view/FeatureServer/0/'

// URL endpoints to download the raw CSVs containing the data for every factory 
export const agisCSVDownloadEndpoints = { 
    'Timeperiods': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/a3ad1e7c0f1b4fe6b1a26cec1fe89b40/data',
    'Product_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/824192f67c8145458c4ba3c55f876d16/data',
    'Owner_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/b8eec9aad7d14b71b04363655a18e9bf/data', 
    'Giudecca_Population_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/67eaa85f416149129c3d19783003e218/data',
    'Factory': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/775374bb534b4425a1b74076ff39419b/data',
    'Factory_Stories': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/f5894ad351a74a21ab83c02244b60fce/data',
    'Factory_Closing_Reason': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/6cc67375010e415e951e7d018b7a2957/data',
    'Factory_At_Building': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/308d4753d6e14d58beeb1e1e7fa481b0/data',
    'Employment_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/f37a539fede14206822399b15db510a6/data',
    'Building': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/d800fd25bbdc4676bba9ca95092ef996/data',
    'Building_Current_Purpose': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/e47de270114b473eaef75ca1b909b331/data',
    

}