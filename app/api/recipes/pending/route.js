import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function GET() {
    await connectDB()

const recipes = await Recipe.find({ status: "pending" })
  .populate("user", "name email");


const formatted = recipes.map((r) => ({
  ...r,
  userName: r.userId?.name || "Unknown",
}));

return Response.json(formatted);
    
}