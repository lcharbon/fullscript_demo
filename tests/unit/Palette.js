import Palette from '../../src/models/Palette.js';

require('jsdom-global')('', { resources: "usable" });

const expect = require('chai').expect;
const checkHex = require('../helpers/check_hex');

global.fetch = require("node-fetch");

resources: "usable"

describe("Palette", () => {

    it ("can be created from searched photos", async () => {
        let palettes = await Palette.search("Aliens", 1);

        expect(palettes.length).to.eq(10);

        palettes.forEach((palette) => {
            expect(palette.photoURL).to.exist
        })
    })

    xit ("can extract swatches from photo", async () => {
        let palettes = await Palette.search("Aliens", 1);
        let palette = palettes[0];

        await palette.extractSwatches();

        expect(checkHex(palette.vibrant)).to.be.true
        expect(checkHex(palette.lightVibrant)).to.be.true
        expect(checkHex(palette.darkVibrant)).to.be.true
        expect(checkHex(palette.muted)).to.be.true
        expect(checkHex(palette.lightMuted)).to.be.true
        expect(checkHex(palette.darkMuted)).to.be.true
    })
})

