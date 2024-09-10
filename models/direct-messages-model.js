import mongoose from "mongoose";

const directMessagesSchema = mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "WorkSpace" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const DirectMessages = mongoose.model("DirectMessages", directMessagesSchema);
export default DirectMessages;
