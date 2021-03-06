export const actions = {
  UPDATE_STATIONS: 'UPDATE_STATIONS',
  UPDATE_ROUTES: 'UPDATE_ROUTES',
  INFLATE_STORE: 'INFLATE_STORE',
  SET_DESTINATION_STATION: 'SET_DESTINATION_STATION',
  SET_ORIGIN_STATION: 'SET_ORIGIN_STATION',
  SET_HOME_STATION: 'SET_HOME_STATION',
  SET_MORE_INFO_ROUTE: 'SET_MORE_INFO_ROUTE',
  CLEAR_MORE_INFO_ROUTE: 'CLEAR_MORE_INFO_ROUTE',
  SWITCH_STATIONS: 'SWITCH_STATIONS',
  SHOW_SETTINGS_MODAL: 'SHOW_SETTINGS_MODAL',
  DISMISS_SETTINGS_MODAL: 'DISMISS_SETTINGS_MODAL',
  SET_NEAREST_STATION: 'SET_NEAREST_STATION',
  SET_TIME: 'SET_TIME',
};
export const success = string => `${string}_FULFILLED`;
export const pending = string => `${string}_PENDING`;
export const rejected = string => `${string}_REJECTED`;

export const statuses = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
};

export const INITIAL_STATE = {
  stations: [],
  trains: [],
};

export const STATE_KEY = 'STATE_KEY';
