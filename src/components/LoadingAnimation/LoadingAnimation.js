// Core
import React, { Component } from 'react';
import $T from '../../support/translations.js';

// Components

// Icons
import { ReactComponent as Palette} from '../../graphics/palette.svg';

// Styles
import styles from './LoadingAnimation.module.scss';

class LoadingAnimation extends Component {
    styles = { ...this.styles, ...styles };
    
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        return (
            <div className={ this.styles["main"] }>
                <Palette/>
            </div>
        )
	}
}

export default LoadingAnimation;
