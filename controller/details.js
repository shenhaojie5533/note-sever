const {Router} = require('express')
const router = Router()
const details = require('../database/details')

router.post('/addArticle', (req, res) => {
    if(req.session.user) {
        let {title,content, contents,looknum} = req.body
        let author = req.session.user.username
        let pic = req.session.user.usericon
            details.create({
                title,
                content,
                contents,
                author,
                pic,
                looknum
            }).then(data => {
                res.json({
                    code: 200,
                    msg: '文章发布成功'
                })
            })
    }
    else {
        res.json({
            code: 403,
            msg: '未登录不能发布笔记'
        })
    }
});

router.post('/getList', (req, res) => {
    let {_id} = req.body

    details.find({_id}).then(data =>{
        res.json({
            code: 200,
            msg: '成功获取列表'
        })
    })
});
router.get('/getDetail', (req, res) => {
    details.find()
        .sort({_id: -1})
        .then(data =>{
        res.json({
            code: 200,
            data,
            msg: '成功获取详情'
        })
    })
})
router.post('/getDetails', (req, res) => {
    let {_id} = req.body
    console.log(_id);
    details.findOne({_id}).then(data =>{
        let looknum = data.looknum+=1
        details.update({_id},{$set:{looknum}})
            .sort({_id: -1})
            .then(data =>{
        })
        res.json({
            code: 200,
            data,
            msg: '成功获取列表'
        })
    })
});

router.get('/getschli',(req,res)=>{
    let {title,
        pn=1,
        size=10
    } = req.query
    console.log(title);
    let query ={}
        if (title){
        let reg = new RegExp(title)
        query = {
            $or:[
                {
                    title:reg
                },
                {
                    content:reg
                },
                {
                    author:reg
                }
            ]
        }
    }

    details.find(query)
        .sort({_id: -1})
        .skip(size*(pn-1))
        .limit(size)
        .then(data=>{
        res.json({
            code: 200,
            data,
        })
    })
})

module.exports = router