import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { updateStations } from '../store/actions';
import UpcomingTrainsView from './UpcomingTrainsView';
import PickerCard from './PickerCard';
import MoreInfoModal from './MoreInfoModal';
import SettingsButton from './SettingsButton';
import HomeButton from './HomeButton';
import { statuses } from '../constants';

class Main extends Component {
  render() {
    return (
      <View style={styles.center}>
        <View style={styles.container}>
          <View style={styles.topButtonsContainer}>
            <View style={styles.topButtonsInnerContainer}>
              {this.props.loading ? <ActivityIndicator animating size={20}/> : <View style={styles.iconPlaceholder}/>}
              <SettingsButton/>
              <HomeButton/>
            </View>
          </View>
          <PickerCard/>
          <UpcomingTrainsView/>
          <MoreInfoModal/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconPlaceholder: {
    height: 20,
    width: 20,
  },
  topButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 0,
  },
  topButtonsInnerContainer: {
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  modal: {
    margin: 40,
    padding: 80,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  center: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  loading: state.status === statuses.LOADING,
});

export default connect(
  mapStateToProps,
  { updateStations }
)(Main);
