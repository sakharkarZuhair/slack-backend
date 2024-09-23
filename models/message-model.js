import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "file", "image"],
      required: true,
    },
    content: { type: String, trim: true }, // Renamed for clarity
    attachments: [{ type: String }], // Store links to files
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    is_edited: { type: Boolean, default: false },
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        reaction: { type: String },
      },
    ],
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkSpace",
      required: true,
      index: true,
    },
    is_deleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

messageSchema.index({ workspace: 1, user: 1 }); // Improve searching of user messages in a workspace

const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
