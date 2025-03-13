
import React, { createContext, useContext, useState } from "react";
import { AccessRequest, RequestStatus, Comment } from "@/types";

interface RequestContextType {
  requests: AccessRequest[];
  comments: Comment[];
  addRequest: (request: AccessRequest) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  addComment: (comment: Omit<Comment, "id" | "createdAt">) => void;
  getRequestComments: (requestId: string) => Comment[];
  updateRequestComment: (requestId: string, comment: string) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

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

  const addComment = (commentData: Omit<Comment, "id" | "createdAt">) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...commentData,
    };

    setComments((prev) => [...prev, newComment]);
  };

  const getRequestComments = (requestId: string) => {
    return comments.filter((comment) => comment.requestId === requestId);
  };

  const updateRequestComment = (requestId: string, comment: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? { ...request, comment, updatedAt: new Date().toISOString() }
          : request
      )
    );
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        comments,
        addRequest,
        updateRequestStatus,
        addComment,
        getRequestComments,
        updateRequestComment,
      }}
    >
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
