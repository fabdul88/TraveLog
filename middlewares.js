// Not found middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - $(req.originalUrl`);
  res.status(404);
  next(error);
};

// Error handling middleware. NB!! The error handling middleware must have 4 parameters
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🙃" : error.stack,
  });
};

// exporting middleware to the server.js file
module.exports = {
  notFound,
  errorHandler,
};
