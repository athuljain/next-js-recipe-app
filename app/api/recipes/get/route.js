// import { connectDB } from "../../../../lib/db";
// import Recipe from "../../../../models/Recipe";
// import User from "../../../../models/User";




// export async function GET() {
//   await connectDB();

//   // ✅ Only approved recipes
//   const recipes = await Recipe.find({ status: "approved" })
//     .populate("userId", "name")
//     .lean();

//   const formatted = recipes.map((r) => ({
//     ...r,
//     userName: r.userId?.name || "Unknown",
//   }));

//   return Response.json(formatted);
// }



import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";
import User from "../../../../models/User";

export async function GET() {
  await connectDB();

  // ✅ Fetch approved recipes and pull name AND profilePic from the User model
  const recipes = await Recipe.find({ status: "approved" })
    .populate("userId", "name profilePic") // 👈 Added profilePic here
    .sort({ createdAt: -1 }) // Show newest recipes first
    .lean();

  const formatted = recipes.map((r) => ({
    ...r,
    userName: r.userId?.name || "Unknown Author",
    userPic: r.userId?.profilePic || "", // 👈 Map the profile pic to a clean variable
  }));

  return Response.json(formatted);
}