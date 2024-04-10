
// URL endpoint to the service hosting the FactoriesFL
export const factoriesServiceURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory/FeatureServer/0';

// URL endpoint to the factories_table hosted in SerenDPT ArcGIS
export const sDPTFactoriesTableURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_table/FeatureServer/0';

// URL endpoint to the Factories_Coords_FL hosted in SerenDPT ArcGIS
export const sDPTFactoryCoordsURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords/FeatureServer/0';

// URL endpoint to the factories_images FL in SerenDPT ArcGIS
export const sDPTImagesURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_images_view/FeatureServer/0';

// URL endpoint to the attachments FL containing images for each factory
export const attachmentsBaseURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_images_view/FeatureServer/0/'

// URL endpoints to download the raw CSVs containing the data for every factory 
export const agisCSVDownloadEndpoints = { 
    'Timeperiod': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/5b051ec299174fcdb8a4863ae6dc0205/data',
    'Product_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/6ef0e812ac674664ae6fc9d6c37153cd/data',
    'Owner_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/257f41864841429ab60178e5773748dd/data', 
    'Giudecca_Pop_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/d2aee2cf151d4380ba6d7bc241791f28/data',
    'Factory': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/07632bd41fcd486493cc91bbe78ea22e/data',
    'Factory_Stories': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/addbd92e518b458f96255cd9e27b0abc/data',
    'Factory_At_Building': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/fe71b47ef6cc418e833aee1ad1798a43/dataa',
    'Employment_Over_Time': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/26a5247f3ada4220a6536f6ab4f9a9fc/data',
    'Building': 'https://serendpt.maps.arcgis.com/sharing/rest/content/items/4b59a8250ad0463db2771754d7d3f33a/data',
    'Factory_Coords_FL': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords/FeatureServer'
}

// URL endpoints to the storymaps for factories that they exist for
// [ key : val ] => [ Factory_ID : StoryMapURL ]
export const factoryStoryMapURLs = {
    g: 'https://storymaps.arcgis.com/stories/d6072e65094c49269316d897de0cb258',     // Storymap for Giudecca ("g")
    3: 'https://storymaps.arcgis.com/stories/93bdc12fbfbb450fb1ab6ee01c663cc0'      // Stucky
}


export const minLat = 45.4135653;                   // Bottom map limit
export const maxLat = 45.4317564;                   // Top map limit
export const minLong = 12.3046033;                  // Left map limit
export const maxLong = 12.3485030;                  // Right map limit
export const deltaLong = maxLong - minLong;         // Map X axis distance (horiz) in DEGREES
export const deltaLat = maxLat - minLat;            // Map Y axis distance (vert) in DEGREES
export const mapWidth = window.innerWidth;          // Map width == screen width
export const mapHeight = window.innerHeight * .95;  // Map height is 60% of the screen 
