import React, { Component } from 'react';

import { Text, View } from 'react-native';

import { QRCode } from 'react-native-custom-qr-codes-expo';

import addFriendStyles from '../styles/addFriend.scss';

class SuperviseNewQr extends Component {
	constructor(props) {
		super(props);
		var routeParams = this.props.navigation.route.params;

		this.state = {
			userId: routeParams.userId
		};
	}

	render() {
		return (
			<View style={addFriendStyles.container}>
				<View style={addFriendStyles.QRcodeNew}>
					<QRCode content={this.state.userId} codeStyle="circle" innerEyeStyle="circle" />
				</View>
			</View>
		);
	}
}

export default function(navigation) {
	return <SuperviseNewQr navigation={navigation} />;
}
