import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

// export async function POST(req) {
//   await connectDB();
//   const data = await req.json();

//   await Recipe.create(data);

//   return Response.json({ message: "Recipe submitted" });
// }


export async function POST(req) {
  await connectDB();
  const data = await req.json();

  if (!data.userId) {
    return Response.json({ error: "UserId missing" }, { status: 400 });
  }

  await Recipe.create(data);

  return Response.json({ message: "Recipe submitted" });
}