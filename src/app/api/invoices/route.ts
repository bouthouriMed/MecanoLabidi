// src/app/api/invoices/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { create } from "domain";

// GET all invoices
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        i.id, i.customer_name, i.date, i.car_plate, i.technician_name,
        i.phone_number, i.email, i.subtotal, i.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ii.id,
              'description', ii.description,
              'price', ii.price
            ) ORDER BY ii.id
          ) FILTER (WHERE ii.id IS NOT NULL),
          '[]'
        ) AS items
      FROM public.invoices i
      LEFT JOIN public.invoices_items ii ON ii.invoice_id = i.id
      GROUP BY i.id
      ORDER BY i.created_at DESC;
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

// POST create new invoice
export async function POST(req: Request) {
  try {
    const {
      date,
      car_plate,
      technician_name,
      customer_name,
      phone_number,
      email,
      items,
      subtotal,
    } = await req.json();

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Insert invoice header and get inserted id
      const invoiceResult = await client.query(
        `INSERT INTO invoices 
          (date, car_plate, technician_name, customer_name, phone_number, email, subtotal, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         RETURNING id`,
        [
          date,
          car_plate,
          technician_name,
          customer_name,
          phone_number,
          email,
          subtotal,
        ]
      );

      const invoiceId = invoiceResult.rows[0].id;

      // Insert each invoice item linked to invoiceId
      for (const item of items) {
        await client.query(
          `INSERT INTO invoices_items 
            (invoice_id, description, price)
           VALUES ($1, $2, $3)`,
          [invoiceId, item.description, item.price]
        );
      }

      const fullInvoice = await client.query(
        `SELECT i.*, 
         json_agg(json_build_object('description', ii.description, 'price', ii.price)) AS items
         FROM invoices i
         LEFT JOIN invoices_items ii ON i.id = ii.invoice_id
         WHERE i.id = $1
         GROUP BY i.id`,
        [invoiceId]
      );

      await client.query("COMMIT");

      return NextResponse.json(fullInvoice.rows[0], { status: 201 });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(
      "Error creating invoice:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}

// PUT update invoice
export async function PUT(req: Request) {
  try {
    const { id, date, customer_name, amount } = await req.json();

    const result = await pool.query(
      `UPDATE invoices SET date = $1, customer_name = $2, amount = $3 WHERE id = $4 RETURNING *`,
      [date, customer_name, amount, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 500 }
    );
  }
}

// DELETE invoice
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const result = await pool.query(`DELETE FROM invoices WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 }
    );
  }
}
