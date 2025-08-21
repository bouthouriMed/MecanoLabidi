"use client";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e1e2f;
`;

export const UserWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
`;

export const UserForm = styled.form`
  display: grid;
  gap: 15px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #00c9a7;
  }
`;

export const SubmitButton = styled.button`
  background-color: transparent;
  color: #00c9a7;
  padding: 12px;
  border: 2px solid #00c9a7;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #00c9a7;
    color: white;
  }
`;

export const UserList = styled.div`
  display: grid;
  gap: 15px;
`;

export const UserCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  strong {
    font-size: 16px;
  }
  span {
    font-size: 14px;
    color: #555;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button<{ variant?: "edit" | "delete" }>`
  background-color: transparent;
  color: ${(p) => (p.variant === "delete" ? "#ff4d4f" : "#1890ff")};
  padding: 6px 12px;
  border: 2px solid ${(p) => (p.variant === "delete" ? "#ff4d4f" : "#1890ff")};
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(p) =>
      p.variant === "delete" ? "#ff4d4f" : "#1890ff"};
    color: white;
  }
`;

export const AddButton = styled.button`
  padding: 8px 14px;
  background: transparent;
  color: #28a745;
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid #28a745;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #28a745;
    color: white;
  }
`;
