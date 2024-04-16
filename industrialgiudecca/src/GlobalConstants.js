// src/GlobalConstants.js

// URL endpoint to the attachments FL containing images for each factory
export const attachmentsBaseURL = 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/factories_images_view/FeatureServer/0/'

// URL endpoints to the storymaps for factories that they exist for
// [ key : val ] => [ Factory_ID : StoryMapURL ]
export const factoryStoryMapURLs = {
    g: 'https://storymaps.arcgis.com/stories/d6072e65094c49269316d897de0cb258?cover=false',     // Storymap for Giudecca ("g")
    3: 'https://storymaps.arcgis.com/stories/93bdc12fbfbb450fb1ab6ee01c663cc0?cover=false',      // Stucky
    9: 'https://storymaps.arcgis.com/stories/d488bbdddc3c4c2ca34686b9d230d40f?cover=false', // Scalera
}

// URL endpoints for the feature layers that host the data needed for the Data Explorer and the Search Bar
export const featureLayerServiceURLs = { 
    'Owner_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Owner_Over_Time/FeatureServer/0',
    'Factory': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory/FeatureServer/0',
    'Employment_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Employment_Over_Time/FeatureServer/0',
    'Factory_Coords': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords/FeatureServer/0',
    'Product_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Product_Over_Time/FeatureServer/0',
    'Building': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Building/FeatureServer/0',
    'Factory_At_Building': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_At_Building/FeatureServer/0',
    'Timeperiod': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Timeperiod/FeatureServer/0'
}

// Function that takes the intersection of two lists, written to simplify code and improve readability
export function intersection(list1, list2) {
    return list1.filter(item => list2.includes(item));
}

// URL for the instant app service that is shown fullscreen on the "/map" enpoint (src/pages/MapPage.js)
export const mapInstantAppURL = "https://serendpt.maps.arcgis.com/apps/instant/sidebar/index.html?appid=01fcbf22fca04b278bd20a2e2cc0a675";

// Constants needed for the MapTimeline and FactoryMap
// NOTE: these are used in src/ArcGIS.js => latLongToPixel(). Only change if a different map image is used for the MapTimeline and FactoryMap.
// If multiple different maps need to be used, see @abstract of src/Factory.js => getFactoryCoords() for guidance on a solution.
export const minLat = 45.4135653;                   // Bottom map limit
export const maxLat = 45.4317564;                   // Top map limit
export const minLong = 12.3046033;                  // Left map limit
export const maxLong = 12.3485030;                  // Right map limit
export const deltaLong = maxLong - minLong;         // Map X axis distance (horiz) in DEGREES
export const deltaLat = maxLat - minLat;            // Map Y axis distance (vert) in DEGREES
export const mapWidth = window.innerWidth;          // Map width == screen width
export const mapHeight = window.innerHeight * .95;  // Map height is 95% of the screen 
