const { Type } = require("../models/modes")


class typeControllers{
    async create(req,res){
        try {
            const {name} = req.body
        const response =await Type.create({name})
        return res.json(response)
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

    async getOne(req,res){
        const {idType} = req.body
        try {
        const response =await Type.findOne({where:{id:idType}})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new typeControllers()