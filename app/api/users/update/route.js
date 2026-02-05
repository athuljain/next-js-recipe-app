import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export async function PUT(req) {
  await connectDB();
  const { userId, name, description, youtube, instagram, profilePic } = await req.json();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, description, youtube, instagram, profilePic },
    { new: true } 
  );

  return Response.json({ message: "Updated", user: updatedUser });
}