require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler =require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json())
app.use('/api', router)




// Error processing, only in end of all
app.use(errorHandler)


// app.get('/', (req, res) => {
//     res.status(200).json({message: 'WORKING'})
// })


const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  } catch (e) {
    console.log(e);
  }
};

start()
