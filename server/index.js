const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const post = require("./routes/api");
app.use("/api/posts", post);

// Handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running ${port}`));
