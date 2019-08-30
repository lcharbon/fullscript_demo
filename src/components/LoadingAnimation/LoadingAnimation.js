// Core
import React, { Component } from 'react';

// Components

// Icons
import { ReactComponent as Palette} from '../../graphics/palette.svg';

// Styles
import styles from './LoadingAnimation.module.scss';

class LoadingAnimation extends Component {
    styles = { ...this.styles, ...styles };
    
    render() {
        return (
            <div className={ this.styles["main"] }>
                <Palette/>
            </div>
        )
	}
}

export default LoadingAnimation;
