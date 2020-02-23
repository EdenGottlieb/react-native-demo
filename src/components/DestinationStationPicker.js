import React, { Component } from 'react';
import { View, Picker, StyleSheet, Image, Alert } from 'react-native';
import { setDestinationStation } from '../store/actions/index';
import { connect } from 'react-redux';
import store from '../store/index';

export class DestinationStationPicker extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/destination.png')} style={styles.image}/>
        <Picker
          selectedValue={this.props.destinationStation}
          onValueChange={this.props.setDestinationStation}
          style={styles.picker}
        >
          {this.props.stations.map(station => (
            <Picker.Item
              label={station.name}
              value={station.id}
              key={station.id}
            />))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 200,
  },
  image: {
    height: 13,
    width: 13,
  },
});

const mapStateToProps = ({ stations, destinationStation }) => ({
  stations,
  destinationStation,
});

const mapDispatchToProps = dispatch => {
  return {
    setDestinationStation: destinationStationId => {
      const originStation = store.getState().originStation;
      if (destinationStationId === originStation) {
        Alert.alert('', 'You can\'t choose the same station in both fields.');
      } else {
        dispatch(setDestinationStation(destinationStationId));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationStationPicker);
