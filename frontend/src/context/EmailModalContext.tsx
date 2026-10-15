"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface EmailModalContextType {
  isOpen: boolean;
  openEmailModal: () => void;
  closeEmailModal: () => void;
}

const EmailModalContext = createContext<EmailModalContextType | undefined>(undefined);

export function EmailModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEmailModal = useCallback(() => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText("safaksenel61@gmail.com");
      }
    } catch {
      // Clipboard write might be denied in some iframe or security contexts
    }
    setIsOpen(true);
  }, []);

  const closeEmailModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EmailModalContext.Provider value={{ isOpen, openEmailModal, closeEmailModal }}>
      {children}
    </EmailModalContext.Provider>
  );
}

export function useEmailModal() {
  const context = useContext(EmailModalContext);
  if (!context) {
    throw new Error("useEmailModal must be used within an EmailModalProvider");
  }
  return context;
}
