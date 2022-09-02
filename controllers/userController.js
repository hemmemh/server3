const { User,Basket, Role, Token, Rating} = require("../models/modes")
const bccrypt = require("bcrypt")
const ApiError = require("../Error/ApiError")
const {validationResult} = require('express-validator')
const uuid = require('uuid')
const MailService = require('../controllers/sendMail')
const tokenController = require("./tokenController")
const UserDto = require("../Dto/userDto")
class userControllers{

    async registration(req,res,next){
        try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            next(ApiError.BadRequest("ошибка при валидации",errors.array()))
        }
         const {email,password,role} = req.body
         const candidate = await User.findOne({where:{email}})
         if (candidate) {
           return next(ApiError.BadRequest("имейл уже занят"))
        }
        const pass = await bccrypt.hash(password,3)
        const activationLink = uuid.v4()
        const response =await User.create({email,password:pass,activationLink})
        await MailService.sendActivationMail(email,`${process.env.API_URL}/api/user/${activationLink}`)
        await Basket.create({userId:response.id})
        const DtoUSer = new UserDto(response)
        const tokens = tokenController.generateToken({...DtoUSer})
        await tokenController.createTokens(DtoUSer.id,tokens.refreshToken)
        return res.json({token:tokens.refreshToken})
        } catch (error) {
            console.log(error);
        }
        
    }
    async login(req,res,next){
        try {
            const {email,password} = req.body
            const response =await User.findOne({where:{email},include:[{model:Role,as:'role'},{model:Rating,as:'rating'}]})
            if (response.isActivated = false) {
                return next(ApiError.BadRequest("почта неактивна"))
            }
            const pass = bccrypt.compareSync(password,response.password)
            if (!response || !pass) {
                return next(ApiError.BadRequest("имейл или пароль неверен"))
            }
            const DtoUSer = new UserDto(response)
            const tokens = tokenController.generateToken({...DtoUSer})
            console.log(tokens);
            await tokenController.createTokens(DtoUSer.id,tokens.refreshToken)
            return res.json({token:tokens.refreshToken})
        } catch (error) {
            console.log(error);
        }
        
    }

    async check(req,res,next){
        try {
            const {userToken} = req.body;
            console.log(userToken);
        if (!userToken) {

            throw ApiError.forbidden('не валиден1');
        }
        const valid =await tokenController.validateRefreshToken(userToken)
        const tokenV =await Token.findOne({where:{userToken}})
        if (!valid || !tokenV) {
            throw ApiError.forbidden('не валиден2');
        }
        const user =await User.findOne({where:{id:valid.id}})
        const DtoUSer = new UserDto(user)
        const tokens = tokenController.generateToken({...DtoUSer})
        const token =await tokenController.createTokens(DtoUSer.id,tokens.refreshToken)
        res.cookie('refreshToken',tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json({token:token.refreshToken})
        } catch (error) {
            next(error)
        }
        
    }
    async activate(req,res,next){
       try {
        const {activationLink} = req.params
        const user =await User.findOne({where:{activationLink}})
        if (!user){
            throw ApiError.BadRequest('некоректная ссылка')
        }
         user.isActivated = true
         await user.save()
         return res.redirect(process.env.CLIENT_URL)
       } catch (error) {
        
       }
    }

    async getAll(req,res){
        try {
        const response =await User.findAll()
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }

    async getOne(req,res){
        try {
        const {userId} = req.body
        const response =await User.findOne({where:{id:userId},include:[{model:Role, as:'role'},{model:Rating, as:'rating'}]})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }

   
}

module.exports = new userControllers()