import uniq from 'lodash.uniqwith';
import moment from 'moment';
import { actions, success } from '../../constants';
import { convertDatetimeStringToMoment } from '../time.helper';

export default function routes(state = {}, action) {
  let newState;
  switch (action.type) {
    case success(actions.UPDATE_ROUTES):
      newState = { ...state };
      action.payload.forEach(route => {
        const { origin } = route[0];
        const { destination } = route[route.length - 1];
        if (!newState[origin]) {
          newState[origin] = {};
        }
        if (!newState[origin][destination]) {
          newState[origin][destination] = [];
        }
        newState[origin][destination] = uniq([
          ...newState[origin][destination],
          route,
        ], areRoutesTheSame);
      });
      newState = purgeOldRoutes(newState);
      return newState;
    case actions.INFLATE_STORE:
      return action.payload.routes;
    case actions.SWITCH_STATIONS:
    case actions.SET_DESTINATION_STATION:
    case actions.SET_ORIGIN_STATION:
      return purgeOldRoutes(state);
    default:
      return state;
  }
}

function areRoutesTheSame(route1, route2) {
  const firstRouteDeparture = route1[0].departure;
  const secondRouteDeparture = route2[0].departure;
  const firstRouteArrival = route1[route1.length - 1].arrival;
  const secondRouteArrival = route2[route2.length - 1].arrival;
  return firstRouteArrival === secondRouteArrival && firstRouteDeparture === secondRouteDeparture;
}

function purgeOldRoutes(state) {
  for (const originStation of Object.keys(state)) {
    for (const destinationStation of Object.keys(state[originStation])) {
      state[originStation][destinationStation] = state[originStation][destinationStation].filter(isRouteRelevant);
    }
  }
  return state;
}

const isRouteRelevant = route => convertDatetimeStringToMoment(route[route.length - 1].arrival) > moment();
