import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}