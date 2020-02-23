import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { fetchRoutes, switchStations } from '../store/actions/index';
import store from '../store/index';
import { convertDatetimeStringToMoment } from '../store/time.helper';

export class SwitchButton extends Component {

  render() {
    return (
      <TouchableOpacity hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }} onPress={this.props.onStationsSwitch}>
        <Image source={require('../../assets/switch.png')} style={styles.switchImage}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  switchImage: {
    width: 20,
    height: 20,
  },
});


const mapDispatchToProps = dispatch => ({
  onStationsSwitch: () => {
    const { originStation, destinationStation, time } = store.getState();
    requestAnimationFrame(() => {
      dispatch(fetchRoutes(destinationStation, originStation, convertDatetimeStringToMoment(time)));
      dispatch(switchStations({ destinationStation: originStation, originStation: destinationStation }));
    });
  },
});

export default connect(null, mapDispatchToProps)(SwitchButton);
