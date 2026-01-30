
// import mongoose from "mongoose";

// const recipeSchema = new mongoose.Schema({
//   title: String,
//   ingredients: String,
//    userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   status: {
//     type: String,
//     default: "pending"
//   },
//   likes: {
//     type: [String],   // array of userIds
//     default: []
//   }
// });

// export default mongoose.models.Recipe ||
//   mongoose.model("Recipe", recipeSchema);





import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  steps: String,

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
});

export default mongoose.models.Recipe ||
  mongoose.model("Recipe", recipeSchema);
