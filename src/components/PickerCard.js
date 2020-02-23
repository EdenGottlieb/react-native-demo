import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Card from './Card';
import OriginStationPicker from './OriginStationPicker';
import DestinationStationPicker from './DestinationStationPicker';
import SwitchButton from './SwitchButton';
import TimePicker from './TimePicker';

class PickerCard extends Component {
  render() {
    return (
      <Card>
        <View style={styles.container}>
          <OriginStationPicker/>
          <View style={styles.middleContainer}>
            <View style={{ width: 20 }}/>
            <Image source={require('../../assets/purple-connector.png')} style={styles.connector}/>
            <SwitchButton/>
          </View>
          <DestinationStationPicker/>
          <TimePicker/>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 200,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  connector: {
    width: 10,
    height: 60,
  },
});



export default PickerCard;
