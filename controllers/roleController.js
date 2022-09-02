const { Role,User } = require("../models/modes")


class RoleControllers{
    async create(req,res){
        try {
        const {name} = req.body
        const response =await Role.create({name})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
    async getAll(req,res){
        try {
        const response =await Role.findAll()
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
    async setRole(req,res){
        try {
        const {userId,roleId} = req.body
        const user =await User.findByPk(userId)
        const role =await Role.findByPk(roleId)
        await user.addRole(role)
        const response = await User.findOne({where:{id:userId},include:[{model:Role,as:"role"}]})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
     }
}

module.exports = new RoleControllers()