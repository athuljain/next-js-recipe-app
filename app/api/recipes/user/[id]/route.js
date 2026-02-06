import mongoose from "mongoose";
import { connectDB } from "../../../../../lib/db";
import Recipe from "../../../../../models/Recipe";


export async function GET(req, context) { 
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const recipes = await Recipe.find({
      userId: id ,
      status:{$in:["pending","approved"]}

    }).sort({ createdAt: -1 });

    return Response.json(recipes);
  } catch (error) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}