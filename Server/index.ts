import express from "express";
import path from "path";

const port = 80;
const app = express();

app.use(express.static(path.resolve("public/")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.listen(port, () => {
  console.log(`Express Server Listening on: ${port}`);
});
