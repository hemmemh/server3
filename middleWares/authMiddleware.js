const ApiError = require("../Error/ApiError")
const jwt = require('jsonwebtoken')

module.exports =async function(req,res,next){
    try {
       
        const token1 = req.headers.authorization
      
        const token = token1.split(' ')[1]
        
        if (!token) {
            return next(ApiError.forbidden('Неавторизован'))
        }
        
        const verify = jwt.verify(token,'asd12ef')
      
        req.user = verify
        next()
    } catch (error) {
        return next(ApiError.forbidden('Неавторизован'))
    }

}