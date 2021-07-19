const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

async function handleModeration(type, data) {
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
}

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log("moderation->POST: /events data =", type, data);

  handleModeration(type, data);

  res.send({});
});

app.listen(4003, async () => {
  console.log("Listening on 4003");
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);
      handleModeration(event.type, event.data);
    }
  } catch (err) {
    console.log("Error in fetching the past events, err =", err.message);
  }
});
