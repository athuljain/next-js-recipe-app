import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectDB();


    const user = await User.findOne({ email });

  if (user) {
    return Response.json(
      { message: "You already have an account. Please login." },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });

  return Response.json({ message: "Registered" });
}
