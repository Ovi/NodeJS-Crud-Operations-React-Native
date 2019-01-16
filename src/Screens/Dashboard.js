import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';

export default class Dashboard extends Component {
	render() {
		const { textStyle, viewStyle, scrollViewStyle, addTaskBtn } = styles;

		return (
			<View style={viewStyle.main}>
				<View style={viewStyle.header}>
					<Text style={textStyle.heading.day}>
						{moment().format('dddd')},{' '}
						<Text style={textStyle.heading.date}>{moment().format('Do')}</Text>
					</Text>
					<Text style={textStyle.heading.month}>{moment().format('MMMM, YYYY')}</Text>
					<TouchableOpacity style={addTaskBtn}>
						<Text style={{ fontSize: 35, color: '#fff' }}>+</Text>
					</TouchableOpacity>
				</View>
				<ScrollView style={scrollViewStyle}>
					<Text>Hi From Dashboard</Text>
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		main: {
			flex: 1,
			backgroundColor: '#fff',
			// paddingLeft: 10,
			// paddingRight: 10,
			// paddingTop: 10,
			// paddingBottom: 10,
			borderRadius: 5,
			position: 'relative'
		},
		header: {
			backgroundColor: '#fcfcfc',
			paddingLeft: 25,
			paddingRight: 25,
			paddingTop: 25,
			paddingBottom: 25,
			borderTopLeftRadius: 5,
			borderTopRightRadius: 5
		}
	},
	scrollViewStyle: {
		flex: 1,
		borderWidth: 1,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5
	},
	textStyle: {
		heading: {
			day: {
				fontSize: 25,
				fontWeight: '600',
				color: '#4F80FE'
			},
			date: {
				fontSize: 24,
				fontWeight: '100',
				color: '#4F80FE'
			},
			month: {
				// fontWeight: '100',
				color: '#999'
			}
		}
	},
	addTaskBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50,
		backgroundColor: '#EB4A8A',
		borderRadius: 100,
		position: 'absolute',
		top: 25,
		right: 25,
		elevation: 4,
		zIndex: 2
	}
};
