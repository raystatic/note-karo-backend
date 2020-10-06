const router = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../utils/verifyToken');
const User = require('../models/User');

router.use(bodyParser.json());

router.get('/',verifyToken,(req, res) => {
    const userId = req.user._id;
    User.findOne({_id:userId})
        .then((user) => {
            res.statusCode = 200
            res.setHeader('Content-type','application/json');
            res.json({
                success:true,
                _user:user
            })
        }, (err) => {
            res.statusCode = 400
            res.json({
                error:err
            })
        })
        .catch((err) => {
            res.statusCode = 400
            res.json({
                error:err
            })
        })
})

module.exports = router;
