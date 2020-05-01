import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';

import styles from '../styles/signIn';
import buttonStyle from '../styles/button';

import createUser from '../connections/createUser';

var authenticated = false;

class ScanRegister extends Component {
  constructor(props) {
    super(props);
    var routeParams = this.props.navigation.route.params;

    this.state = {
      navigation: this.props.navigation.navigation,
      supervisorId: routeParams.supervisorId,
      userName: '',
      error: '',
      password: '',
      userId: '',
      isSupervisor: false
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




  async createProfile() {
    this.authInput();

    if (authenticated) {

      const req = {
        fullName: this.state.userName,
        password: this.state.password,
        isSupervisor: this.state.isSupervisor,
        email: '',
        supervisorId: this.state.supervisorId
      };

      const res = await createUser(req);

      if(res.status == 'succes'){
        this.setState({ userId: res.data.userId });
        console.log('Creating profile...');
        this.state.navigation.navigate('Conversation', {
           userId: this.state.userId, isSupervisor: this.state.isSupervisor 
        });
      }

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
          placeholder={'Skriv ditt namn'}
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
