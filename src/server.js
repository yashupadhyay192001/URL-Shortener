require('dotenv').config();

const express = require('express');

const sequelize = require('./config/database');

require('./models/Url');

const urlRoutes = require('./routes/routes');

const app = express();

app.use(express.json());

app.use('/api', urlRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {

  try {

    await sequelize.authenticate();

    console.log(
      'Database connected'
    );

    await sequelize.sync();

    console.log(
      'Models synced'
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