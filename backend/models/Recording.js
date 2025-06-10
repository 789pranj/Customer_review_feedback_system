import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export const Recording = mongoose.model("Recording", recordingSchema);
