import React, { Component } from 'react';

import supervisionStyles from '../styles/supervisions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { View, Text, FlatList, TextInput } from 'react-native';
import conversationStyles from '../styles/conversations';

class SupervisionsView extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            navigation: this.props.navigation.navigation,
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
              style={conversationStyles.addFriendButton}
              
            >
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
                      this.state.navigation.navigate('ChatView', {
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
                ListHeaderComponent={
                  <View style={conversationStyles.searchConvBox}>
                    <TextInput
                      style={conversationStyles.searchConv}
                      placeholder={'Sök...'}
                    />
                  </View>
                }
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
          <Text style={conversationStyles.messageText}>{item.msg}</Text>
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
    return <SupervisionsView navigation={navigation} />;
  }