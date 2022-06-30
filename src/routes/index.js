const express = require('express'),
      Imagen = require('../models/imagen'),
      app = express();


app.get('/', (req,res) => {
    Imagen.find().exec((err, imagenes) => {
        if(err) {
            res.status(404).json({
                ok: false,
                menssage: 'Error al traer las imagenes'
            })
        }

        res.json({
            ok: true,
            imagenes
        })
    })
})


app.post('/crear', (req,res) => {
    let body =  req.body;
    let file = req.file;

    console.log(file)

    let newImage = {
        title: body.title,
        description: body.description,
        filename: file.fieldname,
        path: '/img/uploads/' + req.file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    }

    Imagen.create(newImage, (err, imagen) => {
        if(err) {
            res.status(404).json({
                ok: false,
                menssage: 'erro al crear imagen'
            })
        }

        res.json({
            ok: true,
            imagen
        })
    })
})


module.exports = app;