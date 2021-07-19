const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);
  console.log("event-bus->POST: /events , data =", event);

  try {
    axios.post("http://posts-srv:4000/events", event);
    axios.post("http://comments-srv:4001/events", event);
    axios.post("http://query-srv:4002/events", event);
    axios.post("http://moderation-srv:4003/events", event);
  } catch (err) {
    console.log("Error propagating the events, err =", err.message);
  }

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  console.log("event-bus->GET: /events data =", events);
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
