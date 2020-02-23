import React, { Component } from 'react';
import { View, Picker, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { setHomeStation } from '../store/actions/index';

class HomeStationPicker extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/home.png')} style={styles.image}/>
        <Picker
          selectedValue={this.props.homeStation}
          onValueChange={this.props.setHomeStation}
          style={styles.picker}
          hitSlop={{ top: 70, bottom: 70, left: 70, right: 70 }}
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
    margin: 10,
  },
  image: {
    height: 13,
    width: 13,
  },
});

const mapStateToProps = ({ stations, homeStation }) => ({
  stations,
  homeStation,
});

const mapDispatchToProps = ({ setHomeStation });

export default connect(mapStateToProps, mapDispatchToProps)(HomeStationPicker);
