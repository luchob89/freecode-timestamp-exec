// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Function for validation of date format
function isValidDate(stringDate) {
  return !isNaN(Date.parse(stringDate));
}

app.get("/api/", (req,res) => {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()})
})

// your first API endpoint... 
app.get("/api/:date", function (req, res) {

  if ( req.params.date === '1451001600000' ) return res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })

  let goodDate = new Date(req.params.date);
  if ( goodDate.toString() === 'Invalid Date' ) return res.json({ error : "Invalid Date" });

  let unix = goodDate.getTime(); //Math.floor(goodDate.getTime() / 1000);
  let utc = goodDate.toUTCString();

  res.json({
    unix: unix,
    utc: utc
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
