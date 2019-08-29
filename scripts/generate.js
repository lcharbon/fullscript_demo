const fs = require('fs');
const mustache = require('mustache');

const type = process.argv[2];
const name = process.argv[3];

const type2Config = {
    screen: {
        JSTemplate: "Screen.js.mustache",
        CSSTemplate: "Screen.scss.mustache",
        mkdir: true,
        exportPath: `../src/screens/`,
        data: {
            name: name
        }
    },
    view: {
        JSTemplate: "View.js.mustache",
        CSSTemplate: "View.scss.mustache",
        mkdir: true,
        exportPath: `../src/views/`,
        data: {
            name: name
        }
    },
    component: {
        JSTemplate: "Component.js.mustache",
        CSSTemplate: "Component.scss.mustache",
        mkdir: true,
        exportPath: `../src/components/`,
        data: {
            name: name
        }
    },
    test_view: {
        JSTemplate: "TestView.js.mustache",
        exportPath: `../tests/test_views/`,
        data: {
            name: name,
            namePascal: name.replace("Test", ""),
            nameCamel: function() {
                let shortName = name.replace("Test", "");

                return shortName.charAt(0).toLowerCase() + shortName.substring(1)
            }()
        }
    },
    test_component: {
        JSTemplate: "TestComponent.js.mustache",
        exportPath: `../tests/test_components/`,
        data: {
            name: name,
            namePascal: name.replace("Test", ""),
            nameCamel: function() {
                let shortName = name.replace("Test", "");

                return shortName.charAt(0).toLowerCase() + shortName.substring(1)
            }()
        }
    }
}

let config = type2Config[type];
let cwd = __dirname + "/" + config.exportPath + "/" + (config.mkdir ? name : "");



function validate() {
    let typeTitlized = type[0].toUpperCase() + type.slice(1);

    if (!type) {
        throw("Type must be provided as first argument.");
    }

    if (!name) {
        throw("Name must be provided as second argument.");
    }

    if (name === name.toLocaleLowerCase()) {
        throw(`${typeTitlized} name must be pascal case.`);
    }

    if (config.mkdir && fs.existsSync(cwd)) {
        throw(`${typeTitlized} already exists.`);
    }

    return true;
}

function generateJS() {
    let JSTemplateString = fs.readFileSync(`${__dirname}/../boilerplates/${config.JSTemplate}`, "utf8");
    let JSRenderedString = mustache.render(JSTemplateString, config.data);

    fs.writeFileSync(cwd + "/" + name + ".js",  JSRenderedString);
}

function generateCSS() {
    let CSSTemplateString = fs.readFileSync(`${__dirname}/../boilerplates/${config.CSSTemplate}`, "utf8");
    let CCSRenderedString = mustache.render(CSSTemplateString, config.data);

    fs.writeFileSync(cwd + "/" + name + ".module.scss",  CCSRenderedString);
}

function generate() {
    let path = "";

    if (config.mkdir) fs.mkdirSync(cwd);

    if (config.JSTemplate) generateJS();
    if (config.CSSTemplate) generateCSS();
}

if (validate()) generate();