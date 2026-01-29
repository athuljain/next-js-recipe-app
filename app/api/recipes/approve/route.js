import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";

export async function POST(req) {
  const token = req.headers.get("authorization");

  if (!token) {
    return Response.json({ error: "No token" });
  }

  const decoded = jwt.verify(token.split(" ")[1], "secret123");

  if (decoded.role !== "admin") {
    return Response.json({ error: "Forbidden" });
  }

  const { id } = await req.json();
  await connectDB();

  await Recipe.findByIdAndUpdate(id, { status: "approved" });

  return Response.json({ message: "Approved" });
}
