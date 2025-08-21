export type Invoice = {
  id: number;
  date: string;
  car_plate: string;
  technician_name: string;
  customer_name: string;
  phone_number: string;
  email: string;
  subtotal: number;
  items?: InvoiceItem[];
};

export type InvoiceItem = {
  id?: number;
  description: string;
  price: number;
  quantity?: number;
};

export type InvoicesContextType = {
  invoices: Invoice[];
  loading: boolean;
  fetchInvoices: () => Promise<void>;
  addInvoice: (invoice: Invoice) => void;
  removeInvoice: (id: number) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};
