import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import { attachmentsBaseURL, sDPTImagesURL } from './GlobalConstants';
import axios from 'axios';

/* NOTE : 
 *
 * TO DO FOR TUESDAY:
 *  - Clean up code (comments, unneeded functions & imports)
 *  - Documentation
 *  - Find more images for the remaining factories in factories_images FL
 *  - Fix height of the grid container to be at MAX the height of the page
 */


export default class Factory { 

    /** Factory(attributes, geometry)
     * @abstract a Factory object containing the attributes for a "Factory" 
     * @param {dict} attributes 
     * @param {dict} geometry 
     */
    constructor(attributes, geometry) { 
        this.Opening_Year = attributes.Opening_Year;
        this.Closing_Year = attributes.Closing_Year;
        this.English_Name = attributes.English_Name;
        this.Italian_Name = attributes.Italian_Name;
        this.Factory_Description = attributes.Factory_Description;
        this.Max_Employment = attributes.Max_Employment;
        this.Factory_ID = attributes.Factory_ID;
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
        s += `\tBuilding ID: ${this.Building_ID}\n`;
        s += `\tX Coord: ${this.x_coord}\n`;
        s += `\tY Coord: ${this.y_coord}\n`;
        s += `\tOBJECTID: ${this.OBJECTID}`;
        return s;
    }

    /** getOBJECTID() 
     * 
     */
    async getOBJECTID() { 
        try { 
            const resp = await queryFeatures({
                url: sDPTImagesURL,
                where: `Factory_ID = ${this.Factory_ID}`
            });
    
            this.OBJECTID = resp.features[0].attributes.OBJECTID;
            console.log(this.toString());

            return;
        } catch(error) { 
            if (error instanceof TypeError) {
                console.log(`No OBJECTID found for ${this.English_Name} (${this.Factory_ID})`);
                this.OBJECTID = -1;
            } else { 
                console.error(`Error occured getting OBJECTID for ${this.English_Name} (${this.Factory_ID}):`, error);
            }
        }
    }

    /** getAllFactoryImageURLs()
     * @abstract retrieves all attachment IDs for this Factory instance's OBJECTID
     * @returns {Array} an array of URLs for all of this Factory's attachments
     */
    async getAllFactoryImageURLs() { 

        try {
            const queryURL = `${attachmentsBaseURL}/queryAttachments?objectids=${this.OBJECTID}&f=pjson`;
            const thisAttachmentsBaseURL = `${attachmentsBaseURL}/${this.OBJECTID}/attachments`;
            const response = await axios.get(queryURL);

            // Handle response 
            try { 
                // Extract the attachments from the response
                const attachmentsData = response.data.attachmentGroups[0].attachmentInfos;

                // Iterate over the results and create URL for this attachment
                let attachmentURLs = [];
                attachmentsData.forEach(d => { 
                    attachmentURLs.push(`${thisAttachmentsBaseURL}/${d.id}/`);
                })
                return attachmentURLs;
            } catch(TypeError) { 
                // Return an empty array if no attachments exist for this factory
                console.log(`No images found for ${this.English_Name} (${this.Factory_ID})`);
                return [];
            }
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    /** getFactoryImage(apiToken)
     * @abstract fetch the first image (i.e. the cover image) for this factory
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

