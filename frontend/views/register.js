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

import createUser from '../connections/createUser.js';

var authenticated = false;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',

      error: '',
      userId: '',
      isSupervisor: '',
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

  async registerUser() {
    this.authInput();

    if (authenticated) {
      const req = {
        fullName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        isSupervisor: true,
      };

      const res = await createUser(req);

      this.setState({
        email: '',
        password: '',
        userId: res.data.userId,
        isSupervisor: res.data.isSupervisor,
      });

      this.props.navigation.navigate('Conversation', {
        userId: this.state.userId,
        isSupervisor: this.state.isSupervisor,
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
        {/* Keyboard avoiding view funkar ej, måste finnas ett sätt för alla komponenter att flytta sig när tangetbordet dyker upp!*/}

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
          onChangeText={(userName) => this.setState({ userName })}
          placeholder={'Kalle Kula'}
        />
        <TouchableOpacity
          style={buttonStyle.button}
          onPress={() => this.registerUser()}
        >
          <Text style={buttonStyle.text}>Registrera</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
