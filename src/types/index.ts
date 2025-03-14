
export type DeliveryType = "food" | "courier" | "document";

export type RequestStatus = "pending" | "approved" | "rejected";

export type UserStatus = "pending" | "approved" | "rejected";

export type UserType = "owner" | "tenant";

export interface AccessRequest {
  id: string;
  userId: string;
  deliveryPlatform: string;
  deliveryPersonName: string;
  deliveryType: DeliveryType;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  initiatedByAdmin?: boolean;
  deliveryPersonImage?: string;
  comment?: string;
}

export interface User {
  id: string;
  name: string;
  apartment: string;
  role: "user" | "admin";
  status?: UserStatus;
  email?: string;
  phone?: string;
  registeredAt?: string;
  password?: string;
  userType?: UserType;
  ownerName?: string;
  ownerContact?: string;
}

export interface Comment {
  id: string;
  requestId: string;
  userId: string;
  text: string;
  createdAt: string;
}
