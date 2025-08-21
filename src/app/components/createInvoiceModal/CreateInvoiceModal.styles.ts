import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 700px;
  max-width: 95%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
`;

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
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #218838;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #0069d9;
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
