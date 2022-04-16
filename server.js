// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function (req, res) {
  let date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date", function (req, res) {
  try {
    let date = new Date();
    if (req.params.date == undefined) {
      date = new Date();
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
      return;
    }
    const timeNumber = parseInt(req.params.date);
    console.log(isNaN(timeNumber));
    if (isNaN(timeNumber) || timeNumber.toString() != req.params.date) {
      date = new Date(req.params.date);
      if (date.toString() == "Invalid Date") {
        res.json({ error: "Invalid Date" });
        return;
      }
    } else {
      date = new Date(timeNumber);
      if (date.toString() == "Invalid Date") {
        res.json({ error: "Invalid Date" });
        return;
      }
    }
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } catch (err) {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
