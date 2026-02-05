


import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  steps: String,
image: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    default: "pending"
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  ]
},
  { timestamps: true });

export default mongoose.models.Recipe ||
  mongoose.model("Recipe", recipeSchema);
