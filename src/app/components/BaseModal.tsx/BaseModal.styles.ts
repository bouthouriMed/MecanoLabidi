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

export const ModalHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  min-width: 550px;
  max-width: 80%;
  max-height: 98vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto; /* scroll only body */
  flex: 1; /* take available space between header and footer */
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
