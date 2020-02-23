import { AsyncStorage } from 'react-native';
import { STATE_KEY, INITIAL_STATE } from '../../constants';

const MAX_TIMEOUT_IN_MS = 1500;

export const getState = async () => {
  try {
    // return INITIAL_STATE; // For debugging purposes
    // Dirty hack due to bug of AsyncStorage never returning (#14101 on react native repo)
    const serializedState = await Promise.race([AsyncStorage.getItem(STATE_KEY), wait(MAX_TIMEOUT_IN_MS)]);
    return JSON.parse(serializedState);
  } catch (e) {
    return INITIAL_STATE;
  }
};

export const saveState = state => {
  AsyncStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const wait = ms => new Promise(res => setTimeout(() => res(INITIAL_STATE), ms));
