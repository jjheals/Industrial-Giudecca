
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

// URL endpoints to the storymaps for factories that they exist for
// [ key : val ] => [ Factory_ID : StoryMapURL ]
export const factoryStoryMapURLs = {
    g: 'https://storymaps.arcgis.com/stories/d6072e65094c49269316d897de0cb258',     // Storymap for Giudecca ("g")
    3: 'https://storymaps.arcgis.com/stories/93bdc12fbfbb450fb1ab6ee01c663cc0'      // Stucky
}

// URL endpoints for the feature layers that host the data needed for the Data Explorer and the Search Bar
export const featureLayerServiceURLs = { 
    'Owner_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Owner_Over_Time/FeatureServer/0',
    'Factory': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory/FeatureServer/0',
    'Employment_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Employment_Over_Time/FeatureServer/0',
    'Factory_Coords': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords/FeatureServer/0',
    'Product_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Product_Over_Time/FeatureServer/0'
}

// Function that takes the intersection of two lists, written to simplify code and improve readability
export function intersection(list1, list2) {
    return list1.filter(item => list2.includes(item));
}

export const minLat = 45.4135653;                   // Bottom map limit
export const maxLat = 45.4317564;                   // Top map limit
export const minLong = 12.3046033;                  // Left map limit
export const maxLong = 12.3485030;                  // Right map limit
export const deltaLong = maxLong - minLong;         // Map X axis distance (horiz) in DEGREES
export const deltaLat = maxLat - minLat;            // Map Y axis distance (vert) in DEGREES
export const mapWidth = window.innerWidth;          // Map width == screen width
export const mapHeight = window.innerHeight * .95;  // Map height is 60% of the screen 
