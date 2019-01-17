import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';
import AddTodo from './AddTodo';
import Task from '../Components/Task';

export default class Dashboard extends Component {
	state = {
		showAddBox: false
	};

	showAddBox = bool => {
		this.setState({ showAddBox: bool });
	};

	render() {
		const {
			mainViewStyle,
			innerViewStyle,
			headerViewStyle,
			headingDayText,
			headingDateText,
			headingMonthText,
			scrollViewStyle,
			addTaskBtn
		} = styles;

		return (
			<View style={mainViewStyle}>
				<View style={innerViewStyle}>
					<View style={headerViewStyle}>
						<Text style={headingDayText}>
							{moment().format('dddd')},{' '}
							<Text style={headingDateText}>{moment().format('Do')}</Text>
						</Text>
						<Text style={headingMonthText}>{moment().format('MMMM, YYYY')}</Text>

						<TouchableOpacity style={addTaskBtn} onPress={() => this.showAddBox(true)}>
							<Text style={{ fontSize: 35, color: '#fff' }}>+</Text>
						</TouchableOpacity>
					</View>

					<ScrollView style={scrollViewStyle}>
						<Task
							task={{
								task: 'This will be a todo hurrat im adding more here',
								time: '9:15PM',
								priority: 'low'
							}}
						/>
						<Task
							task={{
								task: 'This will be a todo hurrat im adding more here',
								time: '9:15PM',
								priority: 'normal'
							}}
						/>
						<Task
							task={{
								task: 'This will be a todo hurrat im adding more here',
								time: '9:15PM',
								priority: 'high'
							}}
						/>
					</ScrollView>
				</View>

				{this.state.showAddBox && <AddTodo showAddBox={this.showAddBox} />}
			</View>
		);
	}
}

const styles = {
	mainViewStyle: {
		position: 'absolute',
		flex: 1,
		height: '100%',
		width: '100%',
		top: 10,
		left: 10,
		backgroundColor: '#fff',
		borderRadius: 5
	},
	innerViewStyle: {
		flex: 1,
		position: 'relative'
	},
	headerViewStyle: {
		backgroundColor: '#fcfcfc',
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 25,
		paddingBottom: 25,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		elevation: 2
	},
	scrollViewStyle: {
		flex: 1,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		paddingBottom: 5
	},
	headingDayText: { fontSize: 25, fontWeight: '600', color: '#4F80FE' },
	headingDateText: { fontSize: 24, fontWeight: '100', color: '#4F80FE' },
	headingMonthText: { color: '#999' },
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
