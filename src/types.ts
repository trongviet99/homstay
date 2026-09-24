export type BranchId = 'branch-1' | 'branch-2';

export type StayType = 'hourly' | 'overnight' | 'daily';

export interface Room {
  id: string;
  code: string;
  name: string;
  branchId: BranchId;
  branchName: string;
  branchAddress: string;
  tagline: string;
  description: string;
  shortDesc: string;
  area: number; // m2
  capacity: number; // usually 2
  maxCapacity: number; // 3 with surcharge
  bedType: string;
  features: string[];
  amenities: {
    icon: string;
    label: string;
  }[];
  price: {
    hourly3h: number; // 3 hours short stay
    extraHourly: number; // per extra hour
    overnight: number; // 20h00 - 11h00
    daily: number; // 14h00 - 12h00
  };
  images: string[];
  badges: string[];
  hasBathtub: boolean;
  hasProjector: boolean;
  hasKitchen: boolean;
  hasBalcony: boolean;
  isPopular?: boolean;
}

export interface AddonService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'romantic' | 'beverage' | 'convenience';
  image: string;
}

export interface BookingDetails {
  bookingCode: string;
  room: Room;
  stayType: StayType;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  guestsCount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerIdentity: string;
  notes?: string;
  selectedAddons: {
    addon: AddonService;
    quantity: number;
  }[];
  basePrice: number;
  addonsPrice: number;
  extraGuestSurcharge: number;
  discountAmount: number;
  totalPrice: number;
  paymentMethod: 'vietqr' | 'cash_arrival';
  status: 'confirmed' | 'pending' | 'checked_in';
  createdAt: string;
  doorPinCode: string;
  wifiPassword: string;
}

export interface Review {
  id: string;
  author: string;
  roomCode: string;
  roomName: string;
  rating: number;
  date: string;
  stayType: string;
  comment: string;
  avatar: string;
}
