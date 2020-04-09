import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import loadMessages from '../connections/loadMessages';

import Header from '../styles/components/header.js';

import appStyles from '../styles/components.scss';
import chatStyles from '../styles/chat.scss';

export default class ChatView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Kalle Kula',
      currUser: '',
      currMsg: '',
      messages: [],
      loading: true,
    };

    this.submitChatMessage = this.submitChatMessage.bind(this);
  }

  async componentDidMount() {
    var loadedMessages = loadMessages('5e68c508c18e2a00ee6bf0f8');

    this.setState({ messages: loadedMessages, currUser: 'päron' }); //TODO: Här måste userId kunna hämtas
  }

  //connection?
  componentWillUnmount() {
    this.socket.emit('disconnect', {
      senderId: '5e843ddbbd8a99081cd3f613',
    });
  }

  //connection
  submitChatMessage() {
    this.socket.emit('message', this.state.currMsg);
    console.log(`Message sent: ${this.state.currMsg}`);
    this.setState({ currMsg: '' });
    this.textInput.clear();
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

function Item({ msg, currUser }) {
  if (msg.userId != currUser) {
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
