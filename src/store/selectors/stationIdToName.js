import store from '../index';

export default stationId => store.getState().stations.find(station => station.id === stationId).name;
