import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Header extends Component {
	render() {
		const { textStyle, viewStyle } = styles;

		return (
			<View style={viewStyle}>
				<Text style={textStyle}>ToDox</Text>
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		backgroundColor: 'teal',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		shadowOffset: { width: 0, height: 2 },
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20,
		color: 'white'
	}
};
