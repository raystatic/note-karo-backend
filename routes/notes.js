const router = require('express').Router();
const Notes = require('../models/Notes');
const bodyParser = require('body-parser');
const verifyToken = require('../utils/verifyToken');
const { model } = require('../models/Notes');

router.use(bodyParser.json());

router.route('/')
.get(verifyToken,(req, res) => {
    const userId = req.user._id;
    Notes.find({
        author:userId
    })
    .then((notes) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json({
            success:true,
            _notes:notes
        });
    }, (err) => {
        res.statusCode = 400
        res.json({
            success:false,
            error:err
        })
    })
    .catch((err) => {
        res.statusCode = 400
        res.json({
            success:false,
            error:err
        })
    })
})
.post(verifyToken, (req, res) =>{
    const _note = req.body;
    _note.author = req.user._id
    Notes.create(_note)
        .then((note) => {
            res.statusCode = 200;
            res.json({
                success:true,
                _note:note
            });
        }, (err) => {
            res.statusCode = 400
            res.json({
                success:false,
                error:err
            })
        })
        .catch((err) => {
            res.statusCode = 400
            res.json({
                success:false,
                error:err
            })
        })
})

module.exports = router;