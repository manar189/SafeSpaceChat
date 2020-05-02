import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import conversationStyles from '../styles/conversations';
import superviseStyle from '../styles/supervise';

import superviseUser from '../connections/superviseUser';
import footerStyle from '../styles/footer';

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

		this.setState({
			supervisedData: loadedData.data
		});
	}

	setHeaderOptions() {
		this.state.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={conversationStyles.addFriendButton}
					onPress={() =>
						this.state.navigation.navigate('SuperviseSignInQR', {
							userId: this.state.supervisedUserId,
							name: this.state.supervisedUserName
						})}
				>
					<FontAwesome name="qrcode" size={40} color="white" style={{ marginRight: 5 }} />
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
						supervised.conversationId;
					}}
					renderItem={({ item }) => (
						<View style={superviseStyle.supervisedUserContact}>
							<Text style={superviseStyle.name}>{item.otherUserName}</Text>
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
									source={require('../img/Chat/ChattKonvoFinal.png')}
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
									source={require('../img/Supervise/SuperviseEye.png')}
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
