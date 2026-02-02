import { connectDB } from "../../../../../lib/db";
import Recipe from "../../../../../models/Recipe";


export async function GET(req, { params }) {
  await connectDB();

  try {
    const recipes = await Recipe.find({ userId: params.id })
      .populate("userId", "name")
      .sort({ _id: -1 });

    return Response.json(recipes);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch user recipes" },
      { status: 500 }
    );
  }
}
