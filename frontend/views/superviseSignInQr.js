import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';

import { Text, View, StyleSheet, Alert } from 'react-native';
import { Switch } from 'react-native-switch';
import Constants from 'expo-constants';
import { QRCode } from 'react-native-custom-qr-codes-expo';

import addFriendStyles from '../styles/addFriend.scss';
import addFriend from '../connections/addFriend.js';

class SuperviseSignInQR extends Component {
    constructor(props) {
        super(props);
        var routeParams = this.props.navigation.route.params;

        this.state = {
            userId: routeParams.userId,
            name: routeParams.name,
        };
    }
    

    render() {

        const ICON_ACTIVE_COLOR = '#4499A9';
        const ICON_INACTIVE_COLOR = '#C2C2C2';
        const BACKGROUND_COLOR = '#FFFFFF';
        const CIRCLE_COLOR = '#707070';

        var instructions = '';
        var colorCodeIcon = '';
        var colorCameraIcon = '';

        instructions = (this.state.name + `s QR-kod`);
        colorCameraIcon = ICON_INACTIVE_COLOR;
        colorCodeIcon = ICON_ACTIVE_COLOR;
        
        return (
            <View style={addFriendStyles.container}>
                <View style={addFriendStyles.content}>
                    <Text style={addFriendStyles.instructions}>{instructions}</Text>
                    <View style={addFriendStyles.camera}>
                    {
                        <QRCode
                            content={this.state.userId}
                            codeStyle="circle"
                            innerEyeStyle="circle"
                        />
                    }
                    </View>
                </View>
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({
            scanned: true,
        });

        if (addFriend({ userOne: this.state.userId, userTwo: data })) {
            Alert.alert('Du har lagt till en ny kontakt');
        }
    };
}
export default function (navigation) {
    return <SuperviseSignInQR navigation={navigation} />;
}