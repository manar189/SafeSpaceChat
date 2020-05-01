import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConversationView from '../views/conversations';
import ChatView from '../views/chat';
import AddFriend from '../views/addFriend';
import SignIn from '../views/signIn';
import Register from '../views/register';
import Start from '../views/start';
import Help from '../views/help';
import Scan from '../views/signInScan';
import ScanRegister from '../views/scanRegister';
import Supervisions from '../views/supervisions';
import SuperviseUser from '../views/superviseUser';
import superviseNewQR from '../views/superviseNewQr';
import superviseSignInQR from '../views/superviseSignInQr';
import LogInScan from '../views/logInScan';



const Stack = createStackNavigator();

var signedIn = false;
var startScreen = 'SignIn';

function MainStackNavigator() {
  if (signedIn) {
    startScreen = 'Conversation';
  } else {
    // Vill du inte alltid börja på startskärmen så ändra här till den skärm du önskar
    // Skärmen du önskar heter som namnet den importeras som
    startScreen = 'Start';
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

        <Stack.Screen
          name="Supervisions"
          component={Supervisions}
          options={{
            title: 'Övervaka',
          }}
        />
        <Stack.Screen
          name="SuperviseUser"
          component={SuperviseUser}
          options={{
            title: 'Övervaka',
          }}
        />
        <Stack.Screen
          name="superviseNewQR"
          component={superviseNewQR}
          options={{
            title: 'Skapa nytt konto',
          }}
        />

        <Stack.Screen
          name="superviseSignInQR"
          component={superviseSignInQR}
          options={{
            title: 'Logga in kopplat konto',
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
          name="LogInScan"
          component={LogInScan}
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
    </NavigationContainer>
  );
}
export default MainStackNavigator;
