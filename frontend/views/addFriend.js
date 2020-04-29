import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';

import { Text, View, StyleSheet, Button } from 'react-native';
import { Switch } from 'react-native-switch';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';

import addFriendStyles from '../styles/addFriend.scss';
import addFriend from '../connections/addFriend.js';

/*
    I brist på andra ikoner satte jag dessa tillfälligt.
*/

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    // var routeParams = this.props.navigation.route.params;
    //console.log(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      camera: true,
      userId: '1234',
    };
  }
  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
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

    if (this.state.camera) {
      instructions = 'Skanna en QR-kod';
      colorCameraIcon = ICON_ACTIVE_COLOR;
      colorCodeIcon = ICON_INACTIVE_COLOR;
    } else {
      instructions = 'Din QR-kod';
      colorCameraIcon = ICON_INACTIVE_COLOR;
      colorCodeIcon = ICON_ACTIVE_COLOR;
    }

    if (hasCameraPermission === null) {
      return <Text> Requesting for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }
 
    return (
      <View style={addFriendStyles.container}>
        <View style={addFriendStyles.content}>
          <Text style={addFriendStyles.instructions}>{instructions}</Text>
          <View style={addFriendStyles.camera}>
            {/**********************************
             * Här ska kamera/QR-kod läggas in *
             * *********************************/}
            {this.state.camera && (
              <BarCodeScanner
                onBarCodeScanned={
                  scanned ? undefined : this.handleBarCodeScanned
                }
                style={StyleSheet.absoluteFillObject}
              />
            )}
            {!this.state.camera && setInterval(() => this.state.interval) && (
              <QRCode
                value={'Lägg till användare med userID: ' + this.state.userId}
                size={290}
                ecl="H"
              />
            )}
          </View>
          <View style={addFriendStyles.switch}>
            <EvilIcons name="image" size={50} color={colorCodeIcon} />
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
            <EvilIcons name="camera" size={50} color={colorCameraIcon} />
          </View>
        </View>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({
      scanned: true,
    });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
