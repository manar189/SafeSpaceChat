import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import ConversationView from '../views/conversations';
import ChatView from '../views/chat';
import AddFriend from '../views/addFriend';
import SignIn from '../views/signIn';
import Register from '../views/register';
import Start from '../views/start';
import Help from '../views/help';
import Scan from '../views/signInScan';
import ScanRegister from '../views/scanRegister';
import SupervisionView from '../views/supervisions';
import SuperviseUser from '../views/superviseUser';

import supervisionsStyles from '../styles/supervisions';

function getTabBarVisible(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Supervision' || 'ConversationView';

  if (
    routeName === 'SuperviseUser' ||
    routeName === 'ChatView' ||
    routeName == 'AddFriend'
  ) {
    return false;
  }

  return true;
}

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#4499a9',
        }}
      >
        <Tab.Screen
          name="ConversationView"
          component={MainStackNavigator}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisible(route),
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="home"
                style={supervisionsStyles.tabBarIcons}
                color={color}
                size={30}
              />
            ),
            tabBarLabel: '',
          })}

          // options={{
          //

          // }}
        />
        <Tab.Screen
          name="Supervision"
          component={SuperviseStack}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisible(route),
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="supervisor-account"
                style={supervisionsStyles.tabBarIcons}
                color={color}
                size={30}
              />
            ),
            tabBarLabel: '',
          })}
          // options={{
          //   tabBarLabel: '',

          // }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Start"
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

      <Stack.Screen
        name="Start"
        component={Start}
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
        name="Help"
        component={Help}
        options={{
          title: 'Hjälp',
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
        name="Scan"
        component={Scan}
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
        name="ScanRegister"
        component={ScanRegister}
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
  );
}

//const Supervisions = createStackNavigator();

function SuperviseStack() {
  return (
    <Stack.Navigator
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
        name="Supervision"
        component={SupervisionView}
        options={{ title: 'Övervaka' }}
      />

      <Stack.Screen
        name="SuperviseUser"
        component={SuperviseUser}
        options={{ title: 'Kalle Kula', tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
}

export default MainTabNavigator;
