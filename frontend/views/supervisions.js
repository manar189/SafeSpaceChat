import React, { Component } from 'react';

import supervisionStyles from '../styles/supervisions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'react-native';
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
              //onPress={() => this.state.navigation.navigate('')}
            >
              <FontAwesome name="child" size={40} color="white" />
            </TouchableOpacity>
          ),
        });
      }

      render () {
          this.setHeaderOptions();

          return (
              <View>
                  <Text>Övervakning</Text>
              </View>
          );
      }
}

export default function (navigation) {
    return <SupervisionsView navigation={navigation} />;
  }