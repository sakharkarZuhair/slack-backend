import mongoose from "mongoose";

const workSpaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    banner_image: { type: String },
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channels" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const WorkSpace = mongoose.model("WorkSpace", workSpaceSchema);
export default WorkSpace;
