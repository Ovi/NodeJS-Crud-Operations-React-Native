import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
	ActivityIndicator
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class AddTodo extends Component {
	state = {
		taskText: '',
		showAddBox: false,
		addingTodo: false
	};

	newTodo = () => {
		this.setState({ showAddBox: !this.state.showAddBox });
		this.props.addingTodo(!this.state.showAddBox);
	};

	addTodo = () => {
		const { taskText } = this.state;
		const deviceId = DeviceInfo.getUniqueID();

		if (taskText) {
			this.setState({ addingTodo: true });
			// eslint-disable-next-line no-undef
			fetch('https://mrtodos.herokuapp.com/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					task: taskText,
					checked: false,
					deviceId
				})
			})
				.then(() => {
					ToastAndroid.show('Task Added!', ToastAndroid.SHORT);
					this.props.getTasks();
					this.newTodo();
					this.setState({
						taskText: '',
						addingTodo: false
					});
				})
				.catch(err => {
					ToastAndroid.show(err.message, ToastAndroid.SHORT);
					this.newTodo();
					this.setState({ addingTodo: false });
				});
		} else {
			this.newTodo();
		}
	};

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.newTodo}>
					<View
						style={{
							borderBottomWidth: 1,
							borderBottomColor: 'rgba(0,0,0,.5)',
							alignItems: 'center',
							flexDirection: 'row',
							padding: 5
						}}
					>
						<Text style={{ color: '#4F80FE', fontSize: 40, marginLeft: 20 }}>+ </Text>
						<Text
							style={{
								color: '#333',
								fontSize: 20,
								fontWeight: 'bold',
								marginTop: 5
							}}
						>
							Add a task
						</Text>
					</View>
				</TouchableOpacity>
				{this.state.showAddBox && (
					<View
						style={{
							position: 'relative',
							height: 65,
							borderBottomWidth: 1,
							borderBottomColor: 'rgba(0,0,0,.3)',
							marginBottom: 2,
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<View
							style={{
								alignItems: 'center',
								flexDirection: 'row'
							}}
						>
							<TextInput
								style={{
									height: 65,
									fontSize: 18,
									width: 'auto',
									minWidth: 250,
									marginLeft: 8
								}}
								onChangeText={taskText => this.setState({ taskText })}
								value={this.state.taskText}
								placeholder="Start typing"
								maxLength={35}
								onEndEditing={this.addTodo}
							/>
						</View>

						{this.state.addingTodo ? (
							<View
								style={{
									height: '100%',
									padding: 10,
									justifyContent: 'center'
								}}
							>
								<ActivityIndicator size="small" color="#4F80FE" />
							</View>
						) : (
							<TouchableOpacity onPress={this.addTodo}>
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										height: 30,
										width: 30,
										marginRight: 5,
										alignSelf: 'center',
										borderWidth: 1,
										borderColor: 'rgba(0,0,0,.3)',
										borderRadius: 100
									}}
								>
									<Text style={{ color: '#333' }}>&#x2713;</Text>
								</View>
							</TouchableOpacity>
						)}
					</View>
				)}
			</View>
		);
	}
}
