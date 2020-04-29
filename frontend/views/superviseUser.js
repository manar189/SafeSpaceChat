import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import conversationStyles from '../styles/conversations';

class SuperviseUser extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            navigation: this.props.navigation.navigation,
            conversations: TEMPDATA,
        };
          }

          setHeaderOptions() {
            this.state.navigation.setOptions({
            //   headerLeft: () => (
            //     <TouchableOpacity style={conversationStyles.profileButton}>
            //       <EvilIcons name="user" size={40} color="white" />
            //     </TouchableOpacity>
            //   ),
              headerRight: () => (
                <TouchableOpacity
                  style={conversationStyles.addFriendButton}>
                  <FontAwesome name="child" size={40} color="white" />
                </TouchableOpacity>
              ),
            });
          }
          render () {
            this.setHeaderOptions();
  
            return (
                
                    <FlatList
                style={conversationStyles.container}
                contentContainerStyle={conversationStyles.contentContainer}
                data={this.state.conversations}
                renderItem={({ item }) => (
                  <OptionButton
                    item={item}
                    func={() =>
                      this.state.navigation.navigate('SuperviseUser', {
                        userId: item.userId,
                        conversationId: item.conversationId,
                        userName: item.label,
                      })
                    }
                  />
                )}
                ItemSeparatorComponent={() => {
                  return <View style={conversationStyles.separator} />;
                }}
                // ListHeaderComponent={
                //   <View style={conversationStyles.searchConvBox}>
                //     <TextInput
                //       style={conversationStyles.searchConv}
                //       placeholder={'Sök...'}
                //     />
                //   </View>
                // }
              />
                
            );
          }
}

function OptionButton({ item, func }) {
    return (
      <RectButton style={conversationStyles.option} onPress={func}>
        <View style={{ flexDirection: 'row' }}>
          <View style={conversationStyles.optionIconContainer}>
            <Entypo name={item.icon} size={40} color="#4499a9" />
          </View>
          <View style={conversationStyles.optionTextContainer}>
            <Text style={conversationStyles.optionText}>{item.label}</Text>
            <Text style={conversationStyles.messageText}>{item.msgCount}{item.date}</Text>
          </View>
        </View>
        <View style={conversationStyles.parentMode}>
          <MaterialCommunityIcons
            //name={parentIcon}
            size={30}
            style={conversationStyles.parentChild}
          />
        </View>
      </RectButton>
    );
  }

export default function (navigation) {
    return <SuperviseUser navigation={navigation} />;
  }

  const TEMPDATA = [
    {
      icon: 'circle',
      label: 'Lisa Avlång',
      msgCount: '25 meddelanden, ',
      date: 'Senast: 4/5-20',
      userId: '5e843ddbbd8a99081cd3f613',
      conversationId: '5e68c508c18e2a00ee6bf0f8',
    }
  ];