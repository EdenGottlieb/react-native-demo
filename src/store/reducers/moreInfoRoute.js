import { actions } from '../../constants';

export default function moreInfoRoute(state = null, action) {
  switch (action.type) {
    case actions.CLEAR_MORE_INFO_ROUTE:
      return null;
    case actions.SET_MORE_INFO_ROUTE:
      return action.payload;
    default:
      return state;
  }
}
