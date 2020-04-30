import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';

import styles from '../styles/signIn';
import buttonStyle from '../styles/button';

import loginScan from '../connections/loginScan';

var authenticated = false;

class LogInScan extends Component {
    constructor(props) {
        super(props);
        var routeParams = this.props.navigation.route.params;

        this.state = {
            navigation: this.props.navigation.navigation,
            userId: routeParams.userId,
            error: '',
            password: '',
            isSupervisor: false
        };
    }

    authInput() {
        if (this.state.password != '') {
            this.setState({ error: '' });
            authenticated = true;
        } else {
            this.setState({
                error: 'Fyll i lösenord',
            });
            authenticated = false;
        }
    }

    async checkPassword() {
        this.authInput();

        if (authenticated) {

            const req = {
                userId: this.state.userId,
                password: this.state.password
            }

            const res = await loginScan(req);
            console.log(res);

            if(res.status == 'succes'){
              console.log('Signing in...');
              this.state.navigation.navigate('Conversation', {
                 userId: this.state.userId, isSupervisor: this.state.isSupervisor 
              });
            }
      
            this.setState({
                userName: '',
                password: ''
            });
        } else {
            console.log('Could not sign in ');
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
                    onPress={() => this.checkPassword()}
                >
                    <Text style={[buttonStyle.text, buttonStyle.ok]}>Logga in</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default function (navigation) {
    return <LogInScan navigation={navigation} />;
}
