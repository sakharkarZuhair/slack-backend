import mongoose from "mongoose";

const channelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "WorkSpace" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    is_private: { type: Boolean, default: false },
    is_starred: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Channels = mongoose.model("Channels", channelSchema);
export default Channels;
