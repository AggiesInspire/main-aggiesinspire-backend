import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  videoCount: {
    type: Number,
  },
  likeCount: {
    type: Number,
  },
  viewCount: {
    type: Number,
  },

  subscriberCount: {
    type: Number,
  },
});

export default mongoose.model("Channel", ChannelSchema);
