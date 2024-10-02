import mongoose from "mongoose";

// Sub-schema for Users in Channels
const channelUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  role: {
    type: String,
    enum: ["Admin", "User", "Guest"],
    default: "User",
  },
  joined_at: { type: Date, default: Date.now },
});

// Main Channel schema
const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkSpace",
      required: true,
      index: true,
    },
    users: [channelUserSchema], // Embed the sub-schema for channel members
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    is_private: { type: Boolean, default: false },
    is_starred: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

// Add indexes to speed up queries
channelSchema.index({ name: 1, workspace: 1 }, { unique: true }); // Unique channels in a workspace

const Channels = mongoose.model("Channels", channelSchema);
export default Channels;
