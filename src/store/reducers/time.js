import { actions } from '../../constants';
import moment from 'moment';
import { convertMomentToDatetimeString } from '../time.helper';

export default function time(state = convertMomentToDatetimeString(moment()), action) {
  switch (action.type) {
    case actions.SET_TIME:
      return action.payload;
    default:
      return state;
  }
}
