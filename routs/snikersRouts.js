const Router = require('express')
const snikersControllers = require('../controllers/snikersController')
const router = new Router()

router.post('/',snikersControllers.create)
router.get('/',snikersControllers.getAll)
router.get('/:id',snikersControllers.getOne)


module.exports = router