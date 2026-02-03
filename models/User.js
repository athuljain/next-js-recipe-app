import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  },
  description: { type: String, default: "" },
  youtube: { type: String, default: "" },
  instagram: { type: String, default: "" },
  profilePic: { type: String, default: "" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);