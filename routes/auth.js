const router = require('express').Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());

router.post('/auth', (req, res) => {

    console.log('auth-debug: enter',req.body);
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user === null){
                User.create(req.body)
                    .then((user) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type','application/json');
                        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
                        //res.header('auth-token',token)
                        console.log('auth-debug: token',token);
                        res.json({
                            _token: token,
                            _user:user
                        });
                    }, (err) => {
                        res.statusCode = 400;
                        res.json({
                            error:err
                        });
                    })
                    .catch((err) => {
                        res.statusCode = 400;
                        res.json({
                            error:err
                        });
                    })
            }else{
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
                //res.header('auth-token',token)
                res.json({
                    _token: token,
                    _user:user
                });
            }
        }, (err) => {
            res.statusCode = 400;
            console.log('auth-debug: error',err);
            res.json({
                error:err
            });
        })
        .catch((err) => {
            res.statusCode = 400;
            console.log('auth-debug: exception',err);
            res.json({
                error:err
            });
        })    

})

module.exports = router;