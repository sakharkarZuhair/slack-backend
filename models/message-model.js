import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    type: {
      type: String,
      enum: ["text", "file", "image"],
    },
    message: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    is_edited: { type: Boolean, default: false },
    reactions: [{ type: String }],
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "WorkSpace" },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
