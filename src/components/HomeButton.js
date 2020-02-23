import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { takeMeHome } from '../store/actions/index';
import store from '../store';

class HomeButton extends Component {

  constructor(props) {
    super(props);
    this.onButtonPress = requestAnimationFrame.bind(this, this.props.takeMeHome);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onButtonPress} hitSlop={{ top: 40, bottom: 40, left: 20, right: 40 }}>
        <Image style={styles.image} source={require('../../assets/home.png')}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20,
  },
});


const mapDispatchToProps = dispatch => ({
  takeMeHome: () => {
    const { nearestStation, homeStation } = store.getState();
    if (!nearestStation) {
      Alert.alert('', 'Location not available at the moment.');
    } else if (nearestStation === homeStation) {
      Alert.alert('', 'You are already home!');
    } else {
      dispatch(takeMeHome());
    }
  },
});

export default connect(null, mapDispatchToProps)(HomeButton);
