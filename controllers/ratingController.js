const { Role,User,Rating } = require("../models/modes")


class RatingControllers{
    async addRate(req,res){
        try {
        const {snickerId,userId,rating} = req.body
        const rate1 =await Rating.findOne({where:{snickerId}})
        const user =await User.findOne({where:{id:userId},include:[{model:Rating,as:"rating"}]})
       let num = true
        for (let index = 0; index < user.rating.length; index++) {
            const el = user.rating[index];
            if (el.id ===rate1.id){
                num = false
                break }   
        }
        console.log(num);
        if (num === true) {
            const ratingValue = rate1.rating  + rating
            const value = rate1.rate + 1
            rate1.rate = value
            rate1.rating = ratingValue
            await rate1.save()
            user.addRating(rate1)
        }
        res.json(user)
        } catch (error) {
            console.log(error);
        }
        
    }
    async getAll(req,res){
        try {
        const response =await Rating.findAll()
        return res.json(response)
        } catch (error) {
            console.log(error);
        }
        
    }
  
}

module.exports = new RatingControllers()