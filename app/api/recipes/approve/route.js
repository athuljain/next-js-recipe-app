// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/db";
// import Recipe from "@/models/Recipe";

// export async function POST(req) {
//   const token = req.headers.get("authorization");

//   if (!token) {
//     return Response.json({ error: "No token" });
//   }

//   const decoded = jwt.verify(token.split(" ")[1], "secret123");

//   if (decoded.role !== "admin") {
//     return Response.json({ error: "Forbidden" });
//   }

//   const { id } = await req.json();
//   await connectDB();

//   await Recipe.findByIdAndUpdate(id, { status: "approved" });

//   return Response.json({ message: "Approved" });
// }


import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";

export async function POST(req) {
  try {

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    if (decoded.role !== "admin") {
      return Response.json({ error: "Access denied" }, { status: 403 });
    }

  
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "Recipe ID required" }, { status: 400 });
    }

    await connectDB();

   
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!recipe) {
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    }

    return Response.json({
      message: "Recipe approved successfully",
      recipe
    });

  } catch (error) {
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 500 }
    );
  }
}
