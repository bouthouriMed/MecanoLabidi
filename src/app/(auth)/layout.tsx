import React from "react";
import { InvoicesProvider } from "../(main)/invoices/InvoicesContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InvoicesProvider>
        <>{children}</>
      </InvoicesProvider>
    </>
  );
}
