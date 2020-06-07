const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const session = require('express-session')


const port = 8080;

//se the ejs template engine 

app.set('view engine','ejs')

// Middleware

app.use('/assets', express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


//Route to home page
app.get('/', (req, res) => {
  if (req.session.error){
    res.locals.error = req.session.error
    req.session.error = undefined
    
  }
      res.render('index')
  
  });

app.post('/',(req,res) => {
  if (req.body.message === undefined || req.body.message === ''){
    req.session.error = "some thing went wrong"
    res.redirect('/')
  }
})


app.listen(port)