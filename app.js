require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const walletRoutes = require("./routes/wallet");
const billRoutes = require("./routes/bill");
const testRoutes = require("./routes/test");
const multer = require("multer");
const path = require("path");

// express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/test", testRoutes);

//connect to databas
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
