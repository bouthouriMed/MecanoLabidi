import styled from "styled-components";

export const Container = styled.div`
  padding: 0 20px;
  background-color: black;
  color: #fff;
`;

export const Header = styled.h1`
  font-size: 1.6rem;
  color: #e94560; /* red from logo */
  font-weight: 700;
  text-align: center;
  user-select: none;
  margin-bottom: 20px;
`;

export const InvoiceGrid = styled.div`
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(233, 69, 96, 0.4); /* red scroll */
    border-radius: 3px;
  }
`;

export const InvoiceInfo = styled.div`
  flex-grow: 1;
  margin-bottom: 12px;
`;

export const NoInvoicesMessage = styled.p`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  color: #888;
  user-select: none;
`;

export const InvoiceCard = styled.div`
  background: 1e2128FF;
  border: 1px solid #2c2f36; /* darker border */
  box-shadow: 0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1f;
  color: #fff;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;

  &:hover {
    border-color: #1e2128ea; /* darker red on hover */
    box-shadow: 0 4px 14px rgba(233, 69, 96, 0.2);
  }
`;

export const InvoiceTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff; /* white for contrast */
  letter-spacing: 0.02em;
`;

export const InvoiceRow = styled.div`
  font-size: 0.92rem;
  color: #ddd;
  margin-bottom: 6px;

  strong {
    color: #bbb;
    margin-right: 6px;
    user-select: none;
  }
`;

export const ActionButton = styled.button<{
  variant: "view" | "edit" | "delete";
}>`
  padding: 6px 14px;
  border-radius: 25px;
  border: 1px solid #e94560;
  background: transparent;
  color: #ffffffd9;
  font-weight: 400;
  font-size: 0.8rem;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.25s ease;

  &:hover {
    background-color: #e94560;
    color: #fff;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
