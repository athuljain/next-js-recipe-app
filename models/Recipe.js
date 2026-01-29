import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  steps: String,
  status: {
    type: String,
    default: "pending"
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
