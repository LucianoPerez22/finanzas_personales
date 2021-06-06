'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/finanzas');

const conn = require('../conn/conn');

//Rutas Login
router.get('/login/:email/:password', controller.login)
router.post('/registerUser', controller.registerUser)

//Rutas Movimientos (finanzas)
router.get('/listar/:id', controller.viewAll)
router.post('/finanzas', controller.finanzasNew)
router.put('/finanzas/:id', controller.finanzasEdit)
router.delete('/finanzas/:id', controller.finanzasDelete)


//Rutas Categorias
router.get('/category', controller.listarCat)
router.post('/category', controller.createCat)
router.put('/category/:id', controller.editCat)
router.delete('/category/:id', controller.deleteCat)




module.exports = router;
  