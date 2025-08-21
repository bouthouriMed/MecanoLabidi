import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  InvoiceTable,
  InvoiceRow,
  InvoiceCell,
  AddItemButton,
  SubmitButton,
  HeaderForm,
  HeaderInput,
  DeleteButton,
  SubtotalRow,
  SelectInput,
} from "./CreateInvoiceModal.styles";

type Diagnosis = {
  id: number;
  name: string;
};

type InvoiceItem = {
  description: string;
  price: number;
};

type InvoiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", price: 0 },
  ]);

  const [invoiceHeader, setInvoiceHeader] = useState({
    date: "",
    carPlate: "",
    technicianName: "",
    phoneNumber: "",
    email: "",
  });

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  // Fetch diagnosis list on mount
  useEffect(() => {
    if (isOpen) {
      fetch("/api/diagnosis")
        .then((res) => res.json())
        .then((data) => {
          setDiagnoses(data);
          console.log({ first: "hi" });
        })
        .catch((err) => console.error("Error fetching diagnoses:", err));
    }
  }, [isOpen]);

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
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
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = () => {
    console.log("Invoice Submitted:", {
      header: invoiceHeader,
      items,
      subtotal,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          Create Invoice
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          {/* Invoice header fields */}
          <HeaderForm>
            <HeaderInput
              type="date"
              value={invoiceHeader.date}
              onChange={(e) => handleHeaderChange("date", e.target.value)}
              placeholder="Date"
            />
            <HeaderInput
              type="text"
              value={invoiceHeader.carPlate}
              onChange={(e) => handleHeaderChange("carPlate", e.target.value)}
              placeholder="Car Plate"
            />
            <HeaderInput
              type="text"
              value={invoiceHeader.technicianName}
              onChange={(e) =>
                handleHeaderChange("technicianName", e.target.value)
              }
              placeholder="Technician Name"
            />
            <HeaderInput
              type="tel"
              value={invoiceHeader.phoneNumber}
              onChange={(e) =>
                handleHeaderChange("phoneNumber", e.target.value)
              }
              placeholder="Phone Number"
            />
            <HeaderInput
              type="email"
              value={invoiceHeader.email}
              onChange={(e) => handleHeaderChange("email", e.target.value)}
              placeholder="Email"
            />
          </HeaderForm>

          {/* Invoice items table */}
          <InvoiceTable>
            <thead>
              <tr>
                <InvoiceCell as="th">Description</InvoiceCell>
                <InvoiceCell as="th">Price (€)</InvoiceCell>
                <InvoiceCell as="th"></InvoiceCell>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <InvoiceRow key={index}>
                  <InvoiceCell>
                    <SelectInput
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    >
                      <option value="">Select diagnosis</option>
                      {diagnoses.map((diag) => (
                        <option key={diag.id} value={diag.name}>
                          {diag.name}
                        </option>
                      ))}
                    </SelectInput>
                  </InvoiceCell>
                  <InvoiceCell>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          Math.max(0, Number(e.target.value))
                        )
                      }
                      min="0"
                      step="0.01"
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
                  colSpan={3}
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Subtotal:
                </InvoiceCell>
                <InvoiceCell colSpan={2} style={{ fontWeight: "bold" }}>
                  € {Number(subtotal).toFixed(2)}
                </InvoiceCell>
              </SubtotalRow>
            </tbody>
          </InvoiceTable>

          <AddItemButton onClick={addItem}>+ Add Item</AddItemButton>
        </ModalBody>

        <ModalFooter>
          <SubmitButton onClick={handleSubmit}>Submit Invoice</SubmitButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InvoiceModal;
