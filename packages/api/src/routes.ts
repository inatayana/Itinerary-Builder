import { calculate_itinerary_and_fleet, validateFleetAgainstFCS, getAvailableDrivers, checkDestinationRelevance, validateEnglishDriver, calculateRouteWithTraffic, validateDriverSchedule } from './functions';

export const api = {
  calculateItineraryAndFleet: calculate_itinerary_and_fleet,
  validateFleetAgainstFCS,
  getAvailableDrivers,
  checkDestinationRelevance,
  validateEnglishDriver,
  calculateRouteWithTraffic,
  validateDriverSchedule,
};

export * from './functions';
export * from './routes';
