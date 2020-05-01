import React, { Component } from 'react';

import supervisionStyles from '../styles/supervisions';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, FlatList, Image } from 'react-native';
import conversationStyles from '../styles/conversations';
import footerStyle from '../styles/footer';
import superviseStyle from '../styles/supervise';

import loadSupervision from '../connections/loadSupervisions';

class SupervisionsView extends Component {
	constructor(props) {
		super(props);
		var routeParams = this.props.navigation.route.params;

		this.state = {
			navigation: this.props.navigation.navigation,
			userId: routeParams.userId,
			supervisions: []
		};
	}

	async componentDidMount() {
		const loadedSupervisions = await loadSupervision(this.state.userId);

		if (!loadedSupervisions.data) {
			console.log('Inga övervakningar');
		} else {
			this.setState({ supervisions: loadedSupervisions.data });
		}
	}

	setHeaderOptions() {
		this.state.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={conversationStyles.addFriendButton}>
					<MaterialIcons name="add" size={40} color="white" />
				</TouchableOpacity>
			)
		});
	}

	render() {
		this.setHeaderOptions();

		return (
			<View style={conversationStyles.list}>
				<FlatList
					style={conversationStyles.container}
					contentContainerStyle={conversationStyles.contentContainer}
					data={this.state.supervisions}
					keyExtractor={(supervised, index) => supervised.userId.toString()}
					renderItem={({ item }) => (
						<OptionButton
							item={item}
							func={() =>
								this.state.navigation.navigate('SuperviseUser', {
									userId: item.userId,
									userName: item.fullName
								})}
						/>
					)}
					ItemSeparatorComponent={() => {
						return <View style={conversationStyles.separator} />;
					}}
				/>

				<View style={footerStyle.footerBox}>
					<View style={[ footerStyle.conversationsButton, footerStyle.inactive ]}>
						<View style={footerStyle.iconPadding}>
							<TouchableOpacity
								style={footerStyle.inactiveButton}
								onPress={() => {
									this.state.navigation.navigate('Conversation', {
										userId: this.state.userId
									});
								}}
							>
								<Image
									source={require('../img/Chat/ChattKonvoFinal.png')}
									style={[ { resizeMode: 'contain' }, footerStyle.convIcon ]}
								/>
							</TouchableOpacity>
						</View>
					</View>

					<View style={[ footerStyle.supervisionsButton, footerStyle.active ]}>
						<View style={footerStyle.iconPadding}>
							<Image
								source={require('../img/Supervise/SuperviseEyeGrey.png')}
								style={[ { resizeMode: 'contain' }, footerStyle.supIcon ]}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

function OptionButton({ item, func }) {
	return (
		<RectButton style={superviseStyle.option} onPress={func}>
			<View style={{ flexDirection: 'row' }}>
				<View style={conversationStyles.optionTextContainer}>
					<Text style={superviseStyle.optionText}>{item.fullName}</Text>
				</View>
			</View>
		</RectButton>
	);
}

export default function(navigation) {
	return <SupervisionsView navigation={navigation} />;
}
