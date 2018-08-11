import React, {Component} from 'react';

// Styles
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
                <button onClick={this.handleLunch}>Lunch</button>
			</div>
		);
	}

	handleLunch() {
		const data = JSON.stringify({
			"description": "Taco Tuesday",
			"items": [
				{
					"name": "Taco",
					"itemType": "main",
					"allergy": "A lot of allergies are here."
				}
			]
		});

		fetch('https://knightlife-server.herokuapp.com/api/submit/lunch?date=2018-08-10&data=' + data);
	}
}

export default App;