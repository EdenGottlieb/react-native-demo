export default function getRouteById(state, desiredRouteId) {
  const { routes, destinationStation, originStation } = state;
  for (const originStationKey of Object.keys(routes)) {
    for (const destinationStationKey of Object.keys(routes[originStationKey])) {
      for (const route of routes[originStationKey][destinationStationKey]) {
        // Routes are identified by ID of first train.
        // TODO: Find way to assign "UUID" to routed based on train timings.
        if (route[0].id === desiredRouteId && originStationKey === originStation && destinationStationKey === destinationStation) {
          return route;
        }
      }
    }
  }
}
