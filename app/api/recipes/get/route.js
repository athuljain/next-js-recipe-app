



import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";
import User from "../../../../models/User";

export async function GET() {
  await connectDB();

  
  const recipes = await Recipe.find({ status: "approved" })
    .populate("userId", "name profilePic") 
    .sort({ createdAt: -1 }) 
    .lean();

  const formatted = recipes.map((r) => ({
    ...r,
    userName: r.userId?.name || "Unknown Author",
    userPic: r.userId?.profilePic || "",
  }));

  return Response.json(formatted);
}