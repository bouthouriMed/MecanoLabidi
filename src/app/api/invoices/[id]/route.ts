import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // adjust path

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id; // access params inside

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
