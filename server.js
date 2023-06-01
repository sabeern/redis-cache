const express = require("express");
const Redis = require("ioredis");

// Create a Redis client
const redis = new Redis();
const DEFAULT_EXPIRATION = 3600;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  await redis.set("name", JSON.stringify("sabeer"));
  await redis.get("name", (err, data) => {
    if (err) {
      console.log(err.message);
    }
    if (data != null) {
      return res.send(JSON.parse(data));
    }
    res.send("no redis data");
  });
});

app.listen(3000, () => console.log("listening or port 3000"));
