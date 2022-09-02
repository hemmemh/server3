const Router = require('express')
const typeControllers = require('../controllers/typeControllers')
const authMiddleware = require('../middleWares/authMiddleware')
const roleMiddleWare = require('../middleWares/roleMiddleWare')
const router = new Router()

router.post('/',typeControllers.create)
router.get('/',typeControllers.getAll)
router.post('/getOne',typeControllers.getOne)


module.exports = router