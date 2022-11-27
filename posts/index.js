const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  console.log("posts->POST: /posts/create");
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
    comments: [],
  };

  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
        comments: [],
      },
    });
  } catch (err) {
    console.log("Error sending the events, err =", err.message);
  }

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  try {
    if (type === "CommentCreated") {
      const { postId, id, status, content } = data;
      const post = posts[postId];
      const comments = post.comments || [];
      comments.push({
        id,
        status,
        content,
      });
      posts[postId] = {
        ...posts[postId],
        comments,
      };
    } else if (type === "CommentUpdated") {
      const { postId, id, status, content } = data;
      const post = posts[postId];
      const comments = post.comments || [];
      const comment = comments.find((comment) => {
        return comment.id === id;
      });
      comment.status = status;
    }
  } catch (e) {}

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
