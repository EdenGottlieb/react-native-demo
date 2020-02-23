import { actions, success, pending, statuses, rejected } from '../../constants';

export default function status(state = '', action) {
  switch (action.type) {
    case success(actions.UPDATE_ROUTES):
      return statuses.IDLE;
    case pending(actions.UPDATE_ROUTES):
      return statuses.LOADING;
    case rejected(actions.UPDATE_ROUTES):
      return statuses.ERROR;
    default:
      return state;
  }
}
