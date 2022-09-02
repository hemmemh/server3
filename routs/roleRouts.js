const Router = require('express')
const roleControllers = require('../controllers/roleController')
const router = new Router()

router.post('/',roleControllers.create)
router.get('/',roleControllers.getAll)
router.post('/setRole',roleControllers.setRole)

module.exports = router