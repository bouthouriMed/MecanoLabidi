// src/app/api/diagnosis/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // your Postgres pool

export async function GET() {
  const result = await pool.query("SELECT * FROM diagnosis ORDER BY id ASC");
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const { description } = await req.json();
  const result = await pool.query(
    `INSERT INTO diagnosis (description) VALUES ($1) RETURNING *`,
    [description]
  );
  return NextResponse.json(result.rows[0], { status: 201 });
}

export async function PUT(req: Request) {
  const { id, description } = await req.json();
  const result = await pool.query(
    `UPDATE diagnosis SET description = $2 WHERE id = $1 RETURNING *`,
    [id, description]
  );
  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await pool.query("DELETE FROM diagnosis WHERE id = $1", [id]);
  return NextResponse.json({ success: true });
}
