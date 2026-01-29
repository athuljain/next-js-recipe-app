import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectDB();

  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });

  return Response.json({ message: "Registered" });
}
