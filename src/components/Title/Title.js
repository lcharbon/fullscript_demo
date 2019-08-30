// Core
import React, { Component } from 'react';

// Components

// Styles
import styles from './Title.module.scss';

class Title extends Component {
    styles = { ...this.styles, ...styles };
    
    render() {
        return (
            <div className={ this.styles["main"] }>
                <span>P</span>
                <span>a</span>
                <span>l</span>
                <span>e</span>
                <span>t</span>
                <span>t</span>
                <span>e</span>
                <span>s</span>
            </div>
        )
	}
}

export default Title;
