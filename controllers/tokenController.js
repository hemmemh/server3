const { Token,User } = require("../models/modes")
const jwt = require('jsonwebtoken')

class tokenControllers{

    generateToken(payload){
        
            const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn:"24h"})
            const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:"30d"})
            return {
                accessToken,
                refreshToken
            }
       
        
    }

 async  validateRefreshToken(token){
        try {
            const userData =await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }  
}
  
    async createTokens(userId,refreshToken){
        try {
            const token = await Token.findOne({where:{userId}})
            if (token) {
                token.refreshToken = refreshToken
                const response = await token.save()
                return response
            }
            const newToken = await Token.create({userId,refreshToken})
            return newToken
        } catch (error) {
            console.log(error);
        }
        
    }
    async getAll(req,res){
        try {
        const response =await Type.findAll()
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new tokenControllers()