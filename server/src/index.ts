import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  let counter = 0;

  const interval = setInterval(() => {
    counter++;

    const payload = {
      time: new Date().toISOString(),
      value: counter,
    };

    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
    console.log("Client disconnected");
  });
});

app.listen(3001, () => {
  console.log("SSE server running on http://localhost:3001");
});
