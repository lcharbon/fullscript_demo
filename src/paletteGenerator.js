// Core
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import settings from './settings/settings';
import Unsplash from 'unsplash-js';

// Components
import './index.css';
import UI from './ui';

class PaletteGenerator {
    uiDOM = ReactDOM.render(<UI />, document.getElementById('root'));
    upslash = new Unsplash({
        applicationId: settings.accessKey,
        secret: settings.secretKey,
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const paletteGenerator = new PaletteGenerator();

export default paletteGenerator;
