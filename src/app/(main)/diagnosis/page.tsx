"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  DiagnosisGrid,
  DiagnosisCard,
  DiagnosisTitle,
  DiagnosisInfo,
  DiagnosisRow,
  ActionButton,
  AddButton,
  NoDiagnosisMessage,
} from "./Diagnosis.styles";
import BaseModal from "../../components/BaseModal.tsx/BaseModal";
import { SubmitButton } from "../create-invoice/createInvoice.styles";
import { toast } from "react-toastify";

type Diagnosis = {
  id: number;
  description: string;
};

export default function Diagnosis() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/diagnosis")
      .then((res) => res.json())
      .then((data) => setDiagnoses(data))
      .catch((err) => {
        console.error("Error fetching diagnoses:", err);
        toast.error("Erreur lors du chargement des diagnostiques.");
      });
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setNewDiagnosis("");
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const item = diagnoses.find((d) => d.id === id);
    if (!item) return;
    setEditingId(id);
    setNewDiagnosis(item.description);
    setIsModalOpen(true);
  };

  const handleSaveDiagnosis = async () => {
    if (!newDiagnosis.trim()) {
      toast.error("La description du diagnostique ne peut pas être vide.");
      return;
    }

    try {
      if (editingId != null) {
        // Update existing
        const res = await fetch("/api/diagnosis", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, description: newDiagnosis }),
        });

        if (!res.ok) throw new Error("Failed to update diagnosis");

        const updated = await res.json();
        setDiagnoses((prev) =>
          prev.map((d) => (d.id === editingId ? updated : d))
        );
        toast.success("Diagnostique modifié avec succès !");
      } else {
        // Create new
        const res = await fetch("/api/diagnosis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: newDiagnosis }),
        });

        if (!res.ok) throw new Error("Failed to create diagnosis");

        const saved = await res.json();
        setDiagnoses((prev) => [saved, ...prev]);
        toast.success("Diagnostique ajouté avec succès !");
      }

      // reset modal state
      setNewDiagnosis("");
      setEditingId(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving diagnosis:", err);
      toast.error(
        editingId != null
          ? "Erreur lors de la modification du diagnostique."
          : "Erreur lors de l'ajout du diagnostique."
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/diagnosis", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete diagnosis");

      setDiagnoses((prev) => prev.filter((d) => d.id !== id));
      toast.success("Diagnostique supprimé avec succès !");
    } catch (err) {
      console.error("Error deleting diagnosis:", err);
      toast.error("Erreur lors de la suppression du diagnostique.");
    }
  };

  return (
    <Container>
      <Header>
        Liste des Diagnostiques
        <AddButton onClick={handleAdd}>+ Ajouter</AddButton>
      </Header>

      {diagnoses.length > 0 ? (
        <DiagnosisGrid>
          {diagnoses.map((diagnosis) => (
            <DiagnosisCard key={diagnosis.id}>
              <DiagnosisTitle>ID: {diagnosis.id}</DiagnosisTitle>
              <DiagnosisInfo>
                <DiagnosisRow>
                  <strong>Description:</strong> {diagnosis.description}
                </DiagnosisRow>
              </DiagnosisInfo>
              <div>
                <ActionButton
                  variant="edit"
                  onClick={() => handleEdit(diagnosis.id)}
                >
                  Modifier
                </ActionButton>
                <ActionButton
                  variant="delete"
                  onClick={() => handleDelete(diagnosis.id)}
                >
                  Supprimer
                </ActionButton>
              </div>
            </DiagnosisCard>
          ))}
        </DiagnosisGrid>
      ) : (
        <NoDiagnosisMessage>Aucun diagnostique trouvé.</NoDiagnosisMessage>
      )}

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
          setNewDiagnosis("");
        }}
        title={
          editingId != null
            ? "Modifier le diagnostique"
            : "Ajouter un diagnostique"
        }
        footer={
          <SubmitButton onClick={handleSaveDiagnosis}>
            {editingId != null ? "Modifier" : "Ajouter"}
          </SubmitButton>
        }
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <textarea
            value={newDiagnosis}
            onChange={(e) => setNewDiagnosis(e.target.value)}
            placeholder="Entrer description du diagnostique..."
            rows={5}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>
      </BaseModal>
    </Container>
  );
}
