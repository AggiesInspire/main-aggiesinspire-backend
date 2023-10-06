import Channel from "../models/Channel.js";

const statistics = async (req, res) => {
  const totals = await Channel.aggregate([
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$viewCount" },
        totalSubscribers: { $sum: "$subscriberCount" },
        totalVideos: { $sum: "$videoCount" },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json({ error: true, message: e });
    });
};

export default statistics;
