import { actions } from '../../constants';

export default function stations(state = [], action) {
  switch (action.type) {
    case actions.UPDATE_STATIONS:
      return action.payload;
    case actions.INFLATE_STORE:
      return action.payload.stations;
    default:
      return state;
  }
}
