const express = require('express'); // importing expess
const axios = require('axios'); // importing axios
const path = require('path'); // importing path path module bundled w/ express

const port = process.env.PORT || 8080; // setting the port to 8080 to be accessable to localhost under criteria #2

const app = express(); // initializing express

app.use(express.static(path.join(__dirname, './static'))); // allowing express to look into the /static folder to find the additional stylesheets and scripts to serve up to the browser.

// This serves up the html file that will have the button to load up the random image
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, './static/index.html'));
});

// This is the route that we will hit in the front-end js file in order to recieve the url for the image
app.get('/api', (request, response) => {
  const randomNumber = Math.floor(Math.random() * 999 + 1);
  axios
    .get(`https://xkcd.com/${randomNumber}/info.0.json`)
    .then(function(res) {
      console.log(`image requested url: ${res.data.img}`);
      response.send(res.data.img);
    })
    .catch(function(error) {
      console.log(error);
      response.send(error);
    });
});

// setting the server to listen to port 8080 which we set in line:5
app.listen(port, () => {
  console.log(`Express server listening on ${port}/`);
});
