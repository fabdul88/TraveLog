const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
// const path = require('path');

// Middleware
const cors = require('cors');

require('dotenv').config();

const logsRouter = require('./routes/logRoutes');

const app = express();

app.use(cors());
// Body parser
app.use(express.json());

app.use(morgan('common'));

app.use('/api/listLogEntries', logsRouter);
app.use('/api/postLogEntry', logsRouter);
app.use('/api/editLogEntry', logsRouter);
app.use('/api/deleteLogEntry', logsRouter);

// deployment
// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, './client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.join(__dirname, './client/build/index.html'),
//       function (err) {
//         res.status(500).send(err);
//       }
//     );
//   });
// } else {
//   app.get('/', (req, res) => res.send('server is ready'));
// }
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html'),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}
// Server port
const PORT = process.env.PORT || 8080;

// Connecting MongoDB Atlas then server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening to the Server at http://localhost:${PORT}`);
  });
});
