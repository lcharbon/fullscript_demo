// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import settings from '../../settings/settings';
import $T from '../../support/translations.js';

// Components

// Styles
import styles from './PaletteDisplay.module.scss';

class PaletteDisplay extends Component {
    styles = { ...this.styles, ...styles };
    
    constructor(props, context) {
        super(props, context);

        this.state = {
            isProcessing: true
        }
    }

    async componentDidMount() {
        await this.props.palette.extractSwatches();

        this.setState({
            isProcessing: false
        })
    }

    renderSwatch(shade) {
        let color = this.props.palette[shade] || "";

        return (
            <div 
                key={shade}
                className={ this.styles["swatch"] }
            >
                <Link 
                    to={'/swatch/' + color.replace("#", '')}
                    className={ this.styles["color"] }
                    style={{backgroundColor: color}}
                >
                </Link>
                <div className={ this.styles["name"] }>
                    { $T(shade) }
                </div>
            </div>
        )
    }
    
    render() {
        return (
            <div className={ this.styles["main"] }>
                <div className={ this.styles["inner"] }>
                    <img 
                        src={ this.props.palette.photoURL }
                        className={ this.styles["photo"] }
                        alt={$T("3")}
                    />
                     <div className={ this.styles["swatches"] }>
                        { settings.shades.map(this.renderSwatch.bind(this)) }
                    </div>
                </div>
            </div>
        )
	}
}

export default PaletteDisplay;
