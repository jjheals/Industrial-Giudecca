// src/GlobalConstants.js

// URL endpoints to the storymaps for factories that they exist for
// [ key : val ] => [ Factory_ID : { en: EnglishStorymapURL, it: ItalianStorymapURL ]
export const factoryStoryMapURLs = {
    g: { // Homepage story
        en: 'https://storymaps.arcgis.com/stories/d6072e65094c49269316d897de0cb258?cover=false',
        it: 'https://storymaps.arcgis.com/stories/8e4b51adb9db4cba8546a3c3df7be7ea?cover=false'
    },
    3: { // Stucky
        en: 'https://storymaps.arcgis.com/stories/93bdc12fbfbb450fb1ab6ee01c663cc0',
        it: 'https://storymaps.arcgis.com/stories/d7a10a3caea84069b79fc722ca782189'
    },
    9: { // Scalera
        en: 'https://storymaps.arcgis.com/stories/d488bbdddc3c4c2ca34686b9d230d40f',
        it: 'https://storymaps.arcgis.com/stories/214333c62d7b4813bffc5d9a4abc6af6'
    },
    28: { // Gianolla
        en: 'https://storymaps.arcgis.com/stories/f4e8d9f7c1c9475a803d7ecef51d3553',
        it: 'https://storymaps.arcgis.com/stories/fd499fa9a0b847fe99b256b8c7118487'     
    },
    19: { // Junghans
        en: 'https://storymaps.arcgis.com/stories/9c618746736243bc9894725311a4ee20?cover=false',
        it: 'https://storymaps.arcgis.com/stories/98b8a108d89948f9b82fcaab598da83f?cover=false'
    },
    14: { // Hérion
        en: 'https://storymaps.arcgis.com/stories/81706d259ec54394b759eb0d6dcdfbee',
        it: 'https://storymaps.arcgis.com/stories/54c18757ada74835b763f4b24b97cd68'    
    },
    16: { // Toffolo
        en: 'https://storymaps.arcgis.com/stories/090dc60ff7f8486b8209d3f79d38a329',
        it: 'https://storymaps.arcgis.com/stories/090dc60ff7f8486b8209d3f79d38a329'
    },
    15: { // Lucchese
        en: 'https://storymaps.arcgis.com/stories/c7daaf088bed429188e604e9bec50857',
        it: 'https://storymaps.arcgis.com/stories/c7daaf088bed429188e604e9bec50857'
    },
    37: { // Tanner
        en: 'https://storymaps.arcgis.com/stories/f24b394505f741f18a57c02f8eca6970',
        it: 'https://storymaps.arcgis.com/stories/f24b394505f741f18a57c02f8eca6970',
    }
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
    'Timeperiod': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Timeperiod/FeatureServer/0',
    'Photo_Sources': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Photo_Sources/FeatureServer/0'
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
