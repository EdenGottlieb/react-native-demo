import { actions } from '../../constants';

export default function destinationStation(state = '', action) {
  switch (action.type) {
    case actions.UPDATE_STATIONS:
      return state !== '' ? state : action.payload[1].id;
    case actions.SET_DESTINATION_STATION:
      return action.payload;
    case actions.SWITCH_STATIONS:
      return action.payload.destinationStation;
    case actions.INFLATE_STORE:
      return action.payload.destinationStation || state;
    default:
      return state;
  }
}
