
export type DeliveryType = "food" | "courier" | "document";

export type RequestStatus = "pending" | "approved" | "rejected";

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
}

export interface User {
  id: string;
  name: string;
  apartment: string;
  role: "user" | "admin";
}
