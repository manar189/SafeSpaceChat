/* OBS OM DET INTE GÅR ATT STARTA EXPO PGA NAVIGATION INTE FINNS ÄVEN EFTER NPM INSTALL OSV.
Skriv följande kommandon:

npm install @react-navigation/native
npm install @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view */

import React from 'react';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import conversationStyles from '../styles/conversations';

function ConversationView(props) {
  const { navigation } = props;
  return (
    <ScrollView
      style={conversationStyles.container}
      contentContainerStyle={conversationStyles.contentContainer}
    >
      <OptionButton
        icon="circle"
        label="Kalle Kula"
        msg="Tja vgd"
        parentIcon="account-child"
        onPress={() => navigation.navigate('ChatView')}
      />

      <OptionButton
        icon="circle"
        label="Lisa Avlång"
        msg="hahahah! Men vad säger du om..."
        onPress={() => navigation.navigate('ChatView')}
      />

      <OptionButton
        icon="circle"
        label="Anna Asbra"
        msg="ok"
        onPress={() => navigation.navigate('ChatView')}
      />

      <OptionButton
        icon="circle"
        label="Fidde Framåt"
        msg="Starta en konversation..."
        onPress={() => navigation.navigate('Chat')}
      />
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, msg, parentIcon }) {
  return (
    <RectButton style={conversationStyles.option} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={conversationStyles.optionIconContainer}>
          <Entypo name={icon} size={40} color="#4499a9" />
        </View>
        <View style={conversationStyles.optionTextContainer}>
          <Text style={conversationStyles.optionText}>{label}</Text>
          <Text style={conversationStyles.messageText}>{msg}</Text>
        </View>
      </View>
      <View style={conversationStyles.parentMode}>
        <MaterialCommunityIcons
          name={parentIcon}
          size={30}
          style={conversationStyles.parentChild}
        />
      </View>
    </RectButton>
  );
}

export default ConversationView;
