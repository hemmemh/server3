const Router = require('express')
const basketControllers = require('../controllers/basketController')
const router = new Router()

router.post('/',basketControllers.addToBasket)
router.post('/get',basketControllers.getBasket)




module.exports = router