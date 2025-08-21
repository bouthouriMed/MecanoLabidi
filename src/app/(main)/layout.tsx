"use client";

import React from "react";
import {
  Container,
  Sidebar,
  MainContent,
  Navbar,
  SidebarMenue,
  MenueList,
  SButton,
} from "./layout.styles";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { InvoicesProvider } from "./invoices/InvoicesContext";
import { ToastContainer } from "react-toastify";

export default function Layout({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      window.location.href = "/login"; // redirect after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <InvoicesProvider>
        <Container>
          <Sidebar>
            <div style={{ textAlign: "center" }}>
              <img
                src="/logo.png"
                alt="Garage Mécanique Labidi Logo"
                style={{ width: 170, height: "auto" }}
              />
            </div>
            <h2
              style={{ marginBottom: "40px", fontSize: "18px", color: "#fff" }}
            >
              Garage Mécanique Labidi
            </h2>
            <SidebarMenue>
              <MenueList>
                <Link href="/dashboard">Acceuil</Link>
              </MenueList>
              <MenueList>
                <Link href="/addUser">Ajouter utilisateur</Link>
              </MenueList>
              <MenueList>
                <Link href="/invoices">Factures</Link>
              </MenueList>
              <MenueList>
                <Link href="/diagnosis">Diagnostiques</Link>
              </MenueList>
            </SidebarMenue>

            <SButton onClick={handleLogout}>Déconnexion</SButton>
          </Sidebar>

          <MainContent>
            <Navbar>
              <div>{userName}</div>
            </Navbar>
            <section style={{ padding: "20px" }}>{children}</section>
          </MainContent>
          <ToastContainer position="top-center" autoClose={3000} />
        </Container>
      </InvoicesProvider>
    </>
  );
}
