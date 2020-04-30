const express = require('express'),
      path = require('path'),
      fs = require('fs'),
      app = express();


app.get('/:img', (req,res) => {
    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../public/img/uploads/${img}`);
    console.log(pathImage);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage)
    } else {
        let pathNoImagen = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImagen);
    }
})


module.exports = app;