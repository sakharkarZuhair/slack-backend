import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    workspace: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkSpace" }],
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role: [
      {
        role: {
          type: String,
          enum: ["SuperUser", "User"],
          default: "User",
          required: true,
        },
        workspace: { type: mongoose.Schema.Types.ObjectId, ref: "WorkSpace" },
      },
    ],
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
export default Users;
