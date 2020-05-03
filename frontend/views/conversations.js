/* OBS OM DET INTE GÅR ATT STARTA EXPO PGA NAVIGATION INTE FINNS ÄVEN EFTER NPM INSTALL OSV.
Skriv följande kommandon:

npm install @react-navigation/native
npm install @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view */

import React, { Component } from 'react';

import { View, Text, Image, FlatList, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import conversationStyles from '../styles/conversations';
import footerStyle from '../styles/footer';
import loadFriends from '../connections/loadFriends';

class ConversationsView extends Component {
	constructor(props) {
		super(props);
		var routeParams = this.props.navigation.route.params;

		this.state = {
			userId: routeParams.userId,
			isSupervisor: routeParams.isSupervisor,
			navigation: this.props.navigation.navigation,
			conversations: [],
			error: '',
			isRefreshing: false,
		};
	}

	async componentDidMount() {
		const loadedFriends = await loadFriends(this.state.userId);
		if (!loadedFriends.data) {
			console.log('Inga vänner');
		} else {
			this.setState({ conversations: loadedFriends.data });
		}
	}

	setHeaderOptions() {
		this.state.navigation.setOptions({
			headerLeft: () => null,
			headerRight: () => (
				<TouchableOpacity
					style={conversationStyles.addFriendButton}
					onPress={() => {
						this.state.navigation.navigate('AddFriend', {
							userId: this.state.userId
						});
					}}
				>
					<MaterialIcons name="person-add" size={40} color="white" style={{ marginRight: 5 }} />
				</TouchableOpacity>
			)
		});
	}

	onRefresh() {
		this.setState({ isRefreshing: true });
		this.componentDidMount();
		this.setState({isRefreshing:false,});
	  }

	render() {
		this.setHeaderOptions();

		return (
			<View style={conversationStyles.list}>
				<FlatList
					style={conversationStyles.container}
					contentContainerStyle={conversationStyles.contentContainer}
					data={this.state.conversations}
					refreshControl={
						<RefreshControl
						  refreshing={this.state.isRefreshing}
						  onRefresh={this.onRefresh.bind(this)}
						/>
					  }
					keyExtractor={(conversation, index) => conversation.conversationId.toString()}
					renderItem={({ item }) => {
						return (
							<OptionButton
								item={item}
								func={() => {
									this.state.navigation.navigate('ChatView', {
										userId: this.state.userId,
										conversationId: item.conversationId,
										userName: item.label,
										receiverId: item.userId
									});
								}}
							/>
						);
					}}
					ItemSeparatorComponent={() => {
						return <View style={conversationStyles.separator} />;
					}}
					ListHeaderComponent={
						<View style={conversationStyles.searchConvBox}>
							<TextInput style={conversationStyles.searchConv} placeholder={'Sök...'} />
						</View>
					}
					ListFooterComponent={
						<View style={conversationStyles.nautView}>
							<Image
								source={require('../img/Mascot/Clean.png')}
								style={[ { resizeMode: 'contain' }, conversationStyles.naut ]}
							/>
						</View>
					}
					ListEmptyComponent={
						<View style={conversationStyles.noFriends}>
							<Text style={conversationStyles.noFriendsText}>
								Lägg till en kontakt för att kunna chatta
							</Text>
						</View>
					}
				/>
				<RenderFooter
					isSupervisor={this.state.isSupervisor}
					func={() => {
						this.state.navigation.navigate('Supervisions', {
							userId: this.state.userId
						});
					}}
				/>
			</View>
		);
	}
}

function OptionButton({ item, func }) {
	//console.log('items: ' + item);
	if (item.supervised) {
		return (
			<RectButton style={conversationStyles.option} onPress={func}>
				<View style={[ conversationStyles.optionTextContainer, conversationStyles.isSupervised ]}>
					<View style={conversationStyles.text}>
						<Text style={conversationStyles.optionText}>{item.label}</Text>
						<Text style={conversationStyles.messageText}>{item.msg}</Text>
					</View>
					<Image
						source={require('../img/Eye/EyeMix.png')}
						style={[ { resizeMode: 'contain' }, conversationStyles.eyeIcon ]}
					/>
				</View>
			</RectButton>
		);
	}
	return (
		<RectButton style={conversationStyles.option} onPress={func}>
			<View style={[ conversationStyles.optionTextContainer ]}>
				<View style={conversationStyles.text}>
					<Text style={conversationStyles.optionText}>{item.label}</Text>
					<Text style={conversationStyles.messageText}>{item.msg}</Text>
				</View>
			</View>
		</RectButton>
	);
}

function RenderFooter({ isSupervisor, func }) {
	if (isSupervisor) {
		return (
			<View style={footerStyle.footerBox}>
				<View style={[ footerStyle.conversationsButton, footerStyle.active ]}>
					<View style={footerStyle.iconPadding}>
						<Image
							source={require('../img/Chat/ChattKonvoFinal.png')}
							style={[ { resizeMode: 'contain' }, footerStyle.convIcon ]}
						/>
					</View>
				</View>

				<TouchableOpacity style={[ footerStyle.supervisionsButton, footerStyle.inactive ]} onPress={func}>
					<View style={footerStyle.iconPadding}>
						<Image
							source={require('../img/Supervise/SuperviseEye.png')}
							style={[ { resizeMode: 'contain' }, footerStyle.supIcon ]}
						/>
					</View>
				</TouchableOpacity>
			</View>
		);
	} else {
		return <View />;
	}
}

export default function(navigation) {
	
	return <ConversationsView navigation={navigation} />;
}
