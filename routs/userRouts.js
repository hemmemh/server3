const Router = require('express')
const userControllers = require('../controllers/userController')
const router = new Router()
const {body} = require('express-validator')

router.post('/registration',body('email').isEmail(),body('password').isLength({min:3,max:9}),userControllers.registration)
router.post('/login',userControllers.login)
router.get('/',userControllers.check)
router.get('/getAll',userControllers.getAll)
router.post('/getOne',userControllers.getOne)
router.get('/:activationLink',userControllers.activate)


module.exports = router