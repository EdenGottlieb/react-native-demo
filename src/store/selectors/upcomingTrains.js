import { convertDatetimeStringToMoment } from '../time.helper';

export default state => {
  const { destinationStation, originStation, routes, time } = state;
  let relevantRoutes = (routes && routes[originStation] && routes[originStation][destinationStation]) || [];

  const timeObject = convertDatetimeStringToMoment(time);
  relevantRoutes = relevantRoutes.filter(route => {
    const departureTimeObject = convertDatetimeStringToMoment(route[0].departure);
    return departureTimeObject > timeObject && departureTimeObject.isSame(timeObject, 'day');
  });
  relevantRoutes = relevantRoutes.sort(
    (route1, route2) => (
      convertDatetimeStringToMoment(route1[0].departure) > convertDatetimeStringToMoment(route2[0].departure) ? 1 : -1
    )
  );

  // We are gonna memoize the selector and use it a lot, inside of the renders.
  // relevantRoutes = relevantRoutes.map(
  //   route => route.map(
  //     train => ({
  //       ...train,
  //       origin: stationIdToName(train.origin),
  //       destination: stationIdToName(train.destination),
  //     })
  //   )
  // );

  return relevantRoutes;
};
