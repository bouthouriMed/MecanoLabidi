import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // adjust path

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: Request, context: any) {
  const id = context.params.id;

  try {
    const result = await pool.query("DELETE FROM invoices WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting invoice" },
      { status: 500 }
    );
  }
}
