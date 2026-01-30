// import { connectDB } from "../../../../lib/db";
// import User from "../../../../models/User"; 
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   const { email, password } = await req.json();
//   await connectDB();

//   const user = await User.findOne({ email });
//   if (!user) return Response.json({ error: "User not found" });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return Response.json({ error: "Invalid" });

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     "secret123"
//   );

//   return Response.json({ token });
// }



import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return Response.json({ error: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret123",
    { expiresIn: "1d" }
  );

 return Response.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    role: user.role
  }
  });
}
