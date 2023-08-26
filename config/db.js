const mongoose = require('mongoose');

// Database URI obtained From MongoDB Atlas connect/connect to your application/drivers/add your connection string into your application code
const ConnectDB = async () => {
  await mongoose
    .connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) =>
      console.log('ERROR INITIALIZING MONGODB CONNECTION --', err)
    );
};
// Check for certain connection events to the MongoDB server
mongoose.connection.on('connecting', () => {
  console.log('connecting to MongoDB Database...');
});
mongoose.connection.on('connected', () => {
  console.log('Initial connection to mongoDB database successful');
});
mongoose.connection.on('open', () => {
  console.log('mongoDB database connection successful');
});
mongoose.connection.on('error', () => {
  console.log('mongoDB database error!');
});
mongoose.connection.on('disconnected', () => {
  console.log('mongoDB connection disconnected');
});

module.exports = ConnectDB;
