// Core
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './ui.module.scss';

// Compoenents
import SearchView from './components/SearchView/SearchView';
import DarkRoomView from './components/DarkRoomView/DarkRoomView';

function UI() {
  return (
	<Router>
		<div className="App">
			<SearchView/>
			<Route exact path="/swatch/:colorHex" component={DarkRoomView}/>
		</div>
	</Router>
  );
}

export default UI;
