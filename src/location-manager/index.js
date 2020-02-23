import store from '../store';
import Permissions from 'react-native-permissions';
import geolib from 'geolib';

export const getDeviceLocation = async () => {

  const status = await Permissions.request('location');

  if (status !== 'authorized') {
    console.error('Location access not granted.');
  }

  try {
    const location = await new Promise(
      res => navigator.geolocation.getCurrentPosition(res, console.error, {
        enableHighAccuracy: false,
      })
    );
    return location.coords;
  } catch (e) {
    console.warn('Couldn\'t get location');
    return null;
  }
};

export const getNearestStation = async () => {
  let stations = store.getState().stations;
  const myLocation = await getDeviceLocation();
  stations = stations.map(station => ({
    latitude: station.location.Latitude,
    longitude: station.location.Longitude,
    id: station.id,
  }));

  const stationsById = stations.reduce((obj, station) => ({ ...obj, [station.id]: station }), {});

  return geolib.findNearest(myLocation, stationsById).key;
};

export const sortStationsByProximity = (stations, location) => {

  stations = stations.map(station => ({
    ...station,
    latitude: station.location.Latitude,
    longitude: station.location.Longitude,
  }));

  const stationsById = stations.reduce((obj, station) => ({ ...obj, [station.id]: station }), {});

  const orderedStations = geolib.orderByDistance(location, stationsById);
  return orderedStations.map(station => stationsById[station.key]);

};
