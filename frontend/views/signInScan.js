import React, { Component } from 'react';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import styles from '../styles/signIn';
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
      <View style={styles.container}>
        <TouchableOpacity //OBS bör vara typ view sen
          style={styles.camera}
          onPress={() => this.state.navigation.navigate('ScanRegister')}
        >
          {/***************************
           * Här ska kamera läggas in *
           * *************************/}
        </TouchableOpacity>
        <Text style={styles.instructions}>
          {'Skanna QR-kod för att starta konto'}
        </Text>
      </View>
    );
  }
}

export default function (navigation) {
  return <SignInScan navigation={navigation} />;
}
