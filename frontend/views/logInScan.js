import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';

import styles from '../styles/signIn';
import buttonStyle from '../styles/button';

var authenticated = false;

class LogInScan extends Component {
    constructor(props) {
        super(props);
        var routeParams = this.props.navigation.route.params;

        this.state = {
            navigation: this.props.navigation.navigation,
            userId: routeParams.userId,
            error: '',
            password: ''
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

    createProfile() {
        this.authInput();

        if (authenticated) {
            console.log('Signing in...');
            this.state.navigation.navigate('Conversation');

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
                    onPress={() => this.state.navigation.navigate('Conversation', { userId: this.state.userId })}
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
