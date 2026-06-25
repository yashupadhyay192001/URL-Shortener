require('dotenv').config();

const express = require('express');

const sequelize = require('./config/database');

require('./models/Url');

const urlRoutes = require('./routes/routes');

const errorHandler = require('./middlewares/errorHandler');

const redisClient = require("./config/redis");

const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));

app.use(errorHandler);

app.use(express.json());

app.use('/api', urlRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {

  try {


    await sequelize.authenticate();

    console.log(
      'Database connected'
    );

    await sequelize.sync({ alter: true });

    console.log(
      'Models synced'
    );

    await redisClient.connect();

    console.log(
      "Redis connected"
    );

    app.listen(PORT, () => {
      console.log(
        `Server running on ${PORT}`
      );
    });

  } catch (error) {

    console.error(error);
  }
};

startServer();