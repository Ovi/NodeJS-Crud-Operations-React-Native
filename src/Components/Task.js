import React, { Component } from 'react';
import { Text, View, CheckBox, TouchableOpacity, Image } from 'react-native';

export default class Task extends Component {
	state = {};

	setPriorityColor = priority => {
		let color;
		switch (priority) {
			case 'normal':
				color = '#4F80FE';
				break;
			case 'low':
				color = 'yellow';
				break;
			case 'high':
				color = 'darkred';
				break;
			default:
				color = '#4F80FE';
				break;
		}
		return color;
	};

	render() {
		const { task } = this.props;
		return (
			<View
				style={{
					height: 80,
					padding: 5,
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
					borderBottomWidth: 1,
					borderBottomColor: this.state.checked ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.3)'
				}}
			>
				<View style={{ position: 'relative' }}>
					<Text
						style={{
							position: 'absolute',
							bottom: 5,
							color: this.state.checked ? 'lightgray' : 'black',
							paddingLeft: 8,
							textDecorationLine: this.state.checked ? 'line-through' : 'none'
						}}
					>
						{task.task}
					</Text>
					<Text
						style={{
							fontSize: 13,
							color: this.state.checked ? 'lightgray' : 'gray',
							marginLeft: 8,
							position: 'absolute',
							bottom: -16
						}}
					>
						Today
					</Text>
					<View style={{ position: 'absolute', bottom: -33 }}>
						<Text
							style={{
								fontSize: 13,
								color: this.state.checked ? 'lightgray' : '#333',
								marginLeft: 25
							}}
						>
							{task.time}
						</Text>
						<View
							style={{
								position: 'absolute',
								bottom: 3,
								left: 8,
								height: 10,
								width: 10,
								borderRadius: 100,
								backgroundColor: this.setPriorityColor(task.priority)
							}}
						/>
					</View>
				</View>
				<View>
					<View
						style={{
							height: 60,
							padding: 0,
							justifyContent: 'space-around',
							alignItems: 'center'
						}}
					>
						<CheckBox
							value={this.state.checked}
							onValueChange={() => this.setState({ checked: !this.state.checked })}
						/>
						{/* <Text>BB</Text> */}
					</View>
					{this.state.checked && (
						<TouchableOpacity
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: -15
							}}
						>
							<Image
								style={{ width: 20, height: 20 }}
								source={{
									uri: 'https://img.icons8.com/material-outlined/20/D3D3DB/trash.png'
								}}
							/>
						</TouchableOpacity>
					)}
				</View>
			</View>
		);
	}
}
