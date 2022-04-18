const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/user");
const getNews = require("./routes/getNews");
const { uri } = require("./config");
//---------------------------------------- End of import ----------

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  })
);

app.use("/users", router);
app.use("/getnews", getNews);
//---------------------------------- End of middleware ---------------

//----------------------- Starting server ---------------------
const PORT = process.env.PORT || 4001;

const boot = async () => {
  //start connented at mongo db
  await mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("MongoDB is connected");
    }
  );

  //start express server
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

boot();
