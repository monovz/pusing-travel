const express = require('express');
const app = express();
const session = require('express-session')

const port = process.env.PORT || 3000
const routes = require('./routes');

app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(express.urlencoded({extended:true}))
app.use('/', routes);

app.listen(port, () => console.log(`Listening at port ${port}`))
