"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Invoice, InvoicesContextType } from "./types";

const InvoicesContext = createContext<InvoicesContextType | undefined>(
  undefined
);

InvoicesContext.displayName = "InvoicesContext";

export const InvoicesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/invoices");
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = (invoice: Invoice) => {
    // Add new invoice to state immediately
    setInvoices((prev) => [invoice, ...prev]);
  };

  const removeInvoice = (id: number) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <InvoicesContext.Provider
      value={{
        invoices,
        loading,
        fetchInvoices,
        addInvoice,
        removeInvoice,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoicesContext);
  if (!context) {
    throw new Error("useInvoices must be used within an InvoicesProvider");
  }
  return context;
};
