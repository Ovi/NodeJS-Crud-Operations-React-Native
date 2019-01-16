import React from 'react';
import { Text } from 'react-native';

const MyText = props => {
	const { textStyle } = styles;
	const { children, style } = props;

	return <Text style={(textStyle, style)}>{children}</Text>;
};

const styles = {
	textStyle: {
		fontFamily: 'Arial'
	}
};

export default MyText;
