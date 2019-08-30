// Core
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import UI from './ui';

class PaletteGenerator {
    uiDOM = ReactDOM.render(<UI />, document.getElementById('root'));
}

const paletteGenerator = new PaletteGenerator();

export default paletteGenerator;
