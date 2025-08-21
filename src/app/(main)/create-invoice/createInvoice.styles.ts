import styled from "styled-components";

export const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 10px;
    background: #f5f5f5;
    font-weight: bold;
    font-size: 0.95rem;
  }

  input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    outline: none;
    transition: border 0.2s ease;

    &:focus {
      border-color: #007bff;
    }
  }
`;

export const InvoiceRow = styled.tr`
  border-bottom: 1px solid #eee;

  &:hover {
    background: #fafafa;
  }
`;

export const InvoiceCell = styled.td`
  padding: 10px;
  vertical-align: middle;
`;

export const AddItemButton = styled.button`
  margin-top: 12px;
  padding: 8px 14px;
  background: transparent;
  color: #28a745;
  border: 2px solid #28a745;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: #28a745;
    color: white;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

export const HeaderForm = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const HeaderInput = styled.input`
  flex: 1 1 140px;
  padding: 8px 12px;
  font-size: 0.95rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;

  &:hover {
    color: #a71d2a;
  }
`;

export const SubtotalRow = styled.tr`
  background-color: #f9f9f9;
  font-size: 1rem;
  border-top: 2px solid #007bff;
`;

export const SelectInput = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: #fff;
  width: 100%;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 3px rgba(74, 144, 226, 0.5);
  }
`;
