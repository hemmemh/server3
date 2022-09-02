const { Brand, Type } = require("../models/modes")


class BrandControllers{
    async create(req,res){
        try {
        const {name} = req.body
        const response =await Brand.create({name})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
    async getAll(req,res){
        try {
        const response =await Brand.findAll()
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }

    async getOne(req,res){
        const {idBrand} = req.body
        try {
            const response =await Brand.findOne({where:{id:idBrand}})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new BrandControllers()