const { DataTypes } = require('sequelize')
const db  = require('../db')


const User = db.define("user", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    email:{type:DataTypes.STRING,unique:true,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
    isActivated:{type:DataTypes.BOOLEAN,defaultValue:false},
    activationLink:{type:DataTypes.STRING}
})
const Token = db.define("token", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    refreshToken:{type:DataTypes.STRING,allowNull:false},
})

const Role = db.define("role", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
})
const userRole = db.define("userRole", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
})


const Basket = db.define("basket", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
})


const SnickersRef = db.define("snickersRef", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
})


const Rating = db.define("rating", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    rate:{type:DataTypes.INTEGER,defaultValue:0},
    rating:{type:DataTypes.INTEGER,defaultValue:0},
})

const Snickers = db.define("snickers", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
    img:{type:DataTypes.STRING},
})

const SnickersInfo = db.define("snickersInfo", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false},
  
})

const Type = db.define("type", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
  
})

const Brand = db.define("brand", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
  
})

const typeBrand = db.define("typeBrand", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
  
})

User.belongsToMany(Role,{through:userRole,as:"role"})
Role.belongsToMany(User,{through:userRole})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Rating,{as:"rating"})
Rating.belongsTo(User)

Basket.hasMany(SnickersRef,{as:"snickersRef"})
SnickersRef.belongsTo(Basket)

Snickers.hasMany(SnickersInfo)
SnickersInfo.belongsTo(Snickers)


Snickers.hasOne(SnickersRef)
SnickersRef.belongsTo(Snickers)

Snickers.hasOne(Rating)
Rating.belongsTo(Snickers)

Type.hasMany(Snickers)
Snickers.belongsTo(Type)

Brand.hasMany(Snickers)
Snickers.belongsTo(Brand)

Type.belongsToMany(Brand,{through:typeBrand})
Brand.belongsToMany(Type,{through:typeBrand})

Snickers.hasMany(SnickersInfo,{as:'info'})
SnickersInfo.belongsTo(Snickers)
module.exports={
    User,
    Role,
    Basket,
    userRole,
    Rating,
    SnickersRef,
    Snickers,
    SnickersInfo,
    Type,
    Brand,
    typeBrand,
    Token,
}