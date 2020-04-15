/* OBS OM DET INTE GÅR ATT STARTA EXPO PGA NAVIGATION INTE FINNS ÄVEN EFTER NPM INSTALL OSV.
Skriv följande kommandon:

npm install @react-navigation/native
npm install @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view */

import React, { Component } from 'react';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, FlatList, TextInput } from 'react-native';
import { List } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';

import conversationStyles from '../styles/conversations';

/*
    Detta ska kopplas till backend och därmed ska alla konversationer hämtas från DB. Om det inte redan finns så bör vi ha minst ett par konversationer att kunna använda nu.
    Det som jag tror behövs fixas är detta: 

    - Behövs skapas en koppling i /connections/loadConversations som hämtar alla konverationer genom /handlers/loadConversations.
    - För att hämta konversationerna krävs en funktion som retunerar alla konversationer i /handlers/loadConversations.
    - Konversationerna ska hämtas från /connections/loadConversations och sparas i conversations (likt som i chat.js)
    - I navigation.navigate('ChatView') ska man kunna lägga till fler argument, jag tror att vi kan använda det för att plocka ut rätt konversation. 
    - Vid för många konversationer i listan blir det fett skumt 
    - Sökrutan saknar funktion
*/

export default function ConversationsView(props) {
  const { navigation } = props;

  const conversations = TEMPDATA;

  return (
    <FlatList
      style={conversationStyles.container}
      contentContainerStyle={conversationStyles.contentContainer}
      data={conversations}
      renderItem={({ item }) => (
        <OptionButton
          item={item}
          func={() => navigation.navigate('ChatView')}
        />
      )}
      ItemSeparatorComponent={() => {
        return <View style={conversationStyles.separator} />;
      }}
      ListHeaderComponent={
        <View style={conversationStyles.searchConvBox}>
          <TextInput
            style={conversationStyles.searchConv}
            placeholder={'    Sök...'}
          />
        </View>
      }
    />
  );
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

//Tillfällig data för att kunna skapa scss
const TEMPDATA = [
  { icon: 'circle', label: 'Kalle Kula', msg: 'Tja vgd' },
  {
    icon: 'circle',
    label: 'Lisa Avlång',
    msg: 'hahahah! Men vad säger du om...',
  },
  { icon: 'circle', label: 'Anna Asbra', msg: 'ok' },
  { icon: 'circle', label: 'Fidde Framåt', msg: 'Starta en konversation...' },
  { icon: 'circle', label: 'Kalle Kula', msg: 'Tja vgd' },
  {
    icon: 'circle',
    label: 'Lisa Avlång',
    msg: 'hahahah! Men vad säger du om...',
  },
  { icon: 'circle', label: 'Anna Asbra', msg: 'ok' },
  { icon: 'circle', label: 'Fidde Framåt', msg: 'Starta en konversation...' },
  { icon: 'circle', label: 'Kalle Kula', msg: 'Tja vgd' },
  { icon: 'circle', label: 'Kalle Kula', msg: 'Tja vgd' },
];
