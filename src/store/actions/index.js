import { actions } from '../../constants';
import * as api from '../../api';
import store from '../index';
import { convertMomentToDatetimeString, convertDatetimeStringToMoment } from '../time.helper';
import moment from 'moment';

export const updateStations = stations => ({
  type: actions.UPDATE_STATIONS,
  payload: stations,
});

export const setDestinationStation = destinationStationId => {
  const { originStation, time } = store.getState();
  if (originStation) {
    store.dispatch(fetchRoutes(originStation, destinationStationId, convertDatetimeStringToMoment(time)));
  }
  return {
    type: actions.SET_DESTINATION_STATION,
    payload: destinationStationId,
  };
};

export const setOriginStation = originStationId => {
  const { destinationStation, time } = store.getState();
  if (destinationStation) {
    store.dispatch(fetchRoutes(originStationId, destinationStation, convertDatetimeStringToMoment(time)));
  }
  return {
    type: actions.SET_ORIGIN_STATION,
    payload: originStationId,
  };
};

export const setHomeStation = homeStationId => {
  return {
    type: actions.SET_HOME_STATION,
    payload: homeStationId,
  };
};

// TODO: Think of a better way to do this
export const fetchRoutes = (origin, destination, time) => {
  const state = store.getState();
  if (!origin) {
    origin = state.originStation;
  }
  if (!destination) {
    destination = state.destinationStation;
  }
  return {
    type: actions.UPDATE_ROUTES,
    payload: api.fetchRoutes(origin, destination, time),
  };
};

export const inflateStore = store => ({
  type: actions.INFLATE_STORE,
  payload: store,
});

export const clearMoreInfoRoute = () => ({
  type: actions.CLEAR_MORE_INFO_ROUTE,
});

export const setMoreInfoRoute = routeId => ({
  type: actions.SET_MORE_INFO_ROUTE,
  payload: routeId,
});

export const switchStations = ({ originStation, destinationStation }) => ({
  type: actions.SWITCH_STATIONS,
  payload: {
    originStation,
    destinationStation,
  },
});

export const takeMeHome = () => {
  const { nearestStation, homeStation } = store.getState();
  store.dispatch(setTime(moment()));
  store.dispatch(fetchRoutes(nearestStation, homeStation));
  store.dispatch(setOriginStation(nearestStation));
  return {
    type: actions.SET_DESTINATION_STATION,
    payload: homeStation,
  };
};

export const setNearestStation = nearestStationId => {
  return {
    type: actions.SET_NEAREST_STATION,
    payload: nearestStationId,
  };
};

export const setTime = time => {
  return {
    type: actions.SET_TIME,
    payload: convertMomentToDatetimeString(moment(time)),
  };
};
