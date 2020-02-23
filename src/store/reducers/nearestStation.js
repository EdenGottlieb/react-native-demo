import { actions } from '../../constants';

export default function nearestStation(state = '', action) {
  switch (action.type) {
    case actions.SET_NEAREST_STATION:
      return action.payload;
    default:
      return state;
  }
}
