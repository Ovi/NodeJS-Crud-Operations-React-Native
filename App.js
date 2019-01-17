import React, { Component } from 'react';
import { View } from 'react-native';
import Dashboard from './src/Screens/Dashboard';

export default class App extends Component {
	render() {
		const { viewStyle } = styles;

		return (
			<View style={viewStyle}>
				<Dashboard />
				{/* <AddTodo /> */}
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		flex: 1,
		backgroundColor: '#4F80FE',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		position: 'relative'
	}
};
