import React, { Component } from 'react';

import supervisionStyles from '../styles/supervisions';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, FlatList, TextInput } from 'react-native';
import conversationStyles from '../styles/conversations';

import loadSupervision from '../connections/loadSupervisions';

class SupervisionsView extends Component {
    constructor(props) {
        super(props);
        var routeParams = this.props.navigation.route.params;
        console.log(`userId in supervisions: ${routeParams.userId}`);

        this.state = {

            navigation: this.props.navigation.navigation,
            userId: routeParams.userId,
            supervisions: [],

        }
    }

    async componentDidMount() {
        const loadedSupervisions = await loadSupervision(this.state.userId);
        console.log(loadedSupervisions.data);

        if (!loadedSupervisions.data) {
            console.log('Inga övervakningar');
        }
        else {
            this.setState({ supervisions: loadedSupervisions.data });
        }


    }

    setHeaderOptions() {
        this.state.navigation.setOptions({
            //   headerLeft: () => (
            //     <TouchableOpacity style={conversationStyles.profileButton}>
            //       <EvilIcons name="user" size={40} color="white" />
            //     </TouchableOpacity>
            //   ),
            headerRight: () => (
                <TouchableOpacity
                    style={conversationStyles.addFriendButton}

                >
                    <FontAwesome name="child" size={40} color="white" />
                </TouchableOpacity>
            ),
        });
    }

    render() {
        this.setHeaderOptions();

        return (
            <View style={conversationStyles.list}>
                <FlatList
                    style={conversationStyles.container}
                    contentContainerStyle={conversationStyles.contentContainer}
                    data={this.state.supervisions}
                    renderItem={({ item }) => (
                        <OptionButton
                            item={item}
                            func={() =>
                                this.state.navigation.navigate('SuperviseUser', {
                                    userId: item.userId,
                                    userName: item.fullName,
                                })
                            }
                        />
                    )}
                    ItemSeparatorComponent={() => {
                        return <View style={conversationStyles.separator} />;
                    }}

                />

                <TouchableOpacity style={conversationStyles.profileButton} onPress={() => {
                    this.state.navigation.navigate('Conversation', { userId: this.state.userId, })
                }}>
                    <EvilIcons name="user" size={40} color="Black" />
                </TouchableOpacity>

                <TouchableOpacity style={conversationStyles.profileButton} onPress={() => {
                    this.state.navigation.navigate('Supervisions', {
                        userId: this.state.userId,
                    })
                }}>
                    <EvilIcons name="user" size={40} color="white" />
                </TouchableOpacity>
            </View>
        );

    }
}


function OptionButton({ item, func }) {
    return (
        <RectButton style={conversationStyles.option} onPress={func}>
            <View style={{ flexDirection: 'row' }}>

                <View style={conversationStyles.optionTextContainer}>
                    <Text style={supervisionStyles.optionText}>{item.fullName}</Text>
                </View>
            </View>
            <View style={conversationStyles.parentMode}>
                <MaterialCommunityIcons
                    //name={parentIcon}
                    size={30}
                    style={conversationStyles.parentChild}
                />
            </View>
        </RectButton>
    );
}

export default function (navigation) {
    return <SupervisionsView navigation={navigation} />;
}

const TEMPDATA = [
    {
        icon: 'circle',
        label: 'Kalle Kula',
        msg: 'Tja vgd',
        userId: '5e843ddbbd8a99081cd3f613',
        conversationId: '5e68c508c18e2a00ee6bf0f8',
    },

];