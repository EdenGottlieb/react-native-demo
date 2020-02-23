import { actions } from '../../constants';

export default function originStation(state = '', action) {
  switch (action.type) {
    case actions.UPDATE_STATIONS:
      return state !== '' ? state : action.payload[0].id;
    case actions.SET_ORIGIN_STATION:
      return action.payload;
    case actions.SWITCH_STATIONS:
      return action.payload.originStation;
    case actions.INFLATE_STORE:
      return action.payload.originStation || state;
    default:
      return state;
  }
}
