const express =require('express');
const bodyParser = require("body-parser");
const webshot = require('webshot');
const Fs = require('fs');
const path = require('path');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "screenshots")));

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
 


const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));