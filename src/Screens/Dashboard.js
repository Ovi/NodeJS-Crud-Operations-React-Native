import React, { Component } from 'react';
import { Text, View, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import moment from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import Task from '../Components/Task';
import AddTodo from './AddTodo';

export default class Dashboard extends Component {
	state = {
		addingTodo: false,
		newTaskText: '',
		todos: [],
		todosLoading: true
	};

	componentDidMount() {
		this.getTasks();
	}

	getTasks = () => {
		const deviceId = DeviceInfo.getUniqueID();

		// eslint-disable-next-line no-undef
		fetch(`https://mrtodos.herokuapp.com/get?id=${deviceId}`)
			.then(res => res.json())
			.then(res => {
				this.setState({ todos: res.todos, todosLoading: false });
			})
			.catch(err => {
				ToastAndroid.show(err.message, ToastAndroid.SHORT);
			});
	};

	addingTodo = bool => {
		this.setState({ addingTodo: bool });
	};

	renderTodos = () => {
		const { todos, todosLoading, addingTodo } = this.state;

		const NoTask = (
			<View
				style={{
					alignSelf: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: 25
				}}
			>
				<Text>No Task</Text>
				<Text>Tap above to add one!</Text>
			</View>
		);

		const activityIndicator = (
			<View
				style={{
					alignSelf: 'center',
					alignItems: 'center',
					padding: 25
				}}
			>
				<ActivityIndicator size="large" color="#4F80FE" />
			</View>
		);

		if (!todos.length) {
			console.log(todos);
			if (todosLoading) {
				return activityIndicator;
			} else if (!addingTodo) {
				return NoTask;
			}
		}
		// eslint-disable-next-line no-underscore-dangle
		return todos.map(todo => <Task getTasks={this.getTasks} key={todo._id} task={todo} />);
	};

	render() {
		const {
			mainViewStyle,
			innerViewStyle,
			headerViewStyle,
			headingDayText,
			headingDateText,
			headingMonthText,
			scrollViewStyle
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

						<Text
							style={{
								fontSize: 15,
								color: 'rgba(0,0,0,.5)',
								position: 'absolute',
								right: 30,
								top: 40
							}}
						>
							{this.state.todos.length} Tasks
						</Text>
						<Text
							style={{
								fontSize: 15,
								color: 'rgba(0,0,0,.5)',
								position: 'absolute',
								right: 30,
								top: 55
							}}
						>
							{this.state.todos.filter(todo => !todo.checked).length} Pending
						</Text>
					</View>

					<AddTodo addingTodo={this.addingTodo} getTasks={this.getTasks} />
					<ScrollView style={scrollViewStyle}>{this.renderTodos()}</ScrollView>
				</View>
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
