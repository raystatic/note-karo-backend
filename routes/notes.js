const router = require('express').Router();
const Notes = require('../models/Notes');
const bodyParser = require('body-parser');
const verifyToken = require('../utils/verifyToken');

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
            message:err
        })
    })
    .catch((err) => {
        res.statusCode = 400
        res.json({
            success:false,
            message:err
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
                message:err
            })
        })
        .catch((err) => {
            res.statusCode = 400
            res.json({
                success:false,
                message:err
            })
        })
})
.patch(verifyToken,(req, res) => {
    const _note = req.body;
    _note.author = req.user._id;
    const noteId = req.body.noteId;


    Notes.update({
        _id: noteId,
        author:_note.author
    }, {
        title: _note.title,
        color:_note.color,
        text:_note.text,
        author:_note.author
    })
    .then((note) => {
        console.log('note 🏚',note)
        if(note){
            note.color = _note.color
            note.text = _note.text
            note.title = _note.title
            note.author = _note.author
            note.__v = _note.__v
            res.statusCode = 200;
            res.json({
                success:true,
                _note:note
            });
        }else{
            res.statusCode = 401;
            res.json({
                success:false,
                message:'No note found with given user and noteId'
            })
        }
    }, (err) => {
        res.statusCode = 400
        res.json({
            success:false,
            message:err
        })
    })
    .catch((err) => {
        res.statusCode = 400
        res.json({
            success:false,
            message:err
        })
    })

})
.delete(verifyToken, (req, res) => {
    const noteId = req.body.noteId;
    const userId = req.user._id;

    Notes.findById(noteId)
        .then((note) => {
            if(note.author === userId){
                note.remove()
                res.statusCode = 200;
                res.json({
                    success:true
                });
            }else{
                res.statusCode = 401;
                res.json({
                    success:false,
                    message:'Invalid user'
                })
            }
        }, (err) => {
            res.statusCode = 400;
            res.json({
                success:false,
                message:err
            })  
        })
        .catch((err) => {
            res.statusCode = 400;
            res.json({
                success:false,
                message:err
            });
        })

})

module.exports = router;