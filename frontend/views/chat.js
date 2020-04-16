import React, { Component } from 'react';
import io from 'socket.io-client';

import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import config from '../../backend/config';
import loadMessages from '../connections/loadMessages';
import Header from '../styles/components/header.js';
import appStyles from '../styles/components.scss';
import chatStyles from '../styles/chat.scss';
import { useNavigation } from '@react-navigation/native';

class ChatView extends Component {
  constructor(props) {
    super(props);
    var routeParams = this.props.navigation.route.params;

    this.state = {
      userName: routeParams.userName,
      userId: routeParams.userId,
      conversationId: routeParams.conversationId,
      currMsg: '',
      messages: [],
      loading: true,
      navigation: this.props.navigation.navigation,
      height: 0,
    };
  }

  /*  FÖR ATT FÅ KODEN ATT FUNKA PÅ DIN DATOR MÅSTE DU BYTA port: I ./backend/config TILL DIN LOKALA HEMMA!!!
    Läget är följande:
    - När man skriver ett meddelande så skickas det via socket.io till backend som skickar tillbaka samma meddelande till
      en socket med mottagarens id, samt skapar meddelandet i databasen.
    - Funktionen "newMessage" ska göra så att nya meddelanden läggs till i den aktiva chatten om det har rätt conversationId.
      Alltså ska den funktionen aktiveras både när man själv skriver ett meddelande och när man tar emot ett meddelande i den
      aktiva chatten. I nuläget har jag gjort så att meddelanden skickas till mig själv vilket gör att newMessage kallas på två gånger.


      -Ibland hoppar meddelandena när man skickat nytt, oklart varför. 
*/

  async componentDidMount() {
    const loadedMessages = await loadMessages(this.state.conversationId);

    this.setState({ messages: loadedMessages.reverse() });

    this.socket = io(`http://${config.server.host}:${config.server.port}`);
    this.socket.emit('init', {
      senderId: this.state.userId,
    });
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
      receiverId: '5e843ddbbd8a99081cd3f613',
      conversationId: this.state.conversationId,
    };

    this.socket.emit('message', newMessage);
    this.renderNewMessage(newMessage);
    this.setState({ currMsg: '' });
    this.textInput.clear();
  };

  renderNewMessage(message) {
    console.log(`New message: ${message.text}`);
    if (
      message.conversationId == this.state.conversationId &&
      message.text != ''
    ) {
      this.state.messages.reverse().push(message);
      this.state.height = 0;
      this.render();
    }
  }

  render() {
    this.state.navigation.setOptions({
      title: this.state.userName,
    });

    return (
      <Animated.View style={appStyles.container} enableOnAndroid="true">
        <FlatList
          ref={(el) => (this.list = el)}
          data={this.state.messages}
          renderItem={({ item }) => (
            <Item msg={item} userId={this.state.userId} />
          )}
          keyExtractor={(item) => item._id}
          inverted
        />

        <View style={chatStyles.inputBox}>
          <TextInput
            ref={(input) => {
              this.textInput = input;
            }}
            style={[
              chatStyles.textInput,
              { height: Math.max(35, this.state.height) },
            ]}
            onChangeText={(currMsg) => this.setState({ currMsg })}
            onSubmitEditing={() => this.submitChatMessage(this.state.currMsg)}
            placeholder={'Skriv ett meddelande...'}
            multiline={true}
            blurOnSubmit={true}
            scrollEnabled={true}
            onContentSizeChange={(event) => {
              var contentHeight = event.nativeEvent.contentSize.height;
              var MAX_HEIGHT = 100;

              if (contentHeight <= MAX_HEIGHT) {
                this.setState({ height: contentHeight });
              } else {
                this.setState({ height: MAX_HEIGHT });
              }
            }}
          />

          <TouchableOpacity
            onPress={() => this.submitChatMessage(this.state.currMsg)}
          >
            <EvilIcons name="plus" size={40} color="white" />
          </TouchableOpacity>
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

export default function (navigation) {
  return <ChatView navigation={navigation} />;
}
