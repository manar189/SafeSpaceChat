/* OBS OM DET INTE GÅR ATT STARTA EXPO PGA NAVIGATION INTE FINNS ÄVEN EFTER NPM INSTALL OSV.
Skriv följande kommandon:

npm install @react-navigation/native
npm install @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view */

import React, { Component } from 'react';
import io from 'socket.io-client';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import conversationStyles from '../styles/conversations';
import footerStyle from '../styles/footer';
import loadFriends from '../connections/loadFriends';

/*
    - Vid för många konversationer i listan blir det skumt, jag vet dock inte vart problemet ligger.
    - Sökrutan saknar funktion
*/

class ConversationsView extends Component {
  constructor(props) {
    super(props);
    var routeParams = this.props.navigation.route.params;

    this.state = {
      userId: routeParams.userId,
      navigation: this.props.navigation.navigation,
      conversations: [],
      error: '',
    };
  }

  async componentDidMount() {
    console.log('user id in conversation: ' + this.state.userId);
    const loadedFriends = await loadFriends(this.state.userId);
    console.log('loadedFriends in conversation: ' + loadedFriends);
    if (!loadedFriends.data) {
      console.log('Inga vänner');
    } else {
      this.setState({ conversations: loadedFriends.data });
    }
  }

  setHeaderOptions() {
    this.state.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={conversationStyles.profileButton}>
          <EvilIcons name="user" size={40} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={conversationStyles.addFriendButton}
          onPress={() => {
            this.state.navigation.navigate('AddFriend', {
              userId: this.state.userId,
            });
            console.log('add friend');
          }}
        >
          <EvilIcons name="plus" size={40} color="white" />
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
          data={this.state.conversations}
          keyExtractor={(conversation, index) =>
            conversation.conversationId.toString()
          }
          renderItem={({ item }) => (
            <OptionButton
              item={item}
              func={() => {
                this.state.navigation.navigate('ChatView', {
                  userId: this.state.userId,
                  conversationId: item.conversationId,
                  userName: item.label,
                  receiverId: item.userId,
                });
                console.log(item.conversationId);
              }}
            />
          )}
          ItemSeparatorComponent={() => {
            return <View style={conversationStyles.separator} />;
          }}
          ListHeaderComponent={
            <View style={conversationStyles.searchConvBox}>
              <TextInput
                style={conversationStyles.searchConv}
                placeholder={'Sök...'}
              />
            </View>
          }
        />
        <View style={footerStyle.footerBox}>
          <TouchableOpacity style={[footerStyle.conversationsButton, footerStyle.active]} onPress={() => {
            this.state.navigation.navigate('Conversation', { userId: this.state.userId, })
          }}>
            <EvilIcons name="user" size={40} color="white" style={footerStyle.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={[footerStyle.supervisionsButton, footerStyle.inactive]} onPress={() => {
            this.state.navigation.navigate('Supervisions', {
              userId: this.state.userId,
            })
          }}>
            <EvilIcons name="user" size={40} color="white" style={footerStyle.icon} />
          </TouchableOpacity>
        </View>
      </View>);

  }
}

function OptionButton({ item, func }) {
  return (
    <RectButton style={conversationStyles.option} onPress={func}>
      <View style={{ flexDirection: 'row' }}>
        <View style={conversationStyles.optionIconContainer}>
          <Entypo name={item.icon} size={40} color="#4499a9" />
        </View>
        <View style={conversationStyles.optionTextContainer}>
          <Text style={conversationStyles.optionText}>{item.label}</Text>
          <Text style={conversationStyles.messageText}>{item.msg}</Text>
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
  return <ConversationsView navigation={navigation} />;
}
