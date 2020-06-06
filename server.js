const express = require('express');

const app = express();

const bodyParser = require('body-parser');


const port = 8080;

//se the ejs template engine 

app.set('view engine','ejs')

// Middleware

app.use('/assets', express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

//Route to home page
app.get('/', (req, res) => {
  res.render('index')
});

app.listen(port)