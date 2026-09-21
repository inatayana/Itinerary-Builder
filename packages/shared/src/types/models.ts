export interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  avatarUrl?: string;
  role: string;
  isActive: boolean;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  bookings: Booking[];
  driverProfile?: Driver;
  addresses: any[];
  itineraries: Itinerary[];
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

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'FLEET_MANAGER' | 'DRIVER' | 'TRAVELER' | 'GUEST';

export interface RoleAssignment {
  id: string;
  userId: string;
  role: Role;
  assignedAt: Date;
  assignedBy: string;
  expiresAt?: Date;
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
  category: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  capacity: number;
  luggageCapacity: number;
  acType: string;
  features: string[];
  dailyRate: number;
  hourlyRate: number;
  overtimeRate: number;
  driverId?: string;
  zoneId?: string;
  isActive: boolean;
  gpsDeviceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: Date;
  vehicleId?: string;
  rating: number;
  totalTrips: number;
  isAvailable: boolean;
  isVerified: boolean;
  currentLat?: number;
  currentLng?: number;
  lastLocationUpdate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
  lat: number;
  lng: number;
  category: string;
  tags: string[];
  images: string[];
  zoneId: string;
  visitDuration: number;
  rating: number;
  reviewCount: number;
  priceRange?: string;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Zone {
  id: string;
  name: string;
  slug: string;
  type: string;
  province: string;
  regency: string;
  district: string;
  village?: string;
  centerLat: number;
  centerLng: number;
  radiusKm: number;
  trafficMultiplier: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  vehicleId: string;
  driverId?: string;
  status: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  passengerCount: number;
  luggageCount: number;
  basePrice: number;
  totalPrice: number;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Itinerary {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  totalDistance: number;
  totalDuration: number;
  totalPrice: number;
  status: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  coordinates: { lat: number; lng: number };
  locationType: string;
  isActive: boolean;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  driverId?: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}
