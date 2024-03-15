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
        // Get the attachments for this feature
        const attachments = await getAttachments({
            url: `https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0/2/attachments/1`,
            objectId: 2,
            params: {
                'token': apiToken
            }
        })
        .then(response => {
            // Handle the response, which contains the attachments
            console.log(response);
            this.attachment = response.Attachment
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error fetching attachments:', error);
        });
    }
}

