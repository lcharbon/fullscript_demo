const expect = require('chai').expect
const checkHex = require('../helpers/check_hex');

describe ("Search for photo keywords", () => {
    before(() => {
        browser.url('/');
        browser.react$('InputSearch').$('input').addValue("aliens");
    });
    
    it ('displays list of palettes', () => {
        browser.waitUntil(() =>  browser.react$$('PaletteDisplay').length > 0);
    })

    it ('displays valid swatches for each palette', () => {
        browser.waitUntil(() => browser.react$$('PaletteDisplay').length > 0);
        browser.react$$('PaletteDisplay').forEach((paletteElement) => {
            paletteElement.$$('.PaletteDisplay-module__color').forEach((swatchElement) => {
                browser.waitUntil(() => checkHex(swatchElement.getCSSProperty('background-color').parsed.hex))
            })
        })
    })
})

describe ("Page is scrolled to bottom", () => {
    before(() => {
        browser.url('/');
        browser.react$('InputSearch').$('input').addValue("aliens");
    });
    
    it ("loads additional palettes", () => {
        browser.waitUntil(() => browser.react$$('PaletteDisplay').length > 0);

        let paletteElements = browser.react$$('PaletteDisplay');
        
        paletteElements[paletteElements.length -1].scrollIntoView();

        browser.waitUntil(() => browser.react$$('PaletteDisplay').length > 10);
    })
})

describe ("Individual swatch", () => {
    before(() => {
        browser.url('/');
        browser.react$('InputSearch').$('input').addValue("aliens");
    });

    it ("is displayed when clicked on a palette", () => {
        browser.waitUntil(() =>  browser.react$$('PaletteDisplay').length > 0);

        let paletteElement = browser.react$$('PaletteDisplay')[0];

        browser.waitUntil(() => {
            swatchElement = paletteElement.$$('.PaletteDisplay-module__color')[0];

            return checkHex(swatchElement.getCSSProperty('background-color').parsed.hex);
        });

        swatchElement.click();

        let swatchColor = browser.$('.DarkRoomView-module__color').getCSSProperty('background-color').parsed.hex;

        expect(checkHex(swatchColor)).to.be.true;
        expect(browser.getUrl()).to.include('/swatch/' + swatchColor.replace('#', ''));
    })
})