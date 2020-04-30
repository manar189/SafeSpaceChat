import React, { Component } from 'react';
import { Button, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

import styles from '../styles/signIn.scss';
import buttonStyle from '../styles/button.scss';

class SignInScan extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      navigation: this.props.navigation.navigation,
      camera: true,
      hasCameraPermission: null,
      scanned: false,
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

  render() {
    const {hasCameraPermission, scanned} = this.state;

    var instructions = '';

    if(this.state.camera){
      instructions = 'Skanna en QR-kod';
    }

    if(hasCameraPermission === null){
      return <Text> Requesting for camera permission </Text>;
    }

    if(hasCameraPermission === false){
      return <Text> No access to camera </Text>;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity //OBS bör vara typ view sen
          style={styles.camera}
          onPress={() => this.state.navigation.navigate('ScanRegister')}
        >
          {/***************************
           * Här ska kamera läggas in *
           * 
           * *************************/}
        {this.state.camera && (
          <BarCodeScanner
          onBarCodeScanned={
            scanned ? undefined : this.handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
          />
        )}
        </TouchableOpacity>
        <Text style={styles.instructions}>
          {'Skanna QR-kod för att starta konto'}
        </Text>
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

export default function (navigation) {
  return <SignInScan navigation={navigation} />;
}
