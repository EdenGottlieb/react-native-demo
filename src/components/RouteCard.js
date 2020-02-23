import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Card from './Card';
import stationIdToName from '../store/selectors/stationIdToName';
import { convertDatetimeStringToMoment } from '../store/time.helper';

export class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.showMoreHandler = this.showMoreHandler.bind(this);
  }

  showMoreHandler() {
    const firstTrain = this.props.route[0];
    this.props.showMoreHandler(firstTrain.id);
  }

  render() {
    const firstTrain = this.props.route[0];
    const lastTrain = this.props.route[this.props.route.length - 1];
    const changeStations = this.props.route.slice(1).map(route => stationIdToName(route.origin));
    return (
      <Card>
        <View style={styles.container}>
          <Text style={styles.title}>Next Train</Text>
          <Text style={styles.departureTime} onPress={this.showMoreHandler}>{convertDatetimeStringToMoment(firstTrain.departure).format('HH:mm')}</Text>
          <Text style={styles.arrivalTime}>Arrive at {convertDatetimeStringToMoment(lastTrain.arrival).format('HH:mm')}</Text>
          {
            this.props.route.length > 1 ? (
              <Text style={styles.changes}>Change at {changeStations.join(', ')}</Text>
            ) : null
          }
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  title: {
    fontSize: 20,
  },
  departureTime: {
    fontSize: 50,
    fontWeight: '700',
  },
  arrivalTime: {
    fontSize: 16,
  },
});
export default RouteCard;
