export type {
  User,
  Profile,
  Role,
  UserRole,
  FleetCategory,
  Vehicle,
  Driver,
  Destination,
  Zone,
  Booking,
  Itinerary,
  Location,
  Payment,
  Review,
} from './models';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  language: 'en' | 'id';
  timezone: string;
  currency: string;
  gender?: string;
  dateOfBirth?: string;
  nationality?: string;
  emergencyContact?: Record<string, unknown>;
  preferences: Record<string, unknown>;
  marketingConsent: boolean;
  termsAcceptedAt: string;
  privacyPolicyAcceptedAt: string;
}

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'DRIVER' | 'TRAVELER' | 'GUEST';

export interface RoleAssignment {
  id: string;
  userId: string;
  role: Role;
  assignedAt: string;
  assignedBy: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface FleetCategory {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  capacityPassengers: number;
  capacityLuggageLarge: number;
  capacityLuggageCabin: number;
  baseRateIdr: number;
  weekendRateIdr: number;
  isActive: boolean;
}

export interface Vehicle {
  id: string;
  vehicleId: string;
  categoryId: string;
  driverId?: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  seatingCapacity: number;
  luggageCapacityLarge: number;
  luggageCapacityCabin: number;
  fuelType: string;
  transmissionType: string;
  acEnabled: boolean;
  pricePerDayIdr: number;
  pricePerWeekendIdr: number;
  isAvailable: boolean;
  currentLocation?: { lat: number; lng: number };
  isActive: boolean;
}

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  categoryId?: string;
  vehicleId?: string;
  languages: string[];
  drivingExperienceYears: number;
  rating: number;
  totalTripsCompleted: number;
  isEnglishSpeaker: boolean;
  isBackgroundChecked: boolean;
  isAvailable: boolean;
  currentLocation?: { lat: number; lng: number };
  walletBalanceIdr: number;
  upiId?: string;
  bankAccount?: Record<string, unknown>;
  isActive: boolean;
  joinedAt: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
  descriptionId?: string;
  coordinates: { lat: number; lng: number };
  zoneId?: string;
  address?: string;
  phoneNumber?: string;
  websiteUrl?: string;
  rating: number;
  totalReviews: number;
  visitTimeMinutes?: number;
  difficultyLevel: 'easy' | 'moderate' | 'hard';
  highlights: string[];
  facilities: string[];
  images: string[];
  openingHours?: Record<string, unknown>;
  isActive: boolean;
}

export interface Zone {
  id: string;
  name: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
  descriptionId?: string;
  color: string;
  boundaryPolygon?: Record<string, unknown>[];
  estimatedDrivingTimeMinutes?: number;
  estimatedFareMinIdr?: number;
  estimatedFareMaxIdr?: number;
  isActive: boolean;
}

export interface Booking {
  id: string;
  bookingReference: string;
  travelerId: string;
  driverId?: string;
  vehicleId?: string;
  status: BookingStatus;
  bookingType: 'charter' | 'airport_transfer' | 'tour';
  durationHours: number;
  scheduledStartTime: string;
  scheduledEndTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  baseFareIdr: number;
  taxIdr: number;
  discountIdr: number;
  totalFareIdr: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentReference?: string;
  xenditPaymentId?: string;
  driverPayoutId?: string;
  driverPayoutStatus?: string;
  driverPayoutAmountIdr?: number;
  zoneSurchargeIdr: number;
  seasonalMultiplier: number;
  cancellationPolicy: string;
  cancellationReason?: string;
  cancellationFeeIdr: number;
  specialRequests?: string;
  internalNotes?: string;
  customerNotes?: string;
  itineraryId?: string;
  isRecurring: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'no_show' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface Itinerary {
  id: string;
  bookingId: string;
  name: string;
  description?: string;
  descriptionEn?: string;
  descriptionId?: string;
  startLocationId?: string;
  endLocationId?: string;
  totalDurationMinutes: number;
  totalDistanceKm?: number;
  averageSpeedKmh?: number;
  isMultiDay: boolean;
  dayPlans: Record<string, unknown>[];
  dailyBreakdown: Record<string, unknown>[];
  weatherConsiderations: Record<string, unknown>[];
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coordinates: { lat: number; lng: number };
  locationType: 'hotel' | 'destination' | 'airport' | 'landmark';
  zoneId?: string;
  address?: string;
  phoneNumber?: string;
  websiteUrl?: string;
  rating?: number;
  isActive: boolean;
}

export interface Payment {
  id: string;
  bookingId: string;
  amountIdr: number;
  currency: string;
  method: string;
  status: PaymentStatus;
  reference?: string;
  xenditPaymentId?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  driverId: string;
  travelerId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}
