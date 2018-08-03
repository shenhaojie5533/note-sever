const {Router}=require('express')
const router=Router()

const rejiste = require('./rejiste')
const login = require('./login')
const details = require('./details')
const swiper = require('./swiper')
var path = require('path')

router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../page/index.html'))
})
router.use(rejiste)
router.use(login)
router.use(details)
router.use(swiper)


module.exports = router;