"use client";
import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f8;
`;

export const LoginForm = styled.form`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 320px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #1e1e2f;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  &:focus {
    border-color: #00c9a7;
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  background-color: #00c9a7;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #00b297;
  }
`;

export const ErrorMsg = styled.div`
  background: #ffe5e5;
  color: #d8000c;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 14px;
`;
