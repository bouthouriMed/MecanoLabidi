"use client";

import React, { useState } from "react";
import {
  Container,
  Header,
  InvoiceGrid,
  InvoiceCard,
  InvoiceTitle,
  InvoiceInfo,
  InvoiceRow,
  ActionButton,
  NoInvoicesMessage,
} from "./Invoices.styles";
import { useInvoices } from "./InvoicesContext";
import InvoiceModal from "./InvoiceModal";
import { toast } from "react-toastify";
import { Invoice } from "./types";
import CreateInvoiceModal from "../create-invoice/CreateInvoice";

const InvoicesPage = () => {
  const { invoices, loading, removeInvoice } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const { isModalOpen, setIsModalOpen } = useInvoices();

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  /* eslint-disable */
  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette facture ?")) return;

    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        removeInvoice(id); // Update context state
        toast.success("Facture supprimée avec succès !");
      } else {
        const errorData = await res.json();
        toast.error(
          errorData?.message || "Erreur lors de la suppression de la facture"
        );
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Erreur lors de la suppression de la facture");
    }
  };

  return (
    <Container>
      <Header>FACTURES</Header>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <ActionButton
          variant="view"
          onClick={setIsModalOpen.bind(null, true)}
          // style={{ backgroundColor: "#e94560", color: "#fff", border: "none" }}
        >
          Ajouter une facture
        </ActionButton>
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <InvoiceCard
          style={{
            flex: "1",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div>Factures totales</div>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>9</div>
          <div>Dépuis le début de l'année</div>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            1 750,50 €
          </div>
          <div>Montant dû</div>
        </InvoiceCard>
        <InvoiceCard
          style={{
            flex: "1",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div>Paiements en attente</div>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>2</div>
          <div>Besoin d'un suivi</div>
        </InvoiceCard>
        <InvoiceCard
          style={{
            flex: "1",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div>Factures en retard</div>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>2</div>
        </InvoiceCard>
        <InvoiceCard
          style={{
            flex: "1",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div>Montant payé</div>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            2 500,00 €
          </div>
          <div>Ce mois-ci</div>
        </InvoiceCard>
      </div>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Rechercher une facture par client ou ID..."
          style={{
            flex: "1",
            padding: "10px",
            borderRadius: "25px",
            border: "2px solid #2c2f36 ",
            background: "transparent",
            color: "#fff",
          }}
        />
        <select
          style={{
            padding: "10px",
            borderRadius: "25px",
            border: "2px solid #e94560",
            background: "transparent",
            color: "#fff",
            marginLeft: "10px",
          }}
        >
          <option value="">Statut</option>
          <option value="paid">Payé</option>
          <option value="pending">En attente</option>
          <option value="overdue">En retard</option>
        </select>
      </div>

      {loading ? (
        <NoInvoicesMessage>Loading invoices...</NoInvoicesMessage>
      ) : invoices.length === 0 ? (
        <NoInvoicesMessage>Aucune facture trouvée</NoInvoicesMessage>
      ) : (
        <InvoiceGrid>
          {invoices.map((inv) => (
            <InvoiceCard
              key={inv.id}
              style={{ background: "#fff", color: "#1a1a2e" }}
            >
              <InvoiceTitle>Facture #{inv.id}</InvoiceTitle>
              <InvoiceInfo>
                <InvoiceRow>
                  <strong>Client:</strong> {inv.customer_name}
                </InvoiceRow>
                <InvoiceRow>
                  <strong>Date:</strong> {inv.date}
                </InvoiceRow>
                <InvoiceRow>
                  <strong>Montant:</strong> € {Number(inv.subtotal).toFixed(2)}
                </InvoiceRow>
                {/* <InvoiceRow>
                  <strong>Statut:</strong>{" "}
                  {inv.status === "paid"
                    ? "Payé"
                    : inv.status === "pending"
                    ? "En attente"
                    : "En retard"}
                </InvoiceRow> */}
              </InvoiceInfo>
              <div>
                <ActionButton onClick={() => handleView(inv)} variant="view">
                  Afficher
                </ActionButton>
              </div>
            </InvoiceCard>
          ))}
        </InvoiceGrid>
      )}

      {selectedInvoice && (
        <InvoiceModal invoice={selectedInvoice} onClose={handleCloseModal} />
      )}

      <CreateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default InvoicesPage;
