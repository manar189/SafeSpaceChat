import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConversationView from '../views/conversations';
import ChatView from '../views/chat';
import AddFriend from '../views/addFriend';
import SignIn from '../views/signIn';
import Register from '../views/register';

const Stack = createStackNavigator();
var signedIn = false;
var startScreen = 'SignIn';

function MainStackNavigator() {
  // Detta gör inget nu men tanken är att när man loggat in en gång så öppnas conversationView istället för signIn
  if (signedIn) {
    startScreen = 'Conversation';
  } else {
    startScreen = 'Register';
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={startScreen}
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#276a76',
            height: 100,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            alignSelf: 'center',
          },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="Conversation"
          component={ConversationView}
          options={{
            title: 'SafeSpace',
          }}
        />

        <Stack.Screen name="ChatView" component={ChatView} />

        <Stack.Screen
          name="AddFriend"
          component={AddFriend}
          options={{ title: 'Lägg till kontakt' }}
        />

        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#133b43',
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
              shadowColor: 'transparent',
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#133b43',
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
              shadowColor: 'transparent',
              elevation: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
