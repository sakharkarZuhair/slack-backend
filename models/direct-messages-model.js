import mongoose from "mongoose";

// Sub-schema for Users in DirectMessages
const directMessageUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  joined_at: { type: Date, default: Date.now },
});

// Main DirectMessage schema
const directMessagesSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkSpace",
      required: true,
      index: true,
    },
    users: [directMessageUserSchema], // Users involved in the direct message
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    is_deleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

// Add index for faster searches
directMessagesSchema.index({ workspace: 1, users: 1 });

const DirectMessages = mongoose.model("DirectMessages", directMessagesSchema);
export default DirectMessages;
