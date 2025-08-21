"use client";

import React from "react";
import {
  ModalContent,
  HeaderSection,
  CompanyInfo,
  InvoiceInfo,
  SectionTitle,
  InfoRow,
  ItemsTable,
  TableHead,
  TableRow,
  TableCell,
  TotalRow,
} from "./InvoiceModal.styles";
import BaseModal from "../../components/BaseModal.tsx/BaseModal";
import { Invoice } from "./types";

export default function InvoiceModal({
  invoice,
  onClose,
}: {
  invoice: Invoice;
  onClose: () => void;
}) {
  if (!invoice) return null;

  console.log({ invoice });

  return (
    <BaseModal
      isOpen={!!invoice}
      onClose={onClose}
      title={`Facture #${invoice.id}`}
    >
      <ModalContent>
        {/* HEADER */}
        <HeaderSection>
          <CompanyInfo>
            <h2>🚗 AutoFix Garage</h2>
            <p>123 Rue de l’Atelier</p>
            <p>Paris, France</p>
            <p>+33 1 23 45 67 89</p>
          </CompanyInfo>
          <InvoiceInfo>
            <p>
              <strong>Date :</strong> {invoice.date}
            </p>
            <p>
              <strong>Matricule :</strong> {invoice.car_plate}
            </p>
            <p>
              <strong>Technicien :</strong> {invoice.technician_name}
            </p>
          </InvoiceInfo>
        </HeaderSection>

        {/* CLIENT INFO */}
        <SectionTitle>Informations Client</SectionTitle>
        <InfoRow>
          <strong>Nom :</strong> {invoice.customer_name}
        </InfoRow>
        <InfoRow>
          <strong>Téléphone :</strong> {invoice.phone_number}
        </InfoRow>
        <InfoRow>
          <strong>Email :</strong> {invoice.email}
        </InfoRow>

        {/* ITEMS */}
        {invoice.items && invoice.items.length > 0 && (
          <>
            <SectionTitle>Détails de la Facture</SectionTitle>
            <ItemsTable>
              <thead>
                <TableHead>
                  <TableCell>Description</TableCell>
                  <TableCell>Prix (€)</TableCell>
                </TableHead>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TotalRow>
                  <TableCell colSpan={3}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{Number(invoice.subtotal).toFixed(2)}</strong>
                  </TableCell>
                </TotalRow>
              </tbody>
            </ItemsTable>
          </>
        )}
      </ModalContent>
    </BaseModal>
  );
}
