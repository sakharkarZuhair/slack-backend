import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["SuperUser", "Admin", "User", "Guest"],
    default: "User",
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkSpace",
    // required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    workspace: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkSpace" }],
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String }, // Only for custom authentication
    auth_provider: {
      type: String,
      enum: ["google", "github", "facebook", "custom"],
      required: true,
    },
    role: [userRoleSchema],
    is_deleted: { type: Boolean, default: false, index: true },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = async function (email) {
  try {
    return await this.findOne({ email });
  } catch (error) {
    throw new Error("Error finding user by email");
  }
};

// Adding indexes
userSchema.index({ email: 1, is_deleted: 1 });
userSchema.index({ username: 1, is_deleted: 1 });

const Users = mongoose.model("Users", userSchema);
export default Users;
