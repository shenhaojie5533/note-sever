const {Router} = require('express')
const router = Router()
const user = require('../database/user')
const isEmail = require('validator/lib/isEmail');

router.post('/login',(req,res)=>{
    let {email,password}= req.body;
        user.findOne({email}).then(data =>{
            console.log(data);
            if (data){
                if (password ==data.password){
                    req.session.user = data;
                    let usermsg ={};
                    usermsg.username = data.username;
                    usermsg.email = data.email;
                    usermsg.usericon=data.usericon;
                    res.json({
                        code:'200',
                        data: usermsg,
                        msg:'登录成功'
                    })
                }else {
                    res.json({
                        code:'401',
                        msg:'密码不正确'
                    })
                }
            }else {
                res.json({
                    code:'401',
                    msg:'用户不存在'
                })
            }
        })
})

router.delete('/logout',(req,res)=>{
    req.session.destroy(function (err) {
        if(err){
            console.log(err)
        }
        else {
            res.clearCookie('connect.sid');
            res.json({
                code: 200,
                msg: '退出登陆成功'
            })
        }
    })
})

router.post('/addSwiper', (req, res) => {
    if(req.session.user) {
        let {title,pic} = req.body
        user.create({
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

router.post('/msgchange',(req,res)=>{
    let {usericon} = req.body
    let email =  req.session.user.email
    user.findOneAndUpdate({email},{$set:{usericon}}).then(data=>{
        res.json({
            code:200,
            data
        })
    }).catch(err=>{
        res.json({
            code:400,
        })
    })
})
module.exports = router