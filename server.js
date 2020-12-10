const express =require('express');
const bodyParser = require("body-parser");
const webshot = require('webshot');
const Fs = require('fs');
const path = require('path');
var cors = require('cors');
const helmet = require("helmet");
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "screenshots")));



// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://shrouded-journey-38552.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(helmet());
app.use(cors(corsOptions));

app.post("/api/screenshot", (req, res) => {
 

 webshot(`${req.body.screenshotUrl}`,`./screenshots/${req.body.imgName}.${req.body.imgFormat}`,function(err){
    if(err) console.log(err)
    console.log("Screenshot saved");
  })
  res.send("Screenshot taken.....Please wait your Download is in process");
  });

  app.post("/api/getimage",(req, res) => {

    res.sendFile(`screenshots/${req.body.imgName}.${req.body.imgFormat}`, { root: __dirname });

  })
 

  if (process.env.NODE_ENV === 'production') 
  {

  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));