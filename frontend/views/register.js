import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import styles from '../styles/signIn.scss';
import buttonStyle from '../styles/button.scss';

var authenticated = false;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',

      error: '',
    };
  }

  authInput() {
    if (
      this.state.email != '' &&
      this.state.password != '' &&
      this.state.userName != ''
    ) {
      this.setState({ error: '' });
      authenticated = true;
    } else {
      this.setState({
        error: 'Var god fyll i alla fält',
      });
      authenticated = false;
    }
  }

  registerUser() {
    this.authInput();

    if (authenticated) {
      this.props.navigation.navigate('Conversation');

      this.setState({
        email: '',
        password: '',
      });
    } else {
      console.log('Could not sign in ');
      this.setState({
        email: '',
        password: '',
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* Keyvoard avoiding view funkar ej */}
        <EvilIcons name="sc-odnoklassniki" size={90} color="white" />
        {/*Här ska det vara en fin logga  */}
        <Text style={styles.errorMsg}>{this.state.error}</Text>
        <Text style={styles.textLabel}>E-post</Text>
        <TextInput
          ref={(input) => {
            this.emailInput = input;
          }}
          style={[styles.textInput]}
          onChangeText={(email) => {
            this.setState({ email });
            console.log(this.state.email);
          }}
          placeholder={'exempel@gmail.com'}
        />
        <Text style={styles.textLabel}>Lösenord</Text>
        <TextInput
          ref={(input) => {
            this.pswInput = input;
          }}
          style={[styles.textInput]}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'**********'}
          secureTextEntry={true}
        />
        <Text style={styles.textLabel}>Namn</Text>
        <TextInput
          ref={(input) => {
            this.nameInput = input;
          }}
          style={[styles.textInput]}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Kalle Kula'}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={buttonStyle.button}
          onPress={() => this.registerUser()}
        >
          <Text style={buttonStyle.buttonText}>Registrera</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
