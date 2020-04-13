import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {EvilIcons} from '@expo/vector-icons';
import ConversationView from '../views/conversations'
import ChatView from '../views/chat'
import { TouchableOpacity } from 'react-native';

import conversationStyles from '../styles/conversations';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='ConversationView' screenOptions={{
    gestureEnabled: true,
    headerStyle: {
      backgroundColor: '#276a76'
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerTintColor: 'white'
  }}>
        <Stack.Screen 
        name='ConversationView' 
        component={ConversationView} 
        options={{ title: 'SafeSpace', headerLeft: () => (
          <TouchableOpacity style={conversationStyles.profile}> 
            <EvilIcons name="user" size="40" color="white"/>
          </TouchableOpacity> ),
          }} 
        />
        <Stack.Screen name='ChatView'
        component={ChatView}
        options={{title: 'Kalle Kula'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator