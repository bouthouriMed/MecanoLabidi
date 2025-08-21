"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
  background-color: black; /* Dark background from design */
`;

/* Sidebar Menu List */
export const SidebarMenue = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

/* Sidebar */
export const Sidebar = styled.nav`
  width: 220px;
  flex-shrink: 0;
  color: #fff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.3);
  z-index: 5;
  background: #000000ff;
  border-radius: 0px 0px 0px 0px;
  border-width: 1px;
  border-color: #323743ff;
  border-style: solid;
`;

/* Sidebar Menu List */
export const MenueList = styled.li`
  width: 80%;
  a {
    display: block;
    width: 100%;
    padding: 10px 16px;
    border-radius: 25px;
    border: 2px solid #e94560; /* Red from logo */
    background-color: transparent;
    color: #e94560;
    font-weight: 500;
    text-decoration: none;
    text-align: center;
    transition: all 0.3s ease;
    font-size: 0.95rem;

    &:hover {
      background-color: #e94560;
      color: white;
      box-shadow: 0 4px 12px rgba(233, 69, 96, 0.4);
    }
  }
`;

/* Main Content */
export const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  background-color: black; /* Match design */
`;

/* Navbar */
export const Navbar = styled.header`
  height: 70px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  color: #fff;
  font-weight: 500;
  position: sticky;
  top: 0;
`;

/* Buttons */
export const FabButton = styled.button`
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: #e94560; /* Red from design */
  color: white;
  border: none;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const SButton = styled.button`
  background-color: transparent;
  border: 2px solid #e94560;
  color: #e94560;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background-color: #e94560;
    color: white;
    box-shadow: 0 4px 10px rgba(233, 69, 96, 0.4);
  }

  &:active {
    transform: scale(0.96);
  }
`;
