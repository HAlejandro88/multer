const express =  require('express'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      indexroute = require('./routes/index'),
      app = express(),
      cors = require('cors');

const uuid = require('uuid/dist/v4');

const path = require('path');


mongoose.connect("mongodb://localhost:27017/develop", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => {
    console.log('base de Datos: \x1b[32m%s\x1b[0m', 'online');
}).catch((error) => console.log(error));


app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, 'pedro' + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));



app.use('/inicial', indexroute);


app.listen(3000, 
    () => console.log('esta vivo: \x1b[32m%s\x1b[0m', 'linea'))