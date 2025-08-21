"use client";

import React, { useState, useEffect } from "react";
import {
  InvoiceTable,
  InvoiceRow,
  InvoiceCell,
  AddItemButton,
  SubmitButton,
  HeaderForm,
  HeaderInput,
  DeleteButton,
  SubtotalRow,
} from "./createInvoice.styles";
import BaseModal from "../../components/BaseModal.tsx/BaseModal";
import { useInvoices } from "../invoices/InvoicesContext";
import { toast } from "react-toastify";

type InvoiceItem = {
  description: string;
  price: number;
};

type Diagnosis = {
  id: number;
  name: string;
};

type InvoiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateInvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", price: 0 },
  ]);

  const [diagnosisOptions, setDiagnosisOptions] = useState<Diagnosis[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<{
    [key: number]: Diagnosis[];
  }>({});

  const [invoiceHeader, setInvoiceHeader] = useState({
    date: "",
    carPlate: "",
    technicianName: "",
    customerName: "",
    phoneNumber: "",
    email: "",
  });

  const { addInvoice } = useInvoices();

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const res = await fetch("/api/diagnosis");
        const data = await res.json();
        setDiagnosisOptions(data || []);
      } catch (error) {
        console.error("Error while fetching diagnosis:", error);
      }
    };
    fetchDiagnosis();
  }, []);

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);

    // Autocomplete suggestions per row
    if (field === "description" && typeof value === "string") {
      const filtered = diagnosisOptions.filter(
        (d) => d?.name && d.name.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredSuggestions((prev) => ({
        ...prev,
        [index]: filtered,
      }));
    }
  };

  const handleSuggestionClick = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index].description = value;
    setItems(updatedItems);

    setFilteredSuggestions((prev) => ({
      ...prev,
      [index]: [],
    }));
  };

  const handleHeaderChange = (
    field: keyof typeof invoiceHeader,
    value: string
  ) => {
    setInvoiceHeader((prev) => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    setItems([...items, { description: "", price: 0 }]);
  };

  const deleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setFilteredSuggestions((prev) => {
      const newFiltered = { ...prev };
      delete newFiltered[index];
      return newFiltered;
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async () => {
    const invoiceData = {
      date: invoiceHeader.date,
      car_plate: invoiceHeader.carPlate,
      technician_name: invoiceHeader.technicianName,
      customer_name: invoiceHeader.customerName,
      phone_number: invoiceHeader.phoneNumber,
      email: invoiceHeader.email,
      items,
      subtotal,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });

      if (res.ok) {
        const newInvoice = await res.json();
        addInvoice(newInvoice);
        toast.success("Facture crée avec succès!");

        // Reset form
        setItems([{ description: "", price: 0 }]);
        setInvoiceHeader({
          date: "",
          carPlate: "",
          technicianName: "",
          customerName: "",
          phoneNumber: "",
          email: "",
        });

        onClose();
      } else {
        const errorData = await res.json();
        toast.error(
          `Erreur lors de la création de la facture: ${errorData.error}`
        );
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Erreur lors de la création de la facture.");
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer une Facture"
      footer={<SubmitButton onClick={handleSubmit}>Valider</SubmitButton>}
    >
      <HeaderForm>
        <HeaderInput
          type="date"
          value={invoiceHeader.date}
          onChange={(e) => handleHeaderChange("date", e.target.value)}
        />
        <HeaderInput
          type="text"
          placeholder="Matricule"
          value={invoiceHeader.carPlate}
          onChange={(e) => handleHeaderChange("carPlate", e.target.value)}
        />
        <HeaderInput
          type="text"
          placeholder="Technicien"
          value={invoiceHeader.technicianName}
          onChange={(e) => handleHeaderChange("technicianName", e.target.value)}
        />
        <HeaderInput
          type="text"
          placeholder="Nom du Client"
          value={invoiceHeader.customerName}
          onChange={(e) => handleHeaderChange("customerName", e.target.value)}
        />
        <HeaderInput
          type="tel"
          placeholder="Téléphone"
          value={invoiceHeader.phoneNumber}
          onChange={(e) => handleHeaderChange("phoneNumber", e.target.value)}
        />
        <HeaderInput
          type="email"
          placeholder="Email"
          value={invoiceHeader.email}
          onChange={(e) => handleHeaderChange("email", e.target.value)}
        />
      </HeaderForm>

      <InvoiceTable>
        <thead>
          <tr>
            <InvoiceCell as="th" style={{ width: "50%" }}>
              Description
            </InvoiceCell>
            <InvoiceCell as="th" style={{ width: "50%" }}>
              Prix (€)
            </InvoiceCell>
            <InvoiceCell as="th" style={{ width: "60px" }} />
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <InvoiceRow key={index} style={{ position: "relative" }}>
              <InvoiceCell style={{ width: "50%", position: "relative" }}>
                <input
                  type="text"
                  value={item.description}
                  name="description"
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  placeholder="Item description"
                  autoComplete="off"
                />
                {filteredSuggestions[index]?.length > 0 && item.description && (
                  <div
                    style={{
                      position: "absolute",
                      background: "#fff",
                      border: "1px solid #ddd",
                      zIndex: 100,
                      width: "100%",
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                  >
                    {filteredSuggestions[index].map((d) => (
                      <div
                        key={d.id}
                        style={{ padding: "6px 10px", cursor: "pointer" }}
                        onClick={() => handleSuggestionClick(index, d.name)}
                      >
                        {d.name}
                      </div>
                    ))}
                  </div>
                )}
              </InvoiceCell>

              <InvoiceCell style={{ width: "50%" }}>
                <input
                  type="number"
                  value={item.price}
                  min="0"
                  step="0.01"
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "price",
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </InvoiceCell>
              <InvoiceCell>
                <DeleteButton onClick={() => deleteItem(index)}>
                  🗑️
                </DeleteButton>
              </InvoiceCell>
            </InvoiceRow>
          ))}
          <SubtotalRow>
            <InvoiceCell
              colSpan={2}
              style={{ textAlign: "right", fontWeight: "bold" }}
            >
              Total:
            </InvoiceCell>
            <InvoiceCell style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              € {Number(subtotal).toFixed(2)}
            </InvoiceCell>
          </SubtotalRow>
        </tbody>
      </InvoiceTable>

      <AddItemButton onClick={addItem}>+ Ajouter une ligne</AddItemButton>
    </BaseModal>
  );
};

export default CreateInvoiceModal;
