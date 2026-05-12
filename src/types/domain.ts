export type CategoryKey =
  | "ESSENTIALS"
  | "TOURS"
  | "ADVENTURE"
  | "GASTRONOMY"
  | "WORKSHOPS";

export type RoleKey =
  | "CUSTOMER"
  | "SUPER_ADMIN"
  | "OPERATIONS_AGENT"
  | "PARTNERSHIP_MANAGER"
  | "MARKETING_MANAGER"
  | "SUPPORT_AGENT"
  | "FINANCE_MANAGER";

export type PermissionKey =
  | "dashboard.read"
  | "destinations.manage"
  | "hotels.manage"
  | "activities.manage"
  | "partners.manage"
  | "bookings.manage"
  | "support.manage"
  | "campaigns.manage"
  | "financials.read"
  | "settings.manage"
  | "users.manage";

export type BookingStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "pending_confirmation"
  | "confirmed"
  | "partially_confirmed"
  | "cancelled"
  | "refunded"
  | "completed";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded"
  | "cancelled";

export type SupportStatus =
  | "open"
  | "waiting_customer"
  | "waiting_partner"
  | "resolved"
  | "closed";

export type CampaignChannel =
  | "Facebook"
  | "Instagram"
  | "Google"
  | "TikTok"
  | "Influenceur"
  | "Email";

export interface CategoryDefinition {
  key: CategoryKey;
  slug: string;
  name: string;
  description: string;
  minSelections: number;
  accent: string;
}

export interface Destination {
  slug: string;
  city: string;
  country: string;
  label: string;
  imageUrl: string;
  heroTag: string;
  overview: string;
  climateHint: string;
  featuredBenefits: string[];
  currency: string;
  timezone: string;
}

export interface Hotel {
  id: string;
  slug: string;
  destinationSlug: string;
  name: string;
  tier: string;
  district: string;
  rating: number;
  reviewCount: number;
  atmosphere: string;
  bestFor: string;
  overview: string;
  roomLabel: string;
  maxGuests: number;
  nightsIncluded: number;
  features: string[];
  includedHighlights: string[];
  imageUrl: string;
  galleryUrls: string[];
  internalNightlyCost: number;
  indicativePublicValue: number;
  bonusEligible: boolean;
}

export interface Activity {
  id: string;
  slug: string;
  destinationSlug: string;
  categoryKey: CategoryKey;
  name: string;
  summary: string;
  duration: string;
  meetingPoint: string;
  partner: string;
  pricePerTraveler: number;
  supplierCostPerTraveler: number;
  puzzleContribution: number;
  availabilityText: string;
  tags: string[];
  imageUrl: string;
  recommended?: boolean;
}

export interface PuzzleRuleSet {
  minEssentialSelections: number;
  minActivities: number;
  minCartAmount: number;
  minMarginRate: number;
  unlockThreshold: number;
  availabilityWeight: number;
  categoryWeight: number;
  contributionWeight: number;
  financialWeight: number;
}

export interface PuzzleRequirement {
  id: string;
  label: string;
  current: number;
  target: number;
  satisfied: boolean;
  visibleToCustomer: boolean;
}

export interface PuzzleResult {
  selectedIds: string[];
  selectedActivities: Activity[];
  progress: number;
  unlocked: boolean;
  statusLabel: string;
  statusMessage: string;
  totalClientAmount: number;
  remainingCategories: CategoryKey[];
  completedCategories: CategoryKey[];
  requirements: PuzzleRequirement[];
  internal: {
    hotelInternalCost: number;
    activityInternalCost: number;
    grossMargin: number;
    marginRate: number;
    contributionScore: number;
  };
}

export interface BookingRecord {
  reference: string;
  customerName: string;
  destinationLabel: string;
  hotelName: string;
  startDate: string;
  endDate: string;
  travelers: number;
  totalPaid: number;
  bonusProgress: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
}

export interface SupportTicketRecord {
  reference: string;
  customerName: string;
  subject: string;
  status: SupportStatus;
  lastUpdate: string;
  linkedBooking: string;
}

export interface CampaignRecord {
  name: string;
  destinationLabel: string;
  channel: CampaignChannel;
  budget: number;
  revenue: number;
  conversions: number;
  status: "Active" | "Scheduled" | "Completed";
}

export interface AdminMetric {
  label: string;
  value: string;
  change: string;
  tone: "teal" | "amber" | "rose";
}
