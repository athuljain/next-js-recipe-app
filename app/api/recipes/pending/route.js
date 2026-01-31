import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function GET() {
  await connectDB();

  const recipes = await Recipe.find({ status: "pending" })
    .populate("userId", "name email");

  return Response.json(recipes);
}