import React, { Component } from 'react';
import io from 'socket.io-client';

import { Text, View, TextInput, TouchableOpacity, FlatList, Animated, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import config from '../../backend/config';
import loadMessages from '../connections/loadMessages';
import chatStyles from '../styles/chat.scss';

class ChatView extends Component {
	constructor(props) {
		super(props);
		var routeParams = this.props.navigation.route.params;

		this.state = {
			userName: routeParams.userName,
			userId: routeParams.userId,
			receiverId: routeParams.receiverId,
			conversationId: routeParams.conversationId,
			currMsg: '',
			messages: [],
			loading: true,
			navigation: this.props.navigation.navigation,
			height: 0,
			latestMsg: ''
		};
	}

	async componentDidMount() {
		const loadedMessages = await loadMessages(this.state.conversationId);

		this.setState({
			latestMsg: loadedMessages[loadedMessages.length - 1].text
		});

		this.setState({ messages: loadedMessages.reverse() });
		this.socket = io(`http://${config.server.host}:${config.server.port}`);
		this.socket.emit('init', {
			senderId: this.state.userId
		});

		this.socket.on('message', (message) => {
			const incomingMessage = {
				text: message.text,
				userId: message.userId,
				conversationId: message.conversationId
			};
			this.renderNewMessage(incomingMessage);
		});
	}

	submitChatMessage = () => {
		const newMessage = {
			text: this.state.currMsg,
			userId: this.state.userId,
			receiverId: this.state.receiverId,
			conversationId: this.state.conversationId
		};

		this.socket.emit('message', newMessage);
		this.renderNewMessage(newMessage);
		this.setState({ currMsg: '' });
		this.textInput.clear();
	};

	renderNewMessage(message) {
		console.log(`New message: ${message.text}`);
		if (message.conversationId == this.state.conversationId && message.text != '') {
			this.state.messages.reverse().push(message);
			this.state.messages.reverse();
			this.setState({ latestMsg: message.text });

			this.state.height = 0;
			this.render();
		}
	}

	render() {
		this.state.navigation.setOptions({
			title: this.state.userName
		});

		return (
			<Animated.View style={chatStyles.container} enableOnAndroid="true">
				<FlatList
					ref={(el) => (this.list = el)}
					data={this.state.messages}
					renderItem={({ item }) => <ChatMessage msg={item} userId={this.state.userId} />}
					keyExtractor={(renderMessage) => renderMessage._id}
					inverted
					ListEmptyComponent={
						<View style={chatStyles.noMsgView}>
							<View style={chatStyles.noMsg}>
								<Text style={chatStyles.noMsgText}>
									Skriv ett meddelande till {this.state.userName}
								</Text>
							</View>
							<Image
								source={require('../img/Mascot/Clean.png')}
								style={[ { resizeMode: 'contain' }, chatStyles.naut ]}
							/>
						</View>
					}
				/>

				<View style={chatStyles.inputBox}>
					<TextInput
						ref={(input) => {
							this.textInput = input;
						}}
						style={[ chatStyles.textInput, { height: Math.max(35, this.state.height) } ]}
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

					<TouchableOpacity onPress={() => this.submitChatMessage(this.state.currMsg)}>
						<MaterialIcons name="send" size={33} color="white" />
					</TouchableOpacity>
				</View>
			</Animated.View>
		);
	}
}

function ChatMessage({ msg, userId }) {
	if (msg.userId != userId) {
		return (
			<View style={[ chatStyles.msg, chatStyles.msgRecieved ]}>
				<Text>{msg.text}</Text>
			</View>
		);
	}

	return (
		<View style={[ chatStyles.msg, chatStyles.msgSent ]}>
			<Text>{msg.text}</Text>
		</View>
	);
}

export default function(navigation) {
	return <ChatView navigation={navigation} />;
}
