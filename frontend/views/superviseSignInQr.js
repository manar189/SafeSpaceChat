import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';

import addFriendStyles from '../styles/addFriend.scss';

class SuperviseSignInQR extends Component {
	constructor(props) {
		super(props);
		var routeParams = this.props.navigation.route.params;

		this.state = {
			userId: routeParams.userId,
			name: routeParams.name,
			navigation: this.props.navigation.navigation
		};
	}

	render() {
		this.state.navigation.setOptions({ title: 'Logga in på nytt' });
		return (
			<View style={addFriendStyles.container}>
				<Text style={addFriendStyles.userName}>{this.state.name}</Text>

				{<QRCode content={this.state.userId} codeStyle="circle" innerEyeStyle="circle" />}
			</View>
		);
	}
}
export default function(navigation) {
	return <SuperviseSignInQR navigation={navigation} />;
}
