require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler =require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
var http = require('http');
app.use(express.json())
// app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.set('port', PORT);
app.use('/api', router)
var server = http.createServer(app);

// Error processing, only in end of all
app.use(errorHandler)


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}

// app.get('/', (req, res) => {
  //     res.status(200).json({message: 'WORKING'})
  // })
  
  
  const start = async () => {
    try {
      await sequelize.authenticate()
      await sequelize.sync()
      server.listen(PORT, () => console.log(`listening on port ${PORT}`));
      server.on('error', onError);
      server.on('listening', onListening);
    // app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  } catch (e) {
    console.log(e);
  }
};

start()
