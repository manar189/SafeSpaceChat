import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';

import { Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';

import styles from '../styles/signIn.scss';
import buttonStyle from '../styles/button.scss';

import loginFunc from '../connections/login';

var authenticated = false;

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			userAuth: false,
			error: '',
			userId: '',
			isSupervisor: ''
		};
	}

	authUser() {
		// Här ska epost och lösenord kollas mot användare i databasen
		if (this.state.email != '' && this.state.password != '') {
			this.setState({ error: '' });
			authenticated = true;
		} else {
			this.setState({
				error: 'Fyll i e-post och/eller lösenord'
			});
			authenticated = false;
		}
	}

	async signIn() {
		this.authUser();

		const req = {
			email: this.state.email,
			password: this.state.password
		};

		const loginResult = await loginFunc(req);

		if (loginResult.status == 'error') {
			console.log(loginResult.error);
			if (this.state.email == '' && this.state.password == '') {
				this.setState({
					error: 'Fyll i e-post och/eller lösenord'
				});
			} else {
				this.setState({
					error: 'Fel e-post och/eller lösenord'
				});
			}
		} else if (authenticated) {
			console.log('Signing in...');

			this.setState({
				userId: loginResult.data.userId,
				isSupervisor: loginResult.data.isSupervisor
			});

			this.props.navigation.navigate('Conversation', {
				userId: this.state.userId,
				isSupervisor: this.state.isSupervisor
			});

			this.setState({
				email: '',
				password: ''
			});
		} else {
			console.log('Could not sign in ');
			this.setState({
				email: '',
				password: ''
			});
		}
	}

	resetPassword() {
		Alert.alert('Det var ju tråkigt');
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				{/* Keyboard avoiding view funkar ej, måste finnas ett sätt för alla komponenter att flytta sig när tangetbordet dyker upp!*/}
				<Image
					source={require('../img/Logo/Logonaut.png')}
					style={[ { width: 180, height: 80, resizeMode: 'contain' } ]}
				/>

				<Text style={styles.errorMsg}>{this.state.error}</Text>
				<Text style={styles.textLabel}>E-post</Text>
				<TextInput
					ref={(input) => {
						this.emailInput = input;
					}}
					style={[ styles.textInput ]}
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
					style={[ styles.textInput ]}
					onChangeText={(password) => this.setState({ password })}
					placeholder={'**********'}
					secureTextEntry={true}
				/>

				<TouchableOpacity>
					<Text style={styles.forgottenPsw} onPress={() => this.resetPassword()}>
						Glömt lösenord?
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={buttonStyle.button} onPress={() => this.signIn()}>
					<Text style={buttonStyle.text}>Logga in</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}
