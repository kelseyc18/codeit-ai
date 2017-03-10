const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const Dropbox = require('dropbox');
const request = require('request');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.use(fileUpload());

// TODO: convert access token to environment variable
var dbx = new Dropbox({ accessToken: /* INSERT ACCESS TOKEN HERE */ })

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/upload', (req, res) => {
  res.render('upload.ejs')
})

app.get('/missingFile', (req, res) => {
  res.render('missingFile.ejs')
})

app.post('/upload', (req, res) => {
  var app_name = req.body.app_name
  var apk_file = req.files.apk_file
  var aia_file = req.files.aia_file

  if (!(apk_file && aia_file)) {
    res.redirect('/missingFile')
  }

  var file_name = '/photo.jpg'

  //// testing access token
  // dbx.filesListFolder({path: ''})
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });

  console.log(apk_file)

  var apk_path = '/' + app_name + '/' + app_name + '.apk'

  var options = {
    url: 'https://content.dropboxapi.com/2/files/upload',
    headers: {
      'Authorization': 'Bearer INSERT ACCESS TOKEN HERE',
      'Dropbox-API-Arg': '{"path": "' + apk_path + '"}',
      'Content-Type': 'application/octet-stream'
    },
    formData: apk_file
  }

  // request.post(options, (error, response, body) => {
  //   // TODO
  // })

  res.redirect('/upload')
})


