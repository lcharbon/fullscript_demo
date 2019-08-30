// Core
import settings from '../settings/settings'
import { toJson } from "unsplash-js";
import Unsplash from 'unsplash-js';
import * as Vibrant from 'node-vibrant'

// Models
import Model from './Model';

const upslash = new Unsplash({
    applicationId: settings.accessKey,
    secret: settings.secretKey,
});

class Palette extends Model {
    static store = {};
    static attributes = [...this.attributes, ...settings.shades, "photoURL"];
    static currentSearch = "";
    static pageLimit = 10;
    
    static async search(search, page) {
        let paletteData;
        let photos = [];

        if (search !== this.currentSearch) this.flushStore();

        this.currentSearch = search;
        
        photos = (await upslash.search.photos(search, page, this.pageLimit).then(toJson)).results;

        return photos.map((photoData) => {
            let palette = new this({
                id: photoData.id,
                photoURL: photoData.urls.regular
            })

            palette.store();

            return palette;
        });
    }

    extractSwatches() {
        return new Promise((resolve, reject) => {
            let imgDOM =  document.createElement('img');

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            
            imgDOM.setAttribute('crossOrigin', 'anonymous')
            imgDOM.src = this.photoURL;
    
            imgDOM.onload = async () => {
                let vibrant = new Vibrant(imgDOM);
                let vibrantOutput = await vibrant.getPalette();
                let shade = "";

                for (shade of settings.shades) {
                    this[shade] = vibrantOutput[capitalizeFirstLetter(shade)].getHex();
                }
                
                resolve();
            }
        }) 
    }
}

export default Palette;