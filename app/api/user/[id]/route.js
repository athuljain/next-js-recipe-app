import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";
export async function GET(req, { params }) {

  const { id } = params;   // ✅ REQUIRED

  try {
    await connectDB();

    const recipes = await Recipe.find({ userId: id })
      .sort({ _id: -1 });

    return Response.json(recipes);

  } catch (error) {
    console.log("USER RECIPES ERROR:", error);

    return Response.json(
      { error: "Failed to fetch user recipes" },
      { status: 500 }
    );
  }
}