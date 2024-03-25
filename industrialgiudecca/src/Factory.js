import { getAttachments, queryFeatures } from '@esri/arcgis-rest-feature-service';
import { mapFactoryIDToObjectIDURL, sDPTImagesURL, sDPT_API_KEY, attachmentsBaseURL } from './GlobalConstants';
import axios from 'axios';

export default class Factory { 

    /** Factory(attributes, geometry)
     * @abstract a Factory object containing the attributes for a "Factory" 
     * @param {dict} attributes 
     * @param {dict} geometry 
     */
    constructor(attributes, geometry, apiToken) { 
        this.Opening_Year = attributes.Opening_Year;
        this.Closing_Year = attributes.Closing_Year;
        this.English_Name = attributes.English_Name;
        this.Italian_Name = attributes.Italian_Name;
        this.Factory_Description = attributes.Factory_Description;
        this.Max_Employment = attributes.Max_Employment;
        this.Factory_ID = attributes.Factory_ID;
        this.Factory_Active = attributes.Factory_Active;
        this.Building_ID = attributes.Building_ID;
        this.x_coord = geometry.x;
        this.y_coord = geometry.y; 
        this.link = `/factory/${this.Factory_ID}`;
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
    async getAllFactoryImageURLs() { 

        try {
            const queryURL = `${attachmentsBaseURL}/queryAttachments?objectids=${this.OBJECTID}&f=pjson`;
            const thisAttachmentsBaseURL = `${attachmentsBaseURL}/${this.OBJECTID}/attachments`;

            const response = await axios.get(
                queryURL,
            );

            // Handle response 
            const attachmentsData = response.data.attachmentGroups[0].attachmentInfos;

            let attachmentURLs = [];
            attachmentsData.forEach(d => { 
                attachmentURLs.push(`${thisAttachmentsBaseURL}/${d.id}/`);
            })
            
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
    async getCoverImageURL() { 
        try { 
            // Check that this factory has an associated OBJECTID (i.e. that there are associated images)
            if(this.OBJECTID < 0 || isNaN(this.OBJECTID)) { 
                return;
            }

            // Get the URLs for all the attachments for this factory
            const allAttachmentURLs = await this.getAllFactoryImageURLs();

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

