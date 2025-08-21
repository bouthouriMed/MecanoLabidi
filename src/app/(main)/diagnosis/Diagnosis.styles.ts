import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  height: 80vh;
  border-radius: 12px;
`;

export const Header = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
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
  transition: all 0.3s ease;

  &:hover {
    background: #28a745;
    color: white;
  }
`;

export const DiagnosisGrid = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 123, 255, 0.4);
    border-radius: 3px;
  }
`;

export const DiagnosisCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 3px 10px rgba(0, 123, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 123, 255, 0.2);
  }
`;

export const DiagnosisTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #007bff;
`;

export const DiagnosisInfo = styled.div`
  flex-grow: 1;
  margin-bottom: 12px;
`;

export const DiagnosisRow = styled.div`
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 6px;

  strong {
    color: #555;
    margin-right: 6px;
  }
`;

export const ActionButton = styled.button<{
  variant: "view" | "edit" | "delete";
}>`
  padding: 6px 12px;
  border: 2px solid
    ${({ variant }) =>
      variant === "view"
        ? "#17a2b8"
        : variant === "edit"
        ? "#ffc107"
        : "#dc3545"};
  background: transparent;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  margin-right: 8px;
  color: ${({ variant }) =>
    variant === "view"
      ? "#17a2b8"
      : variant === "edit"
      ? "#ffc107"
      : "#dc3545"};
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "view"
        ? "#17a2b8"
        : variant === "edit"
        ? "#ffc107"
        : "#dc3545"};
    color: white;
  }
`;

export const NoDiagnosisMessage = styled.p`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  color: #888;
`;
