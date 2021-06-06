'use strict'
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3080;

const app = express();

const router=require('./routes/finanzas');

//Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());


//RUTAS
app.use("/", router)


app.listen(PORT, ()=>{
    console.log(`Server run on ${PORT}`)
})

