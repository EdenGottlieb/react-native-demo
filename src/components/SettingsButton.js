import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import SettingsModal from './SettingsModal';

export default class SettingsButton extends Component {

  state = {
    modalVisible: false,
  }

  showModal = () => requestAnimationFrame(() => this.setState({ modalVisible: true }))
  hideModal = () => requestAnimationFrame(() => this.setState({ modalVisible: false }))

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showModal} hitSlop={{ top: 40, bottom: 40, left: 40, right: 20 }}>
          <Image style={styles.image} source={require('../../assets/settings.png')}/>
        </TouchableOpacity>
        <SettingsModal showModal={this.state.modalVisible} dismissModal={this.hideModal}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20,
  },
});
