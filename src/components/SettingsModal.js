import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import DimmedModal from './DimmedModal';
import HomeStationPicker from './HomeStationPicker';
import UpdateStationsButton from './UpdateStationsButton';

export default class SettingsModal extends Component {
  fakeHandler = () => true

  render() {
    return this.props.showModal ? <View>
      <DimmedModal onDimmedPress={this.props.dismissModal}>
        <View style={styles.modal} onStartShouldSetResponder={this.fakeHandler}>
          <TouchableOpacity
            onPress={this.props.dismissModal}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          >
            <Image source={require('../../assets/x.png')} style={styles.x}/>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Settings</Text>
            <View style={styles.pickerContainer}>
              <Text styles={styles.pickerHeader}>Pick a home station:</Text>
            </View>
            <HomeStationPicker/>
            <UpdateStationsButton/>
          </View>
        </View>
      </DimmedModal>
    </View> : null;
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'flex-start',
  },
  pickerHeader: {
  },
  modal: {
    borderRadius: 5,
    width: '80%',
    minHeight: '50%',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  modalContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  x: {
    height: 21,
    width: 21,
  },
  header: {
    fontWeight: '500',
  },
});
