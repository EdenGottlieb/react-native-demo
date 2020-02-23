import React, { Component } from 'react';
import { View, Picker, StyleSheet, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { setOriginStation } from '../store/actions/index';
import store from '../store/index';

export class OriginStationPicker extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/location-pin.png')} style={styles.image}/>
        <Picker
          selectedValue={this.props.originStation}
          onValueChange={this.props.setOriginStation}
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

const mapStateToProps = ({ stations, originStation }) => ({
  stations,
  originStation,
});

const mapDispatchToProps = dispatch => {
  return {
    setOriginStation: originStationId => {
      const destinationStation = store.getState().destinationStation;
      if (destinationStation === originStationId) {
        Alert.alert('You can\'t choose the same station in both fields.');
      } else {
        dispatch(setOriginStation(originStationId));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OriginStationPicker);
