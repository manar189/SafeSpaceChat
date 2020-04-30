import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import conversationStyles from '../styles/conversations';
import superviseStyle from '../styles/supervise';
import footerStyle from '../styles/footer';

import superviseUser from '../connections/superviseUser';

class SuperviseUser extends Component {
	constructor(props) {
		super(props);
		var routeParams = this.props.navigation.route.params;

		this.state = {
			userId: routeParams.userId,
			navigation: this.props.navigation.navigation,
			supervisedData: [],
			supervisedUserId: routeParams.userId,
			supervisedUserName: routeParams.userName
		};
	}

	async componentDidMount() {
		const loadedData = await superviseUser(this.state.supervisedUserId);
		console.log('loaded data : ' + JSON.stringify(loadedData.data));

		this.setState({
			supervisedData: loadedData.data
		});
	}

	// nMessages: conversation.messages.length,
	// messageDate: date
	// 2020-03-11T07:48:23.196+00:00

	setHeaderOptions() {
		this.state.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={conversationStyles.addFriendButton}>
					<FontAwesome name="child" size={40} color="white" />
				</TouchableOpacity>
			),
			title: this.state.supervisedUserName
		});
	}

	render() {
		this.setHeaderOptions();

		return (
			<View style={conversationStyles.list}>
				<FlatList
					style={conversationStyles.container}
					contentContainerStyle={conversationStyles.contentContainer}
					data={this.state.supervisedData}
					keyExtractor={(supervised, index) => {
						supervised.messageDate.toString();
					}}
					renderItem={({ item }) => (
						<View style={superviseStyle.supervisedUserContact}>
							<Text style={superviseStyle.name}>{'Kontaktens namn'}</Text>
							<Text style={superviseStyle.data}>
								{item.nMessages + ' meddelanden. '}
								{'Senast: ' + item.messageDate.slice(0, 10)}
							</Text>
						</View>
					)}
					ItemSeparatorComponent={() => {
						return <View style={conversationStyles.separator} />;
					}}
				/>

				<View style={footerStyle.footerBox}>
					<View style={[ footerStyle.conversationsButton, footerStyle.inactive ]}>
						<TouchableOpacity
							style={footerStyle.inactiveButton}
							onPress={() => {
								this.state.navigation.navigate('Conversation', {
									userId: this.state.userId
								});
							}}
						>
							<View style={footerStyle.iconPadding}>
								<Image
									source={require('../img/Chat/ChattKonvoTransp.png')}
									style={[ { resizeMode: 'contain' }, footerStyle.convIcon ]}
								/>
							</View>
						</TouchableOpacity>
					</View>

					<View style={[ footerStyle.conversationsButton, footerStyle.inactive ]}>
						<TouchableOpacity
							style={footerStyle.inactiveButton}
							onPress={() => {
								this.state.navigation.navigate('Supervisions', {
									userId: this.state.userId
								});
							}}
						>
							<View style={footerStyle.iconPadding}>
								<Image
									source={require('../img/Supervise/SuperviseGrey.png')}
									style={[ { resizeMode: 'contain' }, footerStyle.supIcon ]}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default function(navigation) {
	return <SuperviseUser navigation={navigation} />;
}
