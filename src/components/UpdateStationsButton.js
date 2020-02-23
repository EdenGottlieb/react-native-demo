import React, { Component } from 'react';
import { Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateStations } from '../store/actions/index';
import { fetchStations } from '../api/index';

class HomeButton extends Component {

  constructor(props) {
    super(props);
    this.onButtonPress = requestAnimationFrame.bind(this, this.props.updateStations);
  }

  render() {
    return (
      <Button
        onPress={this.props.updateStations}
        hitSlop={{ top: 20, bottom: 40, left: 40, right: 40 }}
        title="Update stations list"
        color="#6c61e4"
      />
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    async updateStations() {
      try {
        const stations = await fetchStations();
        dispatch(updateStations(stations));
        Alert.alert('Stations updated successfully.');
      } catch (e) {
        Alert.alert('Something went wrong, please try again later.');
      }
    },
  };
};

export default connect(null, mapDispatchToProps)(HomeButton);
