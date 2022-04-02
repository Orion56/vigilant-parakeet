const router = require('express').Router()
const carController = require('../controllers/car.controller')
const upload = require('../middleware/fileUpload')

router.post('/add', carController.add)
//
router.get('/showAll',carController.showAll)
router.get('/showSngl/:id',carController.showSngl)
router.delete('/delSngl/:id',carController.delSngl)
router.delete('/delAll',carController.delAll)
router.patch('/editSngl/:id',carController.editSngl)
router.patch('/editAll',carController.editAll)

module.exports = router
