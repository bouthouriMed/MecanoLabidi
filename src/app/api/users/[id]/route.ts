/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request, context: any) {
  const id = context.id;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`GET /api/users/${id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: any) {
  const id = context.id;
  try {
    const { username, email, password, phone } = await req.json();
    const result = await pool.query(
      `UPDATE users SET username=$1, email=$2, password=$3, phone=$4 WHERE id=$5 RETURNING *`,
      [username, email, password, phone, id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`PUT /api/users/${id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: any) {
  const id = context.id;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/users/${id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
