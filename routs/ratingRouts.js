const Router = require('express')
const ratingControllers = require('../controllers/ratingController')
const router = new Router()

router.post('/',ratingControllers.addRate)
router.get('/',ratingControllers.getAll)
module.exports = router