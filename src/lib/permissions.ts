import type { PermissionKey, RoleKey } from "@/types/domain";

export const roleLabels: Record<RoleKey, string> = {
  CUSTOMER: "Client",
  SUPER_ADMIN: "Super Admin",
  OPERATIONS_AGENT: "Agent operations",
  PARTNERSHIP_MANAGER: "Responsable partenariats",
  MARKETING_MANAGER: "Responsable marketing",
  SUPPORT_AGENT: "Support client",
  FINANCE_MANAGER: "Responsable finance",
};

export const rolePermissions: Record<RoleKey, PermissionKey[]> = {
  CUSTOMER: [],
  SUPER_ADMIN: [
    "dashboard.read",
    "destinations.manage",
    "hotels.manage",
    "activities.manage",
    "partners.manage",
    "bookings.manage",
    "support.manage",
    "campaigns.manage",
    "financials.read",
    "settings.manage",
    "users.manage",
  ],
  OPERATIONS_AGENT: [
    "dashboard.read",
    "hotels.manage",
    "activities.manage",
    "partners.manage",
    "bookings.manage",
    "support.manage",
  ],
  PARTNERSHIP_MANAGER: [
    "dashboard.read",
    "destinations.manage",
    "hotels.manage",
    "activities.manage",
    "partners.manage",
    "bookings.manage",
  ],
  MARKETING_MANAGER: [
    "dashboard.read",
    "campaigns.manage",
    "destinations.manage",
  ],
  SUPPORT_AGENT: [
    "dashboard.read",
    "bookings.manage",
    "support.manage",
  ],
  FINANCE_MANAGER: [
    "dashboard.read",
    "bookings.manage",
    "financials.read",
  ],
};

export function hasPermission(role: RoleKey, permission: PermissionKey) {
  return rolePermissions[role].includes(permission);
}

export function getVisibleAdminModules(role: RoleKey) {
  return {
    canSeeFinancials: hasPermission(role, "financials.read"),
    canManageCampaigns: hasPermission(role, "campaigns.manage"),
    canManageSupport: hasPermission(role, "support.manage"),
    canManageCatalog: hasPermission(role, "destinations.manage"),
    canManageUsers: hasPermission(role, "users.manage"),
  };
}
