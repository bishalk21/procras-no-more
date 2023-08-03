/* eslint-disable no-unused-vars */
import express from "express"; // handling http requests, view rendering, application settings, middleware, - create and configure a web server
const app = express(); // instance of the Express application, which represents your web server.
// console.log(app);

app.use(express.json()); // built-in middleware method or function, parses incoming requests with JSON payloads and is based on bodyParser.

// PORT
const PORT = 8000;

// defining route or a middleware function in an Express application
app.use("/", (req, res) => {
  const jf = {
    status: "success",
    message: "Hi you hit the procraste-no-more api endpoint",
  };
  res.json(jf);
});

// an global error-handling middleware in an Express application
app.use((error, req, res, next) => {
  const status = error.status || 500;

  res.status(status).json({
    status: "error",
    message: error.message,
  });
});

// starting the Express server and listening for incoming requests on a specified port
app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
