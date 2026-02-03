import mongoose from "mongoose";
import { connectDB } from "../../../../../lib/db";
import Recipe from "../../../../../models/Recipe";



// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;

//     // ✅ validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return Response.json([], { status: 200 });
//     }

//     const recipes = await Recipe.find({
//       userId: new mongoose.Types.ObjectId(id)
//     }).sort({ createdAt: -1 });

//     return Response.json(recipes);

//   } catch (error) {
//     console.error("USER RECIPES ERROR:", error);

//     return Response.json(
//       { error: "Failed to fetch user recipes" },
//       { status: 500 }
//     );
//   }
// }



export async function GET(req, context) { // 👈 Use 'context' to be safe with Next.js 15
  try {
    await connectDB();
    const { id } = await context.params; // 👈 Await params if using Next.js 15

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