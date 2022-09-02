const { Basket,SnickersRef,Snickers } = require("../models/modes")

class BasketControllers{


    async addToBasket(req,res){
        try {
        const {snickerId,userId} = req.body
        const response =  await SnickersRef.create({userId:userId,snickerId:snickerId,basketId:userId})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
    async getBasket(req,res){
        try {
        const {userId} = req.body
        const response =await Basket.findOne({where:{userId},include:[{model:SnickersRef,as:"snickersRef"}]})
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new BasketControllers()