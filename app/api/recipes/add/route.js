import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function POST(req){
    const data=await req.json();
    await connectDB();
    await Recipe.create(data)
     return Response.json({ message: "Recipe submitted" });
}