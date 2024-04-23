// src/Factory.js
import { featureLayerServiceURLs } from './GlobalConstants';
import { latLongToPixel, fetchFL } from './ArcGIS';
import axios from 'axios';

/** Factory(attributes)
 * @abstract A Factory object containing the attributes for a "Factory" 
 * @argument { dict } attribtues 
 */
export default class Factory { 

    constructor(attributes) { 
        this.Opening_Year = parseInt(attributes.Opening_Year);
        this.Closing_Year = parseInt(attributes.Closing_Year);
        this.English_Name = attributes.English_Name;
        this.Italian_Name = attributes.Italian_Name;
        this.Factory_Description = attributes.Factory_Description;
        this.Max_Employment = attributes.Max_Employment;
        this.Factory_ID = attributes.Factory_ID;
        this.coverPicURL = attributes.Cover_Image_ArcGIS_URL;
        this.long = null;
        this.lat = null; 
        this.x = null;
        this.y = null;
        this.link = `/industrial-sites/${this.Factory_ID}`;
        this.allAttachments = null;
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
        s += `\tX: ${this.x}\n`;
        s += `\tY: ${this.y}\n`;
        return s;
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
            const resp = await fetchFL(featureLayerServiceURLs['Factory_Coords'], `Factory_ID = ${this.Factory_ID}`);

            // Set the x and y coords for this factory
            this.long = resp[0].attributes.Longitude_;
            this.lat = resp[0].attributes.Latitude_;
                        
            // Convert the lat/long to pixel coordinates on the map
            const factoryMapPos = latLongToPixel(this.lat, this.long, window.innerWidth, window.innerHeight);
            this.x = factoryMapPos.x;
            this.y = factoryMapPos.y;            
            return;
        } catch(error) { 
            if (error instanceof TypeError) {
                //console.log(`No Coords found for ${this.English_Name} (${this.Factory_ID}) during the timeframe ${startYear} - ${endYear}`);
            } else { 
                //console.error(`Error occured getting OBJECTID for ${this.English_Name} (${this.Factory_ID}) during the timeframe ${startYear} - ${endYear}:`, error);
            }
        }
    }
}

