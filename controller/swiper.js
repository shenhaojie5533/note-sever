const {Router} = require('express')
const router = Router()
const swiper = require('../database/swiper')

router.post('/addSwiper', (req, res) => {
    if(req.session.user) {
        let {title,pic} = req.body
        swiper.create({
            title,
            pic
        }).then(data => {
            res.json({
                code: 200,
                msg: '轮播图上传成功'
            })
        })
    }
    else {
        res.json({
            code: 403,
            msg: '未登录不能上传'
        })
    }
});
router.get('/getSwiper', (req, res) => {
    swiper.find().then(data =>{
        res.json({
            code: 200,
            data,
            msg: '成功获取轮播信息'
        })
    })
})
module.exports = router