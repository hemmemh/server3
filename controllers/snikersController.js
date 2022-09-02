const { Snickers,Rating } = require("../models/modes")
const { SnickersInfo } = require("../models/modes")

const path = require('path')
const uuid = require('uuid')
const { Op } = require("sequelize")
class SnikersControllers{
    async create(req,res){
        try {
            let {name,price,typeId,brandId,info} = req.body
            const {img} = req.files
            let image = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname,'..','static',image)) 
            const response =await Snickers.create({name,price,img:image,typeId,brandId})
            if (info) {
                 info = JSON.parse(info)
                info.forEach(element => 
                    SnickersInfo.create({name:element.name,description:element.description,snickerId:response.id})
                );
            }
            await Rating.create({userId:1,snickerId:response.id})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
    async getAll(req,res){
        try {
        let {typeId,brandId,page,limit,search} = req.query
        page = page || 1
        limit = limit || 3
        let offset = limit * page - limit
        let response
        if (typeId && brandId) {
            response =await Snickers.findAndCountAll({where:{typeId,brandId,name:{[Op.like]:'%'+ search + '%'}},limit,offset})
        }
        if (typeId && !brandId) {
            response =await Snickers.findAndCountAll({where:{typeId,name:{[Op.like]:'%'+ search + '%'}},limit,offset})
        }
        if (!typeId && brandId) {
            response =await Snickers.findAndCountAll({where:{brandId,name:{[Op.like]:'%'+ search + '%'}},limit,offset})
        }
        if (!typeId && !brandId) {
            response =await Snickers.findAndCountAll({where:{name:{[Op.like]:'%'+ search + '%'}},limit,offset})
        }
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }

    async getOne(req,res){
        try {
        const {id} = req.params
        const response =await Snickers.findOne({where:{id},include:[{model:SnickersInfo, as:'info'},{model:Rating, as:'rating'}]})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new SnikersControllers()