import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import DimmedModal from './DimmedModal';
import { connect } from 'react-redux';
import getRouteById from '../store/selectors/getRouteById';
import store from '../store';
import { clearMoreInfoRoute } from '../store/actions/index';
import stationIdToName from '../store/selectors/stationIdToName';
import { convertDatetimeStringToMoment } from '../store/time.helper';

class MoreInfoModal extends Component {
  render() {
    return this.props.route ? <View>
      <DimmedModal onDimmedPress={this.props.clearMoreInfoRoute}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={this.props.clearMoreInfoRoute}
              hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            >
              <Image source={require('../../assets/x.png')} style={styles.x}/>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              {this.props.route.map((train, index) =>
                [
                  index === 0 ? (
                    <View style={styles.routeItem} key={`${train.id}departure`}>
                      <Text style={styles.stationName}>{train.origin}</Text>
                    </View>
                  ) : null,
                  <View style={styles.routeItem} key={`${train.id}departureTime`}>
                    <Text style={styles.time}>(Platform {train.departurePlatform}) {convertDatetimeStringToMoment(train.departure).format('HH:mm')}</Text>
                  </View>,
                  <Image key={'connector'} source={require('../../assets/purple-connector.png')} style={[styles.connector, styles.routeItem]}/>,
                  <View style={styles.routeItem} key={`${train.id}arrival`}>
                    <Text style={styles.time}>(Platform {train.arrivalPlatform}) {convertDatetimeStringToMoment(train.arrival).format('HH:mm')}</Text>
                  </View>,
                  <View style={styles.routeItem} key={`${train.id}arrivalTime`}>
                    <Text style={styles.stationName}>{train.destination}</Text>
                  </View>,
                ]
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </DimmedModal>
    </View> : null;
  }
}

const styles = StyleSheet.create({
  stationName: {
    fontSize: 15,
  },
  time: {
    fontSize: 15,
    fontWeight: '800',
  },
  routeItem: {
    marginBottom: 3,
    marginTop: 3,
    alignItems: 'center',
  },
  modal: {
    borderRadius: 5,
    width: '80%',
    minHeight: '50%',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  connector: {
    width: 10,
    height: 60,
  },
  modalContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  x: {
    height: 21,
    width: 21,
  },
});

const mapStateToProps = ({ moreInfoRoute }) => {
  let route = getRouteById(store.getState(), moreInfoRoute);

  if (route) {
    route = route.map(train => ({
      ...train,
      origin: stationIdToName(train.origin),
      destination: stationIdToName(train.destination),
    }));

    return { route };
  } else {
    return { route: null };
  }

};

const mapDispatchToProps = {
  clearMoreInfoRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoModal);
