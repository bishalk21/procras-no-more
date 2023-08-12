/* eslint-disable no-unused-vars */
import "dotenv/config";
import express from "express"; // handling http requests, view rendering, application settings, middleware, - create and configure a web server
import helmet from "helmet";
import cors from "cors";
// import path from "path";
// import http from "http";
import { dbConnect } from "./src/config/dbConfig.js";
import taskRouter from "./src/routers/taskRouter.js";
import userRouter from "./src/routers/userRouter.js";

const app = express(); // instance of the Express application, which represents your web server.
// console.log(app);

app.use(express.json()); // built-in middleware method or function, parses incoming requests with JSON payloads and is based on bodyParser.
app.use(helmet());
app.use(cors());

// PORT
const PORT = process.env.PORT || 8000;

dbConnect();

// setting up and using an Express router to handle routes related to tasks.
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);

// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.use(
//   cors({
//     origin:
//       "https://corsproxy.io/?https://procras-no-more-frontend.vercel.app/",
//     credentials: true,
//     methods: "GET,POST,PUT,PATCH,DELETE",
//     allowedHeaders: "Authorization,Content-Type",
//     exposedHeaders: "Authorization",
//   })
// );

// defining route or a middleware function in an Express application
app.use("/", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET,PATCH,HEAD,OPTIONS,POST,PUT");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  // );
  const jf = {
    status: "success",
    message: "Hi you hit the procraste-no-more api endpoint",
  };
  res.json(jf);
  // res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

// an global error-handling middleware in an Express application
app.use((error, req, res, next) => {
  const status = error.status || 500;

  res.status(status).json({
    status: "error",
    message: error.message,
  });
});

// const server = http.createServer(app);

// starting the Express server and listening for incoming requests on a specified port
app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
