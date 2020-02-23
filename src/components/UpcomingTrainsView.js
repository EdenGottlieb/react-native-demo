import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { upcomingTrains } from '../store/selectors';
import RouteCard from './RouteCard';
import { setMoreInfoRoute } from '../store/actions/index';
import { statuses } from '../constants';
import NoTrains from './NoTrains';

class UpcomingTrainsView extends Component {

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  keyExtractor(item) {
    return item[0].id;
  }

  renderItem({ item }) {
    const route = item;
    return (
      <RouteCard
        route={route}
        showMoreHandler={this.props.setMoreInfoRoute}
        initialNumToRender={5}
      />
    );
  }
  render() {
    if (this.props.trains.length === 0 && this.props.idle) {
      return <NoTrains/>;
    } else {
      return (
        <FlatList
          data={this.props.trains}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      );
    }

  }
}

const mapStateToProps = state => ({
  trains: upcomingTrains(state),
  idle: state.status === statuses.IDLE,
});

const mapDispatchToProps = {
  setMoreInfoRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingTrainsView);
