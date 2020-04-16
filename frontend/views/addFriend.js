import React, { Component } from 'react';
import io from 'socket.io-client';
import { EvilIcons } from '@expo/vector-icons';

import { Text, View } from 'react-native';
import { Switch } from 'react-native-switch';

import config from '../../backend/config';

import addFriendStyles from '../styles/addFriend.scss';

/*
    I brist på andra ikoner satte jag dessa tillfälligt
*/

export default class AddFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      camera: true,
    };
  }

  changeView(bool) {
    this.setState({ camera: bool });
  }

  render() {
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

    return (
      <View style={addFriendStyles.container}>
        <View style={addFriendStyles.content}>
          <Text style={addFriendStyles.instructions}>{instructions}</Text>
          <View style={addFriendStyles.camera}>
            {/* Här ska kamera/QR-kod läggas in */}
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
}
