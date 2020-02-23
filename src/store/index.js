import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import mainReducer from './reducers';
import { updateStations, inflateStore, setNearestStation, fetchRoutes } from './actions/index';
import * as persistence from './persistence';
import { getNearestStation } from '../location-manager/index';
import { fetchStations } from '../api/index';
import { upcomingTrains } from './selectors';
import { convertMomentToDatetimeString } from './time.helper';
import moment from 'moment';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(promiseMiddleware())));

export const initStore = async () => {
  const persistedStore = await persistence.getState();
  if (persistedStore && persistedStore.stations.length > 0) {
    store.dispatch(inflateStore(persistedStore));
    // To check if we have current trains
    persistedStore.time = convertMomentToDatetimeString(moment());
    if (upcomingTrains(persistedStore).length === 0) {
      store.dispatch(fetchRoutes(persistedStore.originStation, persistedStore.destinationStation));
    }
  } else {
    const stations = await fetchStations();

    store.dispatch(updateStations(stations));
  }
  const nearestStation = await getNearestStation();

  if (nearestStation) {
    store.dispatch(setNearestStation(nearestStation));
  }
  store.subscribe(() => {
    persistence.saveState(store.getState());
  });
};

export default store;
