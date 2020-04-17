import React, { Component } from 'react';
import io from 'socket.io-client';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList,
  Animated,
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

  async componentDidMount() {
    
    this.socket = io(`http://${config.server.host}:${config.server.port}`);
    this.socket.emit('init', {
      senderId: this.state.userId,
    });

    const loadedMessages = await loadMessages(this.state.conversationId);
    this.setState({ messages: loadedMessages });

    this.socket.on('message', (message) => {
      const incomingMessage = {
        text: message.text,
        userId: message.userId,
        conversationId: message.conversationId,
      };
      this.renderNewMessage(incomingMessage);
    });
  }

  componentWillUnmount() {
    this.socket.emit('disconnect', {
      senderId: this.state.userId,
    });
  }

  submitChatMessage = () => {
    const newMessage = {
      text: this.state.currMsg,
      userId: this.state.userId,
      receiverId: '',// 5e843ddbbd8a99081cd3f613',
      conversationId: this.state.conversationId,
    };

    this.socket.emit('message', newMessage);
    this.renderNewMessage(newMessage);
    this.setState({ currMsg: '' });
    this.textInput.clear();
  };

  renderNewMessage(message) {
    console.log(`New message: ${message.text}`);
    if (message.conversationId == this.state.conversationId) {
      this.state.messages.push(message);
      this.render();
    }
  }

  render() {
    return (
      //Finns bättre sätt än <KeyBoardAvoidingView> för att få allt att anpassas då tangentbordet öppnas
      <Animated.View style={appStyles.container} enableOnAndroid="true">
        <FlatList
          ref={(el) => (this.list = el)}
          data={this.state.messages}
          renderItem={({ item }) => (
            <Item msg={item} userId={this.state.userId} />
          )}
          keyExtractor={(item) => item._id}
          // initialScrollIndex={this.state.messages.length - 1} // Gör att man hamnar längst ner i konversationen och får scrolla uppåt, gissar på att det inte kommer funka när data hämtas från db?
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
      </Animated.View>
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
