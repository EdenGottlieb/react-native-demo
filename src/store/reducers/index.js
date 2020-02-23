import { combineReducers } from 'redux';
import stations from './stations';
import routes from './routes';
import destinationStation from './destinationStation';
import originStation from './originStation';
import homeStation from './homeStation';
import moreInfoRoute from './moreInfoRoute';
import nearestStation from './nearestStation';
import status from './status';
import time from './time';

const mainReducer = combineReducers({
  time,
  status,
  stations,
  routes,
  destinationStation,
  originStation,
  nearestStation,
  homeStation,
  moreInfoRoute,
});

export default mainReducer;
