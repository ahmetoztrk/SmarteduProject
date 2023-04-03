const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect DB
mongoose
  .connect('mongodb://localhost/smartedu-db')
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extendend: true }));

//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/category', categoryRoute);
app.use('/user', userRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
