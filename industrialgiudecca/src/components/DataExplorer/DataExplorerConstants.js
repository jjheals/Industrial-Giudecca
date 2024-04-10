
/** RelationalFilters
 * @constant {dict} 
 * @abstract 
 * For relational filters in the data explorer, RelationalFilters contains the [ key : val ] pairs of 
 * the [ filter : relational_fl_name ] so that the relational filters can be properly mapped to the FLs they
 * need to be queried from. 
 * 
 * NOTE: The filter(s), i.e. the keys of RelationalFilters, are the name of the filters in the data explorer. 
 * Similarly, the relational_fl_name(s), i.e. the values of RelationalFilters, are the keys of 
 * GlobalConstants.js => agisCSVDownloadEndpoints. Thus, the keys of RelationalFilters can be used to match the 
 * filter names of the Data Explorer to the proper table modeling that relationship.
 */
export const RelationalFilters = { 
//   Filter : FL Name 
    'Product': 'Product_Over_Time',
    'Min_Employment': 'Employment_Over_Time',
    'Max_Employment': 'Employment_Over_Time'
}


export const featureLayerServiceURLs = { 
    'Owner_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Owner_Over_Time/FeatureServer/0',
    'Factory': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory/FeatureServer/0',
    'Employment_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Employment_Over_Time/FeatureServer/0',
    'Factory_Coords': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords/FeatureServer/0',
    'Product_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords/FeatureServer/0'
}