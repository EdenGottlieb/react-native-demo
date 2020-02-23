import React, { PureComponent } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

export default class DimmedModal extends PureComponent {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback onPress={this.props.onDimmedPress}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
