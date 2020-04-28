import React, { Component } from 'react';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import startStyles from '../styles/start';
import buttonStyle from '../styles/button';

class StartView extends Component {
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
        <View style={startStyles.logo}>
          <EvilIcons name="plus" size={50} color="white" />
          {/*fast loggan sen*/}
          <Text style={startStyles.text}>SAFESPACE</Text>
        </View>

        <TouchableOpacity
          style={[buttonStyle.button, buttonStyle.startButton]}
          onPress={() => this.state.navigation.navigate('Register')}
        >
          <Text style={buttonStyle.text}>Registrera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyle.button, buttonStyle.startButton]}
          onPress={() => this.state.navigation.navigate('Scan')}
        >
          <Text style={buttonStyle.text}>Skanna</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyle.button, buttonStyle.startButton]}
          onPress={() => this.state.navigation.navigate('Help')}
        >
          <Text style={buttonStyle.text}>Hjälp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={startStyles.signInText}
          onPress={() => this.state.navigation.navigate('SignIn')}
        >
          <Text style={startStyles.text}>
            Har du redan ett konto? Logga in.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function (navigation) {
  return <StartView navigation={navigation} />;
}
