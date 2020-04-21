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

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userAuth: false,
      error: '',
      user: [],
    };
  }

  authUser() {
    // Här ska epost och lösenord kollas mot användare i databasen
    if (this.state.email != '' && this.state.password != '') {
      this.setState({ error: '' });
      authenticated = true;
    } else {
      this.setState({
        error: 'Fyll i e-post och/eller lösenord',
      });
      authenticated = false;
    }
  }

  signIn() {
    this.authUser();

    if (authenticated) {
      console.log('Signing in...');
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
        <TouchableOpacity
          style={buttonStyle.button}
          onPress={() => this.signIn()}
        >
          <Text style={buttonStyle.buttonText}>Logga in</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
