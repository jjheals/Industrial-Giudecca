import { getAttachments } from '@esri/arcgis-rest-feature-service';

export default class Factory { 

    /** Factory(attributes, geometry)
     * @abstract 
     * @param {dict} attributes 
     * @param {dict} geometry 
     */
    constructor(attributes, geometry, img_url) { 
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
        this.attachment = null;
        
        const name = attributes.English_Name;
        if(name == null) { 
            this.link = `/id-${attributes.Factory_ID}`;
        } else { 
            this.link = `/${name.toLowerCase().replace(/ /g, '-')}`;
        }
    }

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

    async getFactoryImage(apiToken) { 
        // Url to get ALL attachments for an image
        const attachmentsBaseURL = `https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0/${this.OBJECTID}/attachments`;

        // Get info for all attachments and refine down to the FIRST (to be used as the cover on factories homepage)
        fetch(`${attachmentsBaseURL}?token=${apiToken}`)
        .then(response => { 
            // Make sure response was OK
            if(!response.ok) { 
                throw new Error(`Error retrieving attachments for ${this.Factory_ID} (${this.English_Name})`);
            }
            return response.text() 
        })
        .then(html => {             

            // Make API req and parse the HTML to extract a specific cell, since it will always be the same format
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const table = doc.getElementsByClassName('ftrTable');

            // Return if there are no results (i.e. no attachments)
            if(table.length == 0) return;
            
            // Extract the cells
            const cells = doc.querySelectorAll('td');

            // Extract the cell containing the ID
            const idCell = cells[4];

            console.log("ID");
            console.log(idCell.textContent);

            return idCell.textContent;
        })
        .then(attachmentID => { 
            // Now get the attachment we want
            const attachmentURL = `${attachmentsBaseURL}/${attachmentID}?token=${apiToken}`;
            this.setFactoryImage(attachmentURL);
            return;
        })
        .catch(error => { 
            console.error(error);
        });
    }

    
    async setFactoryImage(url) { 
        console.log(`Setting attachment for ${this.Factory_ID} (${this.English_Name})`)
        try { 
            
            // Get the ID of the element to display the image, which is identified by the factory ID
            const elm = document.getElementById(this.Factory_ID);
            
            console.log("Elm");
            console.log(elm);

            const img = document.createElement('img');  // Create img element 
            img.src = url;                              // Set img src 
            img.className = "factory-image";
            elm.appendChild(img);                       // Append img to the elm 

            console.log(`Got attachment for ${this.English_Name}`)

        } catch(error) { 
            // Handle any errors that occur during the request
            console.error('Error fetching attachments:', error);
        }
        
    }
}

