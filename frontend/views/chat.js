import React, { Component } from 'react';
import io from 'socket.io-client';

import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import config from '../../backend/config';
import loadMessages from '../connections/loadMessages';
import Header from '../styles/components/header.js';
import appStyles from '../styles/components.scss';
import chatStyles from '../styles/chat.scss';

export default class ChatView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Kalle Kula',
      userId: '5e843ddbbd8a99081cd3f613',
      conversationId: '5e68c508c18e2a00ee6bf0f8',
      currMsg: '',
      messages: [],
      loading: true,
    };
  }

  componentDidMount() {
    const loadedMessages = loadMessages(this.state.conversationId);
    this.setState({ });

    this.socket = io(`http://${config.server.host}:${config.server.port}`);
    this.socket.emit('init', {
      senderId: this.state.userId,
    });
    this.socket.on('message', message => {
      const newMessage = {
        createdAt: message.createdAt,
        text: message.text,
        userId: message.senderId,
        _id: message.msgId,
      };
      this.newMessage(message.conversationId, newMessage);
    });
  }

  componentWillUnmount() {
    this.socket.emit('disconnect', {
      senderId: this.state.userId,
    });
  }

  submitChatMessage = () => {
    this.socket.emit('message', {
      text: this.state.currMsg,
      userId: this.state.userId,
      receiverId: '5e843ddbbd8a99081cd3f613', // TEMP
      conversationId: this.state.conversationId,
    });

    this.newMessage(this.state.conversationId, this.state.userId);
    this.setState({ currMsg: '' });
    this.textInput.clear();
  }

  newMessage = (conversationId, message) => {
    if(conversationId == this.state.conversationId){
      // TODO: Gör så att meddelandet som skapats visas i chatten
    }
  }

  render() {
    return (
      //Finns bättre sätt än <KeyBoardAvoidingView> för att få allt att anpassas då tangentbordet öppnas
      <KeyboardAvoidingView style={appStyles.container} behavior="padding">
        <Header title={this.state.userName} />

        <FlatList
          ref={(el) => (this.list = el)}
          data={this.state.messages}          
          renderItem={({ item }) => (
            <Item msg={item} currUser={this.state.currUser} />
          )}
          keyExtractor={(item) => item.id} //TODO: Unikt ID för alla meddelanden
          // initialScrollIndex={DATA.length - 1} // Gör att man hamnar längst ner i konversationen och får scrolla uppåt, gissar på att det inte kommer funka när data hämtas från db?
        />

        <View style={chatStyles.inputBox}>
          <TextInput
            ref={(input) => {
              this.textInput = input;
            }}
            style={chatStyles.textInput}
            onChangeText={(currMsg) => this.setState({ currMsg })}
          />

          <Button
            color="#133b43"
            title="Skicka"
            style={chatStyles.sendButton}
            onPress={() => {
              this.submitChatMessage(this.state.currMsg);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function Item({ msg, userId }) {
  if (msg.userId != userId) {
    return (
      <View style={[chatStyles.msg, chatStyles.msgRecieved]}>
        <Text>{msg.text}</Text>
      </View>
    );
  }

  return (
    <View style={[chatStyles.msg, chatStyles.msgSent]}>
      <Text>{msg.text}</Text>
    </View>
  );
}
