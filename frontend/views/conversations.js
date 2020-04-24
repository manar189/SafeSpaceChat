/* OBS OM DET INTE GÅR ATT STARTA EXPO PGA NAVIGATION INTE FINNS ÄVEN EFTER NPM INSTALL OSV.
Skriv följande kommandon:

npm install @react-navigation/native
npm install @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view */

import React, { Component } from 'react';
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
import loadFriends from '../connections/loadFriends';
import getConversationId from '../connections/getConversationsId';

/*
    Detta ska kopplas till backend och därmed ska alla konversationer hämtas från DB. Om det inte redan finns så bör vi ha ett par konversationer att kunna testa med nu.
    Det som jag tror behövs fixas är detta: 

    - Behövs skapas en koppling i /connections/loadConversations som hämtar alla konverationer genom /handlers/loadConversations.
    - För att hämta konversationerna krävs en funktion som retunerar alla konversationer i /handlers/loadConversations.
    - Konversationerna ska hämtas från /connections/loadConversations och sparas i conversations (som i chat.js)
    - Man borde kunna hämta senaste meddelandet i varje konversation som visas i denna lista? Som då ska ersätta msg i TEMPDATA. 

    - Vid för många konversationer i listan blir det skumt, jag vet dock inte vart problemet ligger.
    - Sökrutan saknar funktion
*/

class ConversationsView extends Component {
  constructor(props) {
    super(props);
    //console.log(props);

    this.state = {
      userId: '5e843ddbbd8a99081cd3f613',
      navigation: this.props.navigation.navigation,
      conversations: [],
    };
  }

  async componentDidMount() {
    const loadedFriends = await loadFriends(this.state.userId);

    loadedFriends.forEach((f) => {
      const item = {
        label: f.label,
        userId: f.userId,
        conversationId: f.conversationId,
      };
      this.state.conversations.push(item);
    });
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
          onPress={() => this.state.navigation.navigate('AddFriend')}
        >
          <EvilIcons name="plus" size={40} color="white" />
        </TouchableOpacity>
      ),
    });
  }

  render() {
    this.setHeaderOptions();

    return (
      <FlatList
        style={conversationStyles.container}
        contentContainerStyle={conversationStyles.contentContainer}
        data={this.state.conversations}
        renderItem={({ item }) => (
          <OptionButton
            item={item}
            func={() => {
              this.state.navigation.navigate('ChatView', {
                userId: item.userId,
                conversationId: item.conversationId,
                userName: item.label,
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
    );
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

//Tillfällig data för att kunna skapa scss
const TEMPDATA = [
  {
    icon: 'circle',
    label: 'Kalle Kula',
    msg: 'Tja vgd',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Lisa Avlång',
    msg: 'hahahah! Men vad säger du om...',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Anna Asbra',
    msg: 'ok',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Fidde Framåt',
    msg: 'Starta en konversation...',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Kalle Kula',
    msg: 'Tja vgd',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Lisa Avlång',
    msg: 'hahahah! Men vad säger du om...',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Anna Asbra',
    msg: 'ok',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Fidde Framåt',
    msg: 'Starta en konversation...',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
  {
    icon: 'circle',
    label: 'Kalle Kula',
    msg: 'Tja vgd',
    userId: '5e843ddbbd8a99081cd3f613',
    conversationId: '5e68c508c18e2a00ee6bf0f8',
  },
];
