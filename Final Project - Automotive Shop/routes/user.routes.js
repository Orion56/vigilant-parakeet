const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/auth')
const router = require('express').Router()
//Admin routes
router.post('/loginAdmin',userController.loginAdmin)
router.post('/add',adminAuth,userController.add)
router.get('/showAll', adminAuth, userController.showAll)
router.get('/showSngl/:id',adminAuth,userController.showSngl)
router.delete('/delSngl/:id',adminAuth,userController.delSngl)
router.delete('/delAll',adminAuth,userController.delAll)
//router.patch('/editAll',userController.editAll)
router.post('/logout',adminAuth,userController.logOut)

//Customer routes
router.post('/register',userController.add)
router.post('/login',userController.login)
router.get('/profile/:id',auth,userController.showSngl)
router.patch('/editSngl/:id',auth,userController.editSngl)
router.patch('/edit',auth,userController.edit)
router.delete('/delSngl/:id', auth, userController.delSngl)
router.post('/book/:carId',auth,userController.bookCar)
router.get('/myCars/:id',auth,userController.myCars)
router.delete('/delCar/:carId',auth,userController.delCar)
router.post('/logout',auth,userController.logOut)

module.exports = router
