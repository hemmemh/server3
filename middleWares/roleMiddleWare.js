const ApiError = require("../Error/ApiError")
const jwt = require('jsonwebtoken')

module.exports = function(Role){
   return function(req,res,next){
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return next(ApiError.forbidden('Неавторизован'))
            }
            const verify = jwt.verify(token,process.env.JWT_REFRESH_SECRET)
          
            let bool = false
            for (let index = 0; index < verify.role.length; index++) {
                const el = verify.role[index];
                if (el.name === Role) {
                    bool = true
                }
                
            }
            if (  bool != true) {
                return next(ApiError.forbidden('нет доступа'))
            }
            
            req.user = verify
            next()
        } catch (error) {
            return next(ApiError.forbidden('Неавторизован'))
        }
    
    }

}


