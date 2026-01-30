import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function GET() {
    await connectDB()

    const recipes=await Recipe.find({status:"pending"})
    return Response.json(recipes)
    
}