// 1. get express
const express = require('express')
const notesController = require('../controllers/notes')

// 2. create router
const router = express.Router()

// 3. add routes
router.post('/', notesController.create)
router.get('/', notesController.readAll)
router.get('/:noteId', notesController.readOne)
router.delete('/:noteId', notesController.remove)


module.exports = router