const express = require("express");
const app = express();
const path = require("path");

const { connectToMongoDB } = require("./connect");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");

const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected"),
);

app.set("view engine", "ejs"); // Mujhe ek View engine use karna hai aur mai ejs ko use karunga.
app.set("views", path.resolve("./views"));

app.use(express.json()); // parses incoming JSON data from the request body.
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute); // Whenever a request starts with /url, send it to the urlRoute router.
app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  // console.log("Short ID received:", shortId);
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
