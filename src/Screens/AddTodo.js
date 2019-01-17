import React, { Component } from 'react';
import {
	Text,
	View,
	TimePickerAndroid,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
	Picker
} from 'react-native';
import moment from 'moment-timezone';

export default class AddTodo extends Component {
	state = {
		taskText: '',
		taskTime: moment().format('h:mm A'),
		priority: 'normal'
	};

	componentDidMount = () => {
		this.setState({
			taskText: '',
			taskTime: moment().format('h:mm A'),
			priority: 'normal'
		});
	};

	openTimePicker = async () => {
		try {
			const { action, hour, minute } = await TimePickerAndroid.open();
			if (action !== TimePickerAndroid.dismissedAction) {
				this.setState({ taskTime: moment(`${hour}-${minute}`, 'H-m').format('h:mm A') });
			}
		} catch ({ code, message }) {
			console.warn('Cannot open time picker', message);
		}
	};

	addTodo = () => {
		const { taskText, taskTime } = this.state;
		if (!taskTime) {
			ToastAndroid.show('Todo time is required! Ofcourse!', ToastAndroid.SHORT);
			return;
		}
		if (!taskText) {
			ToastAndroid.show('Todo text is required! Ofcourse!', ToastAndroid.SHORT);
			return;
		}
		console.log('adding todo...', { taskTime, taskText });
	};

	render() {
		const { mainViewStyle, addTaskBtn } = styles;

		return (
			<View style={mainViewStyle}>
				<View
					style={{
						width: '80%',
						maxWidth: 300,
						padding: 20,
						backgroundColor: '#fff',
						borderRadius: 5,
						position: 'relative',
						minHeight: 320,
						borderWidth: 0.5
					}}
				>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 24,
							fontWeight: '600',
							color: '#4F80FE',
							marginBottom: -10
						}}
					>
						add
					</Text>
					<Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '600', color: '#EB4A8A' }}>
						new task
					</Text>
					<TextInput
						style={{
							height: 40,
							borderBottomWidth: 1,
							borderBottomColor: 'gray'
						}}
						onChangeText={text => this.setState({ taskText: text })}
						value={this.state.taskText}
						placeholder="What?"
						maxLength={40}
					/>
					<TextInput
						style={{
							height: 40,
							borderBottomWidth: 1,
							borderBottomColor: 'gray'
						}}
						value={this.state.taskTime}
					/>
					<TouchableOpacity
						style={{
							backgroundColor: '#EB4A8A',
							padding: 5,
							paddingLeft: 10,
							paddingRight: 10,
							width: 105,
							marginTop: 10,
							borderRadius: 5
						}}
						onPress={this.openTimePicker}
					>
						<Text style={{ color: '#fff' }}>Change Time</Text>
					</TouchableOpacity>

					<Text style={{ marginBottom: -10, marginTop: 10, marginLeft: 8 }}>Priority: </Text>
					<Picker
						selectedValue={this.state.priority}
						style={{ width: '100%', marginBottom: 10 }}
						onValueChange={itemValue => this.setState({ priority: itemValue })}
					>
						<Picker.Item label="Normal" value="normal" />
						<Picker.Item label="Low" value="low" />
						<Picker.Item label="High" value="high" />
					</Picker>

					<TouchableOpacity
						onPress={() => this.props.showAddBox(false)}
						style={{
							position: 'absolute',
							top: -10,
							right: -10,
							backgroundColor: 'gray',
							width: 35,
							height: 35,
							borderRadius: 10,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ fontSize: 30, color: 'white' }}>&#215;</Text>
					</TouchableOpacity>
					<TouchableOpacity style={addTaskBtn} onPress={this.addTodo}>
						<Text style={{ fontSize: 35, color: '#fff' }}>&#43;</Text>
					</TouchableOpacity>
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
		top: 0,
		left: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.9)',
		// backgroundColor: 'red',
		borderRadius: 5
	},
	addTaskBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 60,
		backgroundColor: '#4F80FE',
		borderRadius: 100,
		position: 'absolute',
		bottom: -20,
		right: 15,
		elevation: 4,
		zIndex: 2
	}
};
