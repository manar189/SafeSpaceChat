import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View, StyleSheet, Alert } from 'react-native';
import { Switch } from 'react-native-switch';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { QRCode } from 'react-native-custom-qr-codes-expo';

import addFriendStyles from '../styles/addFriend.scss';
import addFriend from '../connections/addFriend.js';

/*
    I brist på andra ikoner satte jag dessa tillfälligt.
*/

export default class AddFriend extends Component {
	constructor(props) {
		super(props);
		var routeParams = this.props.route.params;

		this.state = {
			hasCameraPermission: null,
			scanned: false,
			camera: true,
			userId: routeParams.userId
		};
	}
	async componentDidMount() {
		this.getPermissionsAsync();
	}

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			hasCameraPermission: status === 'granted'
		});
	};

	// componentDidMount() {
	//   const dummy = {
	//     userOne: '5e843ddbbd8a99081cd3f613',
	//     userTwo: '5ea2ebde64064b3cfc0dfc4a',
	//   }
	//   addFriend(dummy);
	// }

	changeView(bool) {
		this.setState({ camera: bool });
	}

	render() {
		const { hasCameraPermission, scanned } = this.state;

		const ICON_ACTIVE_COLOR = '#4499A9';
		const ICON_INACTIVE_COLOR = '#C2C2C2';
		const BACKGROUND_COLOR = '#FFFFFF';
		const CIRCLE_COLOR = '#707070';

		var instructions = '';
		var colorCodeIcon = '';
		var colorCameraIcon = '';
		var switchStyle = '';
		var boxStyle = '';
		var instructionsStyle = '';

		if (this.state.camera) {
			instructions = 'Skanna en QR-kod';
			colorCameraIcon = ICON_ACTIVE_COLOR;
			colorCodeIcon = ICON_INACTIVE_COLOR;
			switchStyle = addFriendStyles.switchCamera;
			boxStyle = addFriendStyles.instructionBoxCamera;
			instructionsStyle = addFriendStyles.instructionsCamera;
		} else {
			instructions = 'Din QR-kod';
			colorCameraIcon = ICON_INACTIVE_COLOR;
			colorCodeIcon = ICON_ACTIVE_COLOR;
			switchStyle = addFriendStyles.switchQR;
			boxStyle = addFriendStyles.instructionBoxQR;
			instructionsStyle = addFriendStyles.instructionsQR;
		}

		if (hasCameraPermission === null) {
			return <Text> Requesting for camera permission </Text>;
		}
		if (hasCameraPermission === false) {
			return <Text> No access to camera </Text>;
		}

		return (
			<View style={addFriendStyles.container}>
				{this.state.camera && (
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject}
					/>
				)}

				{!this.state.camera &&
				setInterval(() => this.state.interval) && (
					<View style={addFriendStyles.QRcode}>
						<QRCode content={this.state.userId} codeStyle="circle" innerEyeStyle="circle" />
					</View>
				)}

				<View style={boxStyle}>
					<Text style={instructionsStyle}>{instructions}</Text>
					<View style={switchStyle}>
						<FontAwesome name="qrcode" size={40} color={colorCodeIcon} style={{ marginRight: 5 }} />
						<Switch
							value={this.state.camera}
							onValueChange={(val) => this.setState({ camera: val })}
							circleSize={40}
							circleBorderWidth={1}
							circleBorderColor={BACKGROUND_COLOR}
							circleActiveColor={CIRCLE_COLOR}
							circleInActiveColor={CIRCLE_COLOR}
							backgroundInactive={BACKGROUND_COLOR}
							backgroundActive={BACKGROUND_COLOR}
						/>
						<FontAwesome name="camera" size={37} color={colorCameraIcon} style={{ marginLeft: 5 }} />
					</View>
				</View>
			</View>
		);
	}

	handleBarCodeScanned = ({ type, data }) => {
		this.setState({
			scanned: true
		});

		if (addFriend({ userOne: this.state.userId, userTwo: data })) {
			Alert.alert('Du har lagt till en ny kontakt');
		}
	};
}
