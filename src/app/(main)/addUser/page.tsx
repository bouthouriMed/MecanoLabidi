"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  UserForm,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  UserList,
  UserCard,
  UserInfo,
  ActionButtons,
  ActionButton,
  AddButton,
} from "./addUser.styles";
import BaseModal from "../../components/BaseModal.tsx/BaseModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
};

export default function AddUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Omit<User, "id">>({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Erreur lors du chargement des utilisateurs");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update user
        const res = await fetch(`/api/users/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          toast.success("Utilisateur modifié avec succès !");
          setEditId(null);
        } else {
          const errorData = await res.json();
          toast.error(
            errorData?.message ||
              "Erreur lors de la modification de l'utilisateur"
          );
          return;
        }
      } else {
        // Create user
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          toast.success("Utilisateur ajouté avec succès !");
        } else {
          const errorData = await res.json();
          toast.error(
            errorData?.message || "Erreur lors de l'ajout de l'utilisateur"
          );
          return;
        }
      }

      setForm({ username: "", email: "", password: "", phone: "" });
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving user:", err);
      toast.error("Erreur lors de l'enregistrement de l'utilisateur");
    }
  };

  const handleEdit = (user: User) => {
    setForm({
      username: user.username,
      email: user.email,
      password: "",
      phone: user.phone,
    });
    setEditId(user.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("Utilisateur supprimé avec succès !");
        fetchUsers();
      } else {
        const errorData = await res.json();
        toast.error(
          errorData?.message || "Erreur lors de la suppression de l'utilisateur"
        );
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const handleOpenModal = () => {
    setForm({ username: "", email: "", password: "", phone: "" });
    setEditId(null);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <Header>Utilisateurs</Header>
        <AddButton onClick={handleOpenModal} title="Ajouter utilisateur">
          + Ajouter utilisateur
        </AddButton>
      </div>
      <UserList>
        {users.map((user) => (
          <UserCard key={user.id}>
            <UserInfo>
              <strong>{user.username}</strong>
              <span>{user.email}</span>
              <span>{user.phone}</span>
            </UserInfo>
            <ActionButtons>
              <ActionButton variant="edit" onClick={() => handleEdit(user)}>
                Modifier
              </ActionButton>
              <ActionButton
                variant="delete"
                onClick={() => handleDelete(user.id)}
              >
                Supprimer
              </ActionButton>
            </ActionButtons>
          </UserCard>
        ))}
      </UserList>

      {/* Modal with User Form */}
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Modifier utilisateur" : "Ajouter utilisateur"}
      >
        <UserForm onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Nom d&apos;utilisateur</Label>
            <Input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Mot de passe</Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!editId}
            />
          </InputGroup>

          <InputGroup>
            <Label>Téléphone</Label>
            <Input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <SubmitButton type="submit">
            {editId ? "Modifier utilisateur" : "Ajouter utilisateur"}
          </SubmitButton>
        </UserForm>
      </BaseModal>
    </Container>
  );
}
