import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";
import User from "../../../../models/User";




export async function GET() {
  await connectDB();

  // ✅ Only approved recipes
  const recipes = await Recipe.find({ status: "approved" })
    .populate("userId", "name")
    .lean();

  const formatted = recipes.map((r) => ({
    ...r,
    userName: r.userId?.name || "Unknown",
  }));

  return Response.json(formatted);
}