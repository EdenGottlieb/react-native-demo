import { actions } from '../../constants';

export default function homeStation(state = '', action) {
  switch (action.type) {
    case actions.UPDATE_STATIONS:
      return state !== '' ? state : action.payload[0].id;
    case actions.SET_HOME_STATION:
      return action.payload;
    case actions.INFLATE_STORE:
      return action.payload.homeStation || state;
    default:
      return state;
  }
}
