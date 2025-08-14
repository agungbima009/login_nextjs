import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = new Client({
      host: "103.157.27.149",
      port: 5432,
      user: "admingacor",
      password: "cintaadmin",
      database: "appdb",
    });

    await client.connect();

    const result = await client.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [email, password]
    );

    await client.end();

    if (result.rows.length > 0) {
      return NextResponse.json({ success: true, user: result.rows[0],  username: result.rows[0].username });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
