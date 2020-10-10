const router = require('express').Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());

router.post('/auth', (req, res) => {

    User.findOne({email:req.body.email},(err, user) => {

        console.log('auth-debug: fetched user',user);

        if(err){
            console.log('auth-debug: create error',err);
            res.statusCode = 400;
            res.json({
                error:err
            });
        }else{
            if(user == null){
                User.create(req.body, (err, data) => {
                    if(err){
                        console.log('auth-debug: create error',err);
                        res.statusCode = 400;
                        res.json({
                            error:err
                        }); 
                    }else{
                        if(data !== null){
                            res.statusCode = 200;
                            res.setHeader('Content-type','application/json');
                            const token = jwt.sign({_id:data._id},process.env.TOKEN_SECRET);
                            //res.header('auth-token',token)
                            console.log('auth-debug: token',token);
                            res.json({
                                _token: token,
                                _user:data
                            });
                        }
                    }
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
        }
    })

    // User.findOne({email:req.body.email})
    //     .then((user) => {

    //         console.log('auth-debug: user fetched',user);

    //         if(user === null){
    //             User.create(req.body)
    //                 .then((user) => {
    //                     res.statusCode = 200;
    //                     res.setHeader('Content-type','application/json');
    //                     const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    //                     //res.header('auth-token',token)
    //                     console.log('auth-debug: token',token);
    //                     res.json({
    //                         _token: token,
    //                         _user:user
    //                     });
    //                 }, (err) => {
    //                     console.log('auth-debug: create error',err);
    //                     res.statusCode = 400;
    //                     res.json({
    //                         error:err
    //                     });
    //                 })
    //                 .catch((err) => {
    //                     console.log('auth-debug: create exception',err);
    //                     res.statusCode = 400;
    //                     res.json({
    //                         error:err
    //                     });
    //                 })
    //         }else{
    //             res.statusCode = 200;
    //             res.setHeader('Content-type','application/json');
    //             const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    //             //res.header('auth-token',token)
    //             res.json({
    //                 _token: token,
    //                 _user:user
    //             });
    //         }
    //     }, (err) => {
    //         res.statusCode = 400;
    //         console.log('auth-debug: error',err);
    //         res.json({
    //             error:err
    //         });
    //     })
    //     .catch((err) => {
    //         res.statusCode = 400;
    //         console.log('auth-debug: exception',err);
    //         res.json({
    //             error:err
    //         });
    //     })    

})

module.exports = router;