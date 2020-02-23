import moment from 'moment';

export const convertDatetimeStringToMoment = datetimeString => moment(datetimeString, 'DD/MM/YYYY HH:mm');
export const convertMomentToDatetimeString = momentObject => momentObject.format('DD/MM/YYYY HH:mm');
export function convertMomentToHumanTimestring(momentObject) {
  const currentTime = moment();
  if (momentObject.isSame(currentTime, 'minute')) {
    return 'Now';
  } else if (momentObject.isSame(currentTime, 'day')) {
    return momentObject.format('HH:mm');
  } else {
    return momentObject.format('ddd HH:mm');
  }
}
