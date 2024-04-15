// src/Factory.js
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import { attachmentsBaseURL, featureLayerServiceURLs } from './GlobalConstants';
import { latLongToPixel } from './ArcGIS';
import axios from 'axios';

/** Factory(attributes, geometry)
 * @abstract A Factory object containing the attributes for a "Factory" 
 * @argument { dict } attribtues 
 * @argument { dict } geometry 
 */
export default class Factory { 

    constructor(attributes, geometry) { 
        this.Opening_Year = parseInt(attributes.Opening_Year);
        this.Closing_Year = parseInt(attributes.Closing_Year);
        this.English_Name = attributes.English_Name;
        this.Italian_Name = attributes.Italian_Name;
        this.Factory_Description = attributes.Factory_Description;
        this.Max_Employment = attributes.Max_Employment;
        this.Factory_ID = attributes.Factory_ID;
        this.Building_ID = attributes.Building_ID;
        this.long = geometry.x;
        this.lat = geometry.y; 
        this.x = null;
        this.y = null;
        this.link = `/industrial-sites/${this.Factory_ID}`;
        this.isVisible = null;
    }

    /** toString() 
     * @abstract return the attributes of this factory instance as a coherent string, to be used primarily for debugging
     * @returns {string} a string representation of this factory
     */
    toString() { 
        let s = `Factory: ${this.English_Name} (${this.Factory_ID})\n`;
        s += `\tOpening Date: ${this.Opening_Year}\n`;
        s += `\tClosing Date: ${this.Closing_Year}\n`;
        s += `\tEnglish Name: ${this.English_Name}\n`;
        s += `\tItalian Name: ${this.Italian_Name}\n`;
        s += `\tFactory Description: ${this.Factory_Description}\n`;
        s += `\tMax Employment: ${this.Max_Employment}\n`;
        s += `\tFactory ID: ${this.Factory_ID}\n`;
        s += `\tBuilding ID: ${this.Building_ID}\n`;
        s += `\tLongitude: ${this.long}\n`;
        s += `\tLatitude: ${this.lat}\n`;
        s += `\tOBJECTID: ${this.OBJECTID}`;
        return s;
    }

    /** getOBJECTID() 
     * @abstract Function that gets the OBJECTID in the Images FL for this factory. This is required due to the way ArcGIS handles
     * images in FLs and submitting queries. The queries for attachments is submitted as a raw API url, not using any ArcGIS primitive
     * given in libraries; because of this, the filter must be using the unique ID for the Images FL, i.e. OBJECTID. Since the 
     * Factory_ID is also a primary key, but ArcGIS just doesn't recognize it as such, we can query the images FL twice - once to 
     * match the Factory_ID to the OBJECTID, then another time to get the attachments for this OBJECTID (and thus, for this Factory_ID).
     */
    async getOBJECTID() { 
        try { 
            const resp = await queryFeatures({
                url: attachmentsBaseURL,
                where: `Factory_ID = ${this.Factory_ID}`
            });
    
            this.OBJECTID = resp.features[0].attributes.OBJECTID;

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
     * @returns {null} sets this.coverPicURL; calls this.setFactoryImage() and sets the image in the element with id of this.Factory_ID
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

    /** getFactoryCoords()
     * @abstract Function that uses the Factory_Coords FL to get the X,Y coordinates for this factory. 
     * NOTE: this function uses the function latLongToPixel(), defined in src/ArcGIS.js, which assumes that the 
     * map is in the dimensions defined by minLat, maxLat, minLong, maxLong , mapWidth, mapHeight, all defined 
     * in src/GlobalConstants.js
     * 
     * If a different map is to be used, these values of minLat, maxLat, minLong, maxLong, mapHeight, mapWidth
     * must be updated accordingly in src/GlobalConstants.js. Alternatively, this function and latLongToPixel() 
     * (defined in src/ArcGIS.js) could be altered to take in a set of parameters, i.e. minLat, minLong, mapWidth, 
     * and mapHeight, and this function could pass those parameters to latLongToPixel.
     * 
     * See the definition of latLongToPixel() in src/ArcGIS.js for more details on the math behind converting
     * lat/long to pixels on a static map.
     * 
     * @returns { null } sets this.x and this.y
     */
    async getFactoryCoords() { 
        try { 
            // Query the FL with the necessary filters
            const resp = await queryFeatures({
                url: featureLayerServiceURLs['Factory_Coords'],
                where: `Factory_ID = ${this.Factory_ID}`
            });
            
            // Set the x and y coords for this factory
            this.long = resp.features[0].attributes.Longitude_;
            this.lat = resp.features[0].attributes.Latitude_;
                        
            // Convert the lat/long to pixel coordinates on the map
            const factoryMapPos = latLongToPixel(this.lat, this.long);
            this.x = factoryMapPos.x;
            this.y = factoryMapPos.y;            
            return;
        } catch(error) { 
            if (error instanceof TypeError) {
                //console.log(`No Coords found for ${this.English_Name} (${this.Factory_ID}) during the timeframe ${startYear} - ${endYear}`);
                this.OBJECTID = -1;
            } else { 
                //console.error(`Error occured getting OBJECTID for ${this.English_Name} (${this.Factory_ID}) during the timeframe ${startYear} - ${endYear}:`, error);
            }
        }
    }
}

