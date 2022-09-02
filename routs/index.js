const Router = require('express')
const router = new Router()
const brandRouter  = require('./brandRouts')
const snikersRouter  = require('./snikersRouts')
const typeRouter  = require('./typeRouts')
const userRouter  = require('./userRouts')
const roleRouter  = require('./roleRouts')
const basketRouter  = require('./basketRouts')
const ratingRouter  = require('./ratingRouts')

router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/snikers',snikersRouter)
router.use('/user',userRouter)
router.use('/role',roleRouter)
router.use('/basket',basketRouter)
router.use('/rating',ratingRouter)

module.exports = router