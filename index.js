require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const db = require('./db')
const cors = require('cors')
const apiErrorMiddleWare = require('./middleWares/apiErrorMiddleWare')
const models = require('./models/modes')
const router = require('./routs/index')
const cookieParser = require('cookie-parser')
const app =  express()
const path = require('path')

app.use(cookieParser())
app.use(cors({

 
}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api',router)

app.use(apiErrorMiddleWare)
const start =async ()=>{
    try {
        await db.authenticate()
        await db.sync()
        app.listen(process.env.PORT,()=>console.log(`подключен к порту ${process.env.PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()
