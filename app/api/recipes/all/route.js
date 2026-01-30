import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function GET() {
  await connectDB();
  const recipes = await Recipe.find(); 
  return new Response(JSON.stringify(recipes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}