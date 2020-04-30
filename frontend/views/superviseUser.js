import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { QRCode } from 'react-native-custom-qr-codes-expo';

import conversationStyles from '../styles/conversations';
import superviseUser from '../connections/superviseUser';

class SuperviseUser extends Component {
    constructor(props) {
        super(props);
        var routeParams = this.props.navigation.route.params;

        this.state = {
            navigation: this.props.navigation.navigation,
            nMessages: '',
            messageDate: '',
            supervisedUserId: routeParams.userId,
            supervisedUserName: routeParams.userName,
        };
    }

    async componentDidMount() {
        const loadedUser = await superviseUser(this.state.supervisedUserId);
        console.log(loadedUser.data);

        this.setState({
            nMessages: loadedUser.data.nMessages,
            messageDate: loadedUser.data.messageDate.toString(),
        });
    }

    // nMessages: conversation.messages.length,
    // messageDate: date
    // 2020-03-11T07:48:23.196+00:00

    setHeaderOptions() {
        this.state.navigation.setOptions({

            headerRight: () => (
                <TouchableOpacity
                    style={conversationStyles.addFriendButton}
                    onPress={() => this.state.navigation.navigate('superviseSignInQR',{
                        userId: this.state.supervisedUserId,
                        name: this.state.supervisedUserName,
                    })}>
                    <FontAwesome name="child" size={40} color="white" />
                </TouchableOpacity>
            ),
        });
    }

    render() {
        this.setHeaderOptions();

        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={conversationStyles.optionTextContainer}>
                    <Text style={conversationStyles.optionText}>{this.state.supervisedUserName}</Text>
                    <Text style={conversationStyles.messageText}>{'Antal meddelanden: ' + this.state.nMessages}{'Senast meddelande: ' + this.state.messageDate}</Text>
                </View>
            </View>

        );
    }
}

export default function (navigation) {
    return <SuperviseUser navigation={navigation} />;
}
