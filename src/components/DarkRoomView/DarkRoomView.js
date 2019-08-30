// Core
import React, { Component } from 'react';

// Components

// Styles
import styles from './DarkRoomView.module.scss';

class DarkRoomView extends Component {
    styles = { ...this.styles, ...styles };

    handleOverlayCLick() {
        this.props.history.replace("/")
    }
    
    render() {
        let colorHex =  "#" + this.props.match.params.colorHex;

        return (
            <div className={ this.styles["overlay"] }
                onClick={ this.handleOverlayCLick.bind(this) }
            >
                <div 
                    className={ this.styles["main"] }
                >
                    <div 
                        className={ this.styles["color"] }
                        style={{backgroundColor: colorHex }}
                    >
                    </div>
                    <div className={ this.styles["hex"] }>
                        { colorHex.toUpperCase() }
                    </div>
                </div>
            </div>
        )
	}
}

export default DarkRoomView;
