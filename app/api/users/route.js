import jwt from "jsonwebtoken"
import { connectDB } from "../../../lib/db"
import User from "../../../models/User"


export async function GET(req) {
  try {
    const token = req.headers.get("authorization");
    if (!token) {
      return new Response(JSON.stringify({ error: "No token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const decoded = jwt.verify(token.split(" ")[1], "secret123");
    if (decoded.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }

    await connectDB();

    const users = await User.find().select("-password");

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}