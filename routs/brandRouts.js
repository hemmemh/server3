const Router = require('express')
const BrandController = require('../controllers/brandController')
const roleMiddleWare = require('../middleWares/roleMiddleWare')
const router = new Router()

router.post('/',BrandController.create)
router.get('/',BrandController.getAll)
router.post('/getOne',BrandController.getOne)

module.exports = router