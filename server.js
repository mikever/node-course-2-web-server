const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

/* Uncomment code below to enter maintenance mode */
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
-
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// arg1: http address, arg2: function with request and response parameters
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the website!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// route at /bad - send back JSON with error message property.
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error loading page'
  });
});

// Port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
