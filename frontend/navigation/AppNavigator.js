import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import ConversationView from '../views/conversations';
import ChatView from '../views/chat';
import AddFriend from '../views/addFriend';
import SupervisionView from '../views/supervisions';

import conversationStyles from '../styles/conversations';

const Tab = createBottomTabNavigator();

 function MainTabNavigator() {
  return(
    <NavigationContainer>
    <Tab.Navigator tabBarOptions={{
      activeTintColor: 'green',

    }}>
      <Tab.Screen
          name="ConversationView"
          component={MainStackNavigator}
          options={{
            tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          }}
        />
        <Tab.Screen
          name="Supervision"
          component={SuperviseStack}
          options={{
            tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="supervisor-account" color={color} size={size} />
          ),
          }}
        />
    </Tab.Navigator>
    </NavigationContainer>
  )
}

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    
      <Stack.Navigator
        initialRouteName="ConversationView"
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#276a76',
            height: 100,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="ConversationView"
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
      </Stack.Navigator>
    
  );
}

//const Supervisions = createStackNavigator();

function SuperviseStack() {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      headerStyle: {
        backgroundColor: '#276a76',
        height: 100,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerTintColor: 'white',
    }}>
   <Stack.Screen
          name="Supervision"
          component={SupervisionView}
          options={{ title: 'Övervaka' }}
        />
    </Stack.Navigator>
  )
}

export default MainTabNavigator;