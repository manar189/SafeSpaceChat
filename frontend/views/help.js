import React, { Component } from 'react';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import startStyles from '../styles/start.scss';
import helpStyle from '../styles/help.scss';
import buttonStyle from '../styles/button.scss';

class HelpView extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      navigation: this.props.navigation.navigation,
    };
  }

  render() {
    return (
      <View style={startStyles.container}>
        <View style={helpStyle.helpBox}>
          <Text style={[helpStyle.instructions, helpStyle.marginTop]}>
            Safe Space gör det möjligt att chatta på ett säkert sätt. Du kan
            bara chatta med personer du träffat i verkligheten som läggs till
            via skanning av en QR-kod.
          </Text>

          <Text style={helpStyle.title}>Registrera</Text>
          <Text style={helpStyle.instructions}>
            Genom att registrera ett konto kan du koppla konton till dig. Dessa
            konton har du översikt över och kan se dess kontakter samt hur
            aktiva de chatterna är.
          </Text>

          <Text style={helpStyle.title}>Skanna</Text>

          <Text style={helpStyle.instructions}>
            Genom att skanna en kod kopplas du till ett registrerat konto. Du
            kommer alltså inte behöva registrera ett konto.
          </Text>
        </View>
        <TouchableOpacity
          style={buttonStyle.button}
          onPress={() => this.state.navigation.navigate('Start')}
        >
          <Text style={[buttonStyle.text, buttonStyle.ok]}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function (navigation) {
  return <HelpView navigation={navigation} />;
}
