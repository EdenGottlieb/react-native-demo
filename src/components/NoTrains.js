import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class NoTrains extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> No trains for selected time. </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginTop: 5,
  },
});
