import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { convertDatetimeStringToMoment, convertMomentToHumanTimestring } from '../store/time.helper';
import moment from 'moment';
import { setTime, fetchRoutes } from '../store/actions/index';

export class TimePicker extends Component {

  state = {
    pickerVisible: false,
  }

  showPicker = () => this.setState({ pickerVisible: true })

  onPickerHide = () => this.setState({ pickerVisible: false })

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.showPicker} style={styles.container}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image source={require('../../assets/time.png')} style={styles.image}/>
          <Text >{this.props.time}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.pickerVisible}
          onConfirm={this.props.setTime}
          onHideAfterConfirm={this.onPickerHide}
          onCancel={this.onPickerHide}
          mode="datetime"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
});

const mapStateToProps = state => {
  const time = convertDatetimeStringToMoment(state.time);
  return {
    time: convertMomentToHumanTimestring(time),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTime: time => {
      dispatch(setTime(time));
      dispatch(fetchRoutes(null, null, moment(time)));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);


