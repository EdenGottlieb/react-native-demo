import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export class Card extends Component {
  render() {
    return (
      <View style={styles.center}>
        <View style={styles.card}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  center: {
    alignItems: 'center',
  },
});
export default Card;
