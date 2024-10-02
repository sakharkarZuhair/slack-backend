import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    banner_image: { type: String },
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channels" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    is_deleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

// Adding indexes for fast lookups
workspaceSchema.index({ name: 1, is_deleted: 1 });

const WorkSpace = mongoose.model("WorkSpace", workspaceSchema);
export default WorkSpace;
