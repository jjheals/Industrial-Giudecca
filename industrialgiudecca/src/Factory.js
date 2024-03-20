import { getAttachments } from '@esri/arcgis-rest-feature-service';

export default class Factory { 

    /** Factory(attributes, geometry)
     * @abstract a Factory object containing the attributes for a "Factory" 
     * @param {dict} attributes 
     * @param {dict} geometry 
     */
    constructor(attributes, geometry, apiToken) { 
        this.OBJECTID = attributes.OBJECTID;
        this.Opening_Date = attributes.Opening_Date;
        this.Closing_Date = attributes.Closing_Date;
        this.English_Name = attributes.English_Name;
        this.Italian_Name = attributes.Italian_Name;
        this.Factory_Description = attributes.Factory_Description;
        this.Max_Employment = attributes.Max_Employment;
        this.Factory_ID = attributes.Factory_ID;
        this.Factory_Active = attributes.Factory_Active;
        this.Building_ID = attributes.Building_ID;
        this.x_coord = geometry.x;
        this.y_coord = geometry.y; 

        const name = attributes.English_Name;
        if(name == null) { 
            this.link = `/id-${attributes.Factory_ID}`;
        } else { 
            this.link = `/${name.toLowerCase().replace(/ /g, '-')}`;
        }
    }

    /** toString() 
     * @abstract return the attributes of this factory instance as a coherent string, to be used primarily for debugging
     * @returns {string} a string representation of this factory
     */
    toString() { 
        let s = `Factory: ${this.English_Name} (${this.Factory_ID})\n`;
        s += `\tOpening Date: ${this.Opening_Date}\n`;
        s += `\tClosing Date: ${this.Closing_Date}\n`;
        s += `\tEnglish Name: ${this.English_Name}\n`;
        s += `\tItalian Name: ${this.Italian_Name}\n`;
        s += `\tFactory Description: ${this.Factory_Description}\n`;
        s += `\tMax Employment: ${this.Max_Employment}\n`;
        s += `\tFactory ID: ${this.Factory_ID}\n`;
        s += `\tFactory Active: ${this.Factory_Active}\n`;
        s += `\tBuilding ID: ${this.Building_ID}\n`;
        s += `X Coord: ${this.x_coord}\n`;
        s += `Y Coord: ${this.y_coord}\n`;
        return s;
    }

    /** getAllFactoryImageURLs(apiToken)
     * @abstract retrieves all attachment IDs for this Factory instance's OBJECTID
     * @param {string} apiToken 
     * @returns {Array} an array of URLs for all of this Factory's attachments
     */
    async getAllFactoryImageURLs(apiToken) { 
        /* 
         * NOTE: ArcGIS API does not properly return the attachments for features, and there is not a "standard" (i.e. repeateable) pattern
         *       for retrieving the attachments for a particular feature. Moreover, the PJSON API endpoint gives consistent CORS errors. To
         *       get around this, we used the HTML endpoint for this Feature Layer (attachmentsBaseURL below) with the specific OBJECTID to
         *       get the HTML page containing the IDs for each attachment for this feature (this OBJECTID). Then, we extracted the 
         *       attachment IDs by parsing the HTML and relying on its' consistent structure across Features. 
         */

        // Url to get ALL attachments for a factory (a feature)
        const attachmentsBaseURL = `https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0/${this.OBJECTID}/attachments`;

        // Get info for all attachments and refine down to the FIRST (to be used as the cover on factories homepage)
        try {
            const response = await fetch(`${attachmentsBaseURL}?token=${apiToken}`);
            
            // Make sure response was OK
            if (!response.ok) {
                throw new Error(`Error retrieving attachments for ${this.Factory_ID} (${this.English_Name})`);
            }

            // Handle response 
            const html = await response.text();                     // Extract the HTML response
            const parser = new DOMParser();                         // Init HTML parser
            const doc = parser.parseFromString(html, 'text/html');  // Parse the HTML
            const ftrTables = doc.getElementsByClassName('ftrTable');     // Find all the ftrTable class objs

            // Return if there are no attachments 
            if(ftrTables.length == 0) return [];

            // Extract the ID from the second <td> tag (index 4)
            let attachmentURLs = [];

            for(let table of ftrTables) { 
                const firstRow = table.querySelector('tr');
                const attachmentID = firstRow.querySelectorAll('td')[1].textContent.trim();
                const attachmentURL = `${attachmentsBaseURL}/${attachmentID}?token=${apiToken}`;   
                attachmentURLs.push(attachmentURL);
            }
            return attachmentURLs;
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    /** getFactoryImage(apiToken)
     * @abstract fetch the first image (i.e. the cover image) for this factory
     * @param {string} apiToken 
     * @returns {null} calls this.setFactoryImage and sets the image on FactoryHomepage 
     */
    async getCoverImageURL(apiToken) { 
        try { 
            // Get the URLs for all the attachments for this factory
            const allAttachmentURLs = await this.getAllFactoryImageURLs(apiToken);

            // Check if there are any attachments, set this.coverPicURL with the FIRST if there are
            if(allAttachmentURLs.length > 0) this.coverPicURL = allAttachmentURLs[0];

            // Check if the img placeholder exists and set the src if it does
            let img = document.getElementById(this.Factory_ID);
            if(img && this.coverPicURL) { 
                // img exists, so set the src
                img.src = this.coverPicURL;
            }
        } catch(error) { 
            console.log(`Error retrieving cover image URL for ${this.Factory_ID} (${this.Factory_ID})`, error)
        }
    }
}

