import styled from "styled-components";

export const ModalContent = styled.div`
  padding: 1.5rem;
  font-family: "Inter", sans-serif;
  color: #333;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  gap: 20rem;
`;

export const CompanyInfo = styled.div`
  h2 {
    margin: 0;
    color: #2d3436;
    font-size: 1.4rem;
    font-weight: bold;
  }
  p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }
`;

export const InvoiceInfo = styled.div`
  text-align: right;
  p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }
`;

export const SectionTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3436;
`;

export const InfoRow = styled.p`
  margin: 0.3rem 0;
  font-size: 0.95rem;
`;

export const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.8rem;
  font-size: 0.9rem;
`;

export const TableHead = styled.tr`
  background: #f9f9f9;
  border-bottom: 2px solid #ddd;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
`;

export const TableCell = styled.td`
  padding: 0.6rem;
  text-align: left;

  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    text-align: center;
  }
`;

export const TotalRow = styled.tr`
  background: #f8f8f8;
  font-weight: bold;
  border-top: 2px solid #ddd;
`;
