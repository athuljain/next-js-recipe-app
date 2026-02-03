import mongoose from "mongoose";
import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";



export async function GET(req, { params }) {
  try {
    console.log("PARAMS:", params);

    await connectDB();

    const userId = params.id;
    console.log("USER ID:", userId);

    // Check ObjectId validity
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("INVALID OBJECT ID");
      return Response.json([]);
    }

    const recipes = await Recipe.find({
      userId: new mongoose.Types.ObjectId(userId)
    });

    console.log("RECIPES FOUND:", recipes.length);

    return Response.json(recipes);

  } catch (error) {
    console.error("USER RECIPES ERROR:", error);
    return Response.json(
      { error: "Failed to fetch user recipes" },
      { status: 500 }
    );
  }
}