
import React, { createContext, useContext, useState } from "react";
import { AccessRequest } from "@/types";

interface RequestContextType {
  requests: AccessRequest[];
  addRequest: (request: AccessRequest) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<AccessRequest[]>([]);

  const addRequest = (request: AccessRequest) => {
    setRequests((prev) => [request, ...prev]);
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? { ...request, status, updatedAt: new Date().toISOString() }
          : request
      )
    );
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useRequests must be used within a RequestProvider");
  }
  return context;
}
