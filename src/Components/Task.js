/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
	Text,
	View,
	CheckBox,
	TouchableOpacity,
	Image,
	ToastAndroid,
	ActivityIndicator
} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class Task extends Component {
	state = {
		deleting: false,
		swiped: false
	};

	updateChecked = () => {
		const {
			task: { checked, _id: id },
			getTasks
		} = this.props;

		// eslint-disable-next-line no-undef
		fetch('https://mrtodos.herokuapp.com/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				checked: !checked
			})
		})
			.then(() => getTasks())
			.catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));
	};

	deleteTask = () => {
		const {
			task: { _id: id },
			getTasks
		} = this.props;

		this.setState({ deleting: true });

		// eslint-disable-next-line no-undef
		fetch('https://mrtodos.herokuapp.com/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		})
			.then(() => {
				getTasks();
				this.setState({ deleting: false });
			})
			.catch(err => {
				this.setState({ deleting: false });
				ToastAndroid.show(err.message, ToastAndroid.SHORT);
			});
	};

	render() {
		const { task } = this.props;

		const deleteBtn = this.state.deleting ? (
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
			<TouchableOpacity
				onPress={this.deleteTask}
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#fff',
					position: 'absolute',
					right: 0,
					width: 40,
					top: 1,
					height: '95%'
				}}
			>
				<Image
					style={{ width: 20, height: 20 }}
					source={{
						uri: 'https://img.icons8.com/material-outlined/20/333333/trash.png'
					}}
				/>
			</TouchableOpacity>
		);
		const swipeoutBtns = [
			{
				component: (
					<View
						style={{
							height: 65,
							width: 75,
							borderBottomWidth: 1,
							borderBottomColor: 'rgba(0,0,0,.3)'
						}}
					>
						{deleteBtn}
					</View>
				),
				backgroundColor: '#fff'
			}
		];

		return (
			<Swipeout
				style={{ backgroundColor: '#fff' }}
				disabled={task.checked}
				autoClose
				right={swipeoutBtns}
				onOpen={() => this.setState({ swiped: true })}
				onClose={() => this.setState({ swiped: false })}
			>
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
						<CheckBox
							style={{ margin: 8 }}
							value={task.checked}
							onValueChange={this.updateChecked}
						/>
						<TouchableOpacity onPress={this.updateChecked}>
							<Text
								style={{
									width: 'auto',
									minWidth: 250,
									marginLeft: -5,
									fontSize: 16,
									textDecorationLine: task.checked ? 'line-through' : 'none'
								}}
							>
								{task.task}
							</Text>
						</TouchableOpacity>
					</View>

					{task.checked
						? deleteBtn
						: !this.state.swiped && (
								<TouchableOpacity
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: '#fff',
										position: 'absolute',
										right: 0,
										width: 40,
										top: 1,
										height: '95%'
									}}
									onPress={() => ToastAndroid.show('Swipe', ToastAndroid.SHORT)}
								>
									<Text
										style={{
											color: '#333',
											fontSize: 20,
											fontWeight: 'bold',
											marginBottom: 10
										}}
									>
										&#x21E2;
									</Text>
								</TouchableOpacity>
						  )}
				</View>
			</Swipeout>
		);
	}
}
