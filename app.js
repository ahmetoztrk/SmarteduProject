const express = require('express');
const ejs = require('ejs');

const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).render('index', { 
    page_name: 'index',
  });
});
app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name : "about"
  });
});
app.get('/pricing', (req, res) => {
  res.status(200).render('pricing');
});
app.get('/teachers', (req, res) => {
  res.status(200).render('teachers');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
