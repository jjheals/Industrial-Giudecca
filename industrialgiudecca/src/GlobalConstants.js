// src/GlobalConstants.js

// URL endpoints to the storymaps for factories that they exist for
// [ key : val ] => [ Factory_ID : { en: EnglishStorymapURL, it: ItalianStorymapURL ]
export const factoryStoryMapURLs = {
    g: { // Homepage story
        en: 'https://storymaps.arcgis.com/stories/d6072e65094c49269316d897de0cb258?cover=false',
        it: 'https://storymaps.arcgis.com/stories/8e4b51adb9db4cba8546a3c3df7be7ea?cover=false'
    },
    3: { // Stucky
        en: 'https://storymaps.arcgis.com/stories/9cb7b8c694384786a8208b17b8f16a52',
        it: 'https://storymaps.arcgis.com/stories/c929e323569746d197298582d855feec'
    },
    9: { // Scalera
        en: 'https://storymaps.arcgis.com/stories/d488bbdddc3c4c2ca34686b9d230d40f',
        it: 'https://storymaps.arcgis.com/stories/e8d4a8e29be24c6f984a3f4abd9f8099'
    },
    28: { // Gianolla
        en: 'https://storymaps.arcgis.com/stories/f4e8d9f7c1c9475a803d7ecef51d3553',
        it: 'https://storymaps.arcgis.com/stories/7abdbbcda5c04372a5e3dd90c4dac5d3'     
    },
    19: { // Junghans
        en: 'https://storymaps.arcgis.com/stories/9c618746736243bc9894725311a4ee20',
        it: 'https://storymaps.arcgis.com/stories/fcaff9ccd04f40e796753b529046c663'
    },
    14: { // Hérion
        en: 'https://storymaps.arcgis.com/stories/81706d259ec54394b759eb0d6dcdfbee',
        it: 'https://storymaps.arcgis.com/stories/6a218d66fd4f4e0d9f92acdc3c16d8e8'    
    },
    16: { // Toffolo
        en: 'https://storymaps.arcgis.com/stories/090dc60ff7f8486b8209d3f79d38a329',
        it: 'https://storymaps.arcgis.com/stories/77268e45bf66471bb0cdfc5a79ebe642'
    },
    15: { // Lucchese
        en: 'https://storymaps.arcgis.com/stories/c7daaf088bed429188e604e9bec50857',
        it: 'https://storymaps.arcgis.com/stories/9566d47cf0db41359711b750af95f2c9'
    },
    37: { // Tanner
        en: 'https://storymaps.arcgis.com/stories/f24b394505f741f18a57c02f8eca6970',
        it: 'https://storymaps.arcgis.com/stories/e0b32278c52d4ca5b4ba9f27028851c9'
    },
    5: { // Fortuny
        en: 'https://storymaps.arcgis.com/stories/56ba99283a3845e380c44c8f7da739c6',
        it: 'https://storymaps.arcgis.com/stories/d8b4a07dc54c4a1f8d6d4e938aa1d327'
    },
    27: { // Cnomv
        en: 'https://storymaps.arcgis.com/stories/53c2cc50b9974482ba8326317b736018',
        it: 'https://storymaps.arcgis.com/stories/86221c2b1776407daa4d9b4bd60ef9ae'
    },
    271: { // Cnav
        en: 'https://storymaps.arcgis.com/stories/f084de8e1bcb42d4a6b4424332d34d4f',
        it: 'https://storymaps.arcgis.com/stories/32d4ad50d45140a8868e4939713733ca',
    },
    58: { // Savinem
        en: 'https://storymaps.arcgis.com/stories/dc9099a7d0684f21a2b1e5c7a5b90c3f',
        it: 'https://storymaps.arcgis.com/stories/503c1907a9104038adca2702df76d543',
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
