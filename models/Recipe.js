// import mongoose from "mongoose";

// const RecipeSchema = new mongoose.Schema({
//   title: String,
//   ingredients: String,
//   steps: String,
//   status: {
//     type: String,
//     default: "pending"
//   },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
// });

// export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  status: {
    type: String,
    default: "pending"
  },
  likes: {
    type: [String],   // array of userIds
    default: []
  }
});

export default mongoose.models.Recipe ||
  mongoose.model("Recipe", recipeSchema);
