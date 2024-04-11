
/** setResultsTable(results, lof, isRelational)
 * @abstract 
 * @param {Array[int]} results - list of Factory_IDs to display information for
 * @param {Array[String]} lof - list of the filters that were used 
 * @param {Boolean} isRelational - bool whether the resulting table is a relational table (true) or an entity table (false)
 * @returns 
 */
export function setResultsTable(results, lof, isRelational, featureLayers) { 

    
    const nonRelationalColumns = [
        'Factory_ID',
        'English_Name',
        'Italian_Name', 
        'Opening_Year', 
        'Closing_Year',
        'Max_Employment',
        'Min_Employment', 
        'Current_Purpose'
    ]

    const resultsTableContainerElm = document.getElementById('results-table-container');

    // Check that resultsTableContainerElm actually exists to avoid errors 
    if(!resultsTableContainerElm) return;

    // Check that results were given 
    if(results.length == 0) { 
        return [];
    }

    // Format the table based on whether it is a relational query or not
    /* NOTE: featureLayers will always contain at LEAST 
     * - factoriesFL ('Factory') 
     * - buildingFL ('Building')
     * - employmentOverTimeFL ('Employment')
     * - factoryAtBuildingFL ('Factory_At_Building')
     */
    const factoryFL = featureLayers['Factory'];
    const buildingFL = featureLayers['Building'];
    const employmentOverTimeFL = featureLayers['Employment'];
    const factoryAtBuildingFL = featureLayers['Factory_At_Building'];

    console.log(employmentOverTimeFL);
    

    if(!isRelational) { 
        // NOTE: in a non-relational table, each row is a factory 
        let rows = results.map(fid => {
            // Get the factory details
            const thisFactory = factoryFL.find(factory => factory.attributes['Factory_ID'] === fid).attributes;

            // Get the min/max employment
            let thisMinEmployment = null;
            let thisMaxEmployment = null;
            const thisFactoryEmploymentData = employmentOverTimeFL.filter(r => r.attributes['Factory_ID'] === fid);
            if(thisFactoryEmploymentData) { 
                // Find min and max employment
            } 
                        
            console.log('thisFactoryEmploymentData');
            console.log(thisFactoryEmploymentData);


            // Get the current purpose using factoryAtBuildingFL and buildingFL
            // DO SOMETHING ...
            // ...
            const thisCurrentPurpose = null;



            let thisRow = [
                fid,                        // Factory_ID
                thisFactory['English_Name'],  // English_Name
                thisFactory['Italian_Name'],  // Italian_Name
                thisFactory['Opening_Year'],  // Opening_Year
                thisFactory['Closing_Year'],  // Closing_Year
                thisMinEmployment,
                thisMaxEmployment,
                thisCurrentPurpose
            ];

            return thisRow;
        });

        console.log(rows);


    }

}