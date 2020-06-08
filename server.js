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

app.use(require('./middlewares/flashs'))

app.get('/', (req, res) => {
    
  let Message = require('./models/message')
  
  Message.all(function(messages){
    
    res.render('index', { obj: messages })
  }) 
  
  });

app.post('/',(req,res) => {
  if (req.body.message === undefined || req.body.message === ''){
    //req.session.error = "some thing went wrong"
    req.flash('error', "some thing went wrong")
    res.redirect('/')
    
  }else {
    let Message = require('./models/message')
    Message.create(req.body.message, function(){
       req.flash('succses',"Thanks!")
       res.redirect('/')
    })
  }
  
})


app.listen(port)