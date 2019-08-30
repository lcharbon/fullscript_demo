import Model from '../../src/models/Model.js';

const expect = require('chai').expect;

describe("Model", () => {
    before(() => {
        (new Model({id: 123})).store();
        (new Model({id: 321})).store();
    })
    
    it ("can return all model in store", () => {
        let allModels = Model.all();

        expect(allModels.length).to.eq(2);

        allModels.forEach((model) => {
            expect(model instanceof Model).to.be.true
        })
    })

    it ("can be stored", () => {
        let model = new Model({id: "456"});

        model.store();

        expect(Model.all().length).to.eq(3);
    })

    it ("can set its attributes", () => {
        let model = new Model();
        let data = {id : "654"}

        model.setData(data);

        expect(model.id).to.eq("654");
    });


    it ("can modify its attributes", () => {
        let model = new Model();
        let data = {id : "789"}

        model.setData(data);

        expect(model.id).to.eq("789");
    });

    it ("can empty store", () => {
        Model.flushStore();

        expect(Model.all().length).to.eq(0);
    })
})

