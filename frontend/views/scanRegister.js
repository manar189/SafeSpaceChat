import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';

import styles from '../styles/signIn.scss';
import buttonStyle from '../styles/button.scss';

var authenticated = false;

class ScanRegister extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      navigation: this.props.navigation.navigation,
      userName: '',
      error: '',
    };
  }

  authInput() {
    if (this.state.userName != '') {
      this.setState({ error: '' });
      authenticated = true;
    } else {
      this.setState({
        error: 'Fyll i namn',
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
      });
    } else {
      console.log('Could not create profile ');
      this.setState({
        userName: '',
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
            this.pswInput = input;
          }}
          style={[styles.textInput]}
          onChangeText={(userName) => this.setState({ userName })}
          placeholder={'Lisa Avlång'}
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
