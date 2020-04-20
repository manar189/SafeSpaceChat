import React, { Component } from 'react';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import startStyles from '../styles/start';
import buttonStyle from '../styles/button';

class SignInScan extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      navigation: this.props.navigation.navigation,
    };
  }

  render() {
    return (
      <View style={startStyles.container}>
        <Text>Här ska man kunna skanna</Text>
      </View>
    );
  }
}

export default function (navigation) {
  return <SignInScan navigation={navigation} />;
}
