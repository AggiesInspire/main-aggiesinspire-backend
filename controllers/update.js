import fetch from "node-fetch";
import Channel from "../models/Channel.js";

const url = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCsnFKowiOYcBpVa5m7HI49g&key=${process.env.YOUTUBE_API_KEY}`;

const update = async (req, res, next) => {
  const data = await fetch(url).then((res) => {
    if (!res.ok) {
      console.error(`Backend responded with ${res.status} error`);
      next(res.status);
    } else {
      return res.json();
    }
  });
  const youtubeData = data.items[0].statistics;

  const filter = { name: "Youtube" };
  // if finding with filter returns null, create new object with filter value
  const options = { upsert: true, new: true };

  const values = {
    viewCount: parseInt(youtubeData["viewCount"]),
    videoCount: parseInt(youtubeData["videoCount"]),
    subscriberCount: parseInt(youtubeData["subscriberCount"]),
  };
  try {
    const youtube = await Channel.findOneAndUpdate(filter, values, options);

    res.json(youtube);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: true, message: e.message });
  }
  next();
};

export default update;
