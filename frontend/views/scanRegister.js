import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';

import styles from '../styles/signIn';
import buttonStyle from '../styles/button';

var authenticated = false;

class ScanRegister extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      navigation: this.props.navigation.navigation,
      userName: '',
      error: '',
      password: ''
    };
  }

  authInput() {
    if (this.state.userName != '' && this.state.password != '') {
      this.setState({ error: '' });
      authenticated = true;
    } else {
      this.setState({
        error: 'Fyll i namn och/eller lösenord',
      });
      authenticated = false;
    }
  }

  createProfile() {
    this.authInput();

    if (authenticated) {
      console.log('Creating profile...');
      this.state.navigation.navigate('Conversation');

      this.setState({
        userName: '',
        password: ''
      });
    } else {
      console.log('Could not create profile ');
      this.setState({
        userName: '',
        password: ''
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMsg}>{this.state.error}</Text>

        <Text style={[styles.textLabel, styles.margin]}>Namn</Text>
        <TextInput
          ref={(input) => {
            this.nameInput = input;
          }}
          style={[styles.textInput]}
          onChangeText={(userName) => this.setState({ userName })}
          placeholder={'Lisa Avlång'}
        />

        <Text style={[styles.textLabel, styles.margin]}>Lösenord</Text>
        <TextInput
          ref={(input) => {
            this.pswInput = input;
          }}
          style={[styles.textInput]}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'**********'}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={buttonStyle.button}
          onPress={() => this.createProfile()}
        >
          <Text style={[buttonStyle.text, buttonStyle.ok]}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function (navigation) {
  return <ScanRegister navigation={navigation} />;
}
