import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import projectDetailsRoute from "./routes/projectDetailsRoute.js";
import projectsRouter from "./routes/projects.js";
import reviewProjectRoute from "./routes/reviewProjectRoute.js";
import postRoute from "./routes/postRoute.js";
import usersRoute from "./routes/usersRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import authRoute from "./routes/authRoute.js";
import commentRoute from "./routes/commentRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import notificationRoute from "./routes/notificationRoute.js";
import { createServer } from "http";
import { socketConnection } from "./utils/socket-io.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();

// Middleware for parsing request body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Middleware for handling CORS POLICY
const corsOptions = {
  origin: "http://localhost:3000", // Your frontend URL
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

// Use body-parser
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
console.log(path.join(__dirname, "public/uploads"));
app.use("/recruite", projectDetailsRoute);
app.use("/recruite", reviewProjectRoute);
app.use("/projects", projectsRouter);
app.use("/api/community", postRoute);
app.use("/api/community", commentRoute);
app.use("/users", usersRoute);
app.use("/payment", paymentRoute);
app.use("/auth", authRoute);
app.use("/notification", notificationRoute);

app.get("*", (req, res) => {
  console.log(req);
  res.send("page is not here");
});

// Log every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post("/users", (req, res) => { });

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

// Create socket io server
const httpServer = createServer(app);
socketConnection(httpServer);

app.get('/google-user-info', async (req, res) => {
  const { accessToken } = req.query;
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data from Google' });
  }
});

// Start the server
httpServer.listen(PORT || 5050, () => {
  console.log(`Server is listening on port ${PORT}`);
});
