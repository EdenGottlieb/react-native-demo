import queryString from 'query-string';
import moment from 'moment';

export const fetchStations = async () => {
  const rawStations = await fetch('http://moblin.rail.co.il/rail/v01/Stationsv2/').then(
    res => res.json()).then(
    rawJson => rawJson.Stations.Station);
  return rawStations.map(station => ({
    id: station.StationId,
    name: station.DescriptionHe,
    location: station.Location,
  }));
};

export const fetchRoutes = async (origin, destination, time) => {
  time = time || moment();
  const date = time.format('DD/MM/YYYY HH:mm');

  const qs = queryString.stringify({
    date,
    origin,
    destination,
    hours: 12,
  });

  const rawResponse = await fetch(`http://moblin.rail.co.il/rail/v01/schedulev2/?${qs}`).then(res => res.json());

  const trains = [];

  //Yes, the API is fucked up.

  // Fixes a bug where there's only one train of some sort,
  // So it's served as a single object instead of as an Array
  if (rawResponse.LUZ.Directs && !Array.isArray(rawResponse.LUZ.Directs.Direct)) {
    rawResponse.LUZ.Directs.Direct = [rawResponse.LUZ.Directs.Direct];
  }

  if (rawResponse.LUZ.Indirects && !Array.isArray(rawResponse.LUZ.Indirects.Indirect)) {
    rawResponse.LUZ.Indirects.Indirect = [rawResponse.LUZ.Indirects.Indirect];
  }

  rawResponse.LUZ.Directs && rawResponse.LUZ.Directs.Direct.forEach(
    direct => trains.push(processRoute([direct.train]))
  );

  rawResponse.LUZ.Indirects && rawResponse.LUZ.Indirects.Indirect.forEach(
    indirect => trains.push(processRoute(indirect.train))
  );

  return trains;
};

const processRoute = trains => {
  return trains.map(train => ({
    id: train.Trainno,
    origin: train.OrignStation,
    destination: train.DestinationStation,
    arrival: train.ArrivalTime,
    departure: train.DepartureTime,
    arrivalPlatform: convertPlatform(train.DestPlatform),
    departurePlatform: convertPlatform(train.Platform),
  }));
};

const convertPlatform = platform => platform === '0' ? 'Unknown' : platform;
