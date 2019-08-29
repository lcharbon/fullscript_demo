import React, { Component } from 'react'
import styles from './InputSearch.module.scss'

class InputSearch extends Component {
	static type = "text";
	styles = styles;


	handleChange(event) {
		let value = event.target.value;

		event.preventDefault();
		this.props.onchange(value);
	}

	hasContent() {
		return Boolean(this.props.value);
	}

	inputElement() {
		return (
			<input 
				className={ this.hasContent()? this.styles["input-filled"] : this.styles["input"] } 
				placeholder={ this.props.placeholder }
				onChange={ this.handleChange.bind(this) } 
				type={ this.props.type || this.constructor.type }
				value={ this.props.value }
				autoComplete={ this.props.autocomplete? "on" : "new-password" }
			/>
		)
	}

	compileMainClasses() {
		let classes = [this.styles["main"]];
		let width = this.props.inputWidth;

		if (width) {
			classes.push(this.styles["width-" + width]);
			classes.push(this.styles["defined-size"]);
		}

		return classes.join(" ");
	}

	render() {
		let isValid = !(this.props.validationErrors && this.props.validationErrors[this.props.dataKey])
		
		return (
			<div className={ this.compileMainClasses() }>
				<div className={ this.styles["text-area"] }>
					<label className={ this.hasContent()? (isValid? this.styles["placeholder"]: this.styles["placeholder-invalid"]): this.styles["placeholder-hidden"] }>{ this.props.placeholder }</label>
					{ this.inputElement() }
				</div>
				<div className={ this.styles["error-section"] }>
					<div className={ this.styles["error-message"] }>
						{ this.props.validationErrors && this.props.validationErrors[this.props.dataKey] }
					</div>
				</div>
			</div>
		)
	}
}

export default InputSearch