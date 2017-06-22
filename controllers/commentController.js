const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

exports.addComment = async (req, res) => {
    req.body.author = req.user._id; // assinging user to author field
    req.body.post = req.params.id; // id is in url params
    //res.json(req.body);
    const newComment = new Comment(req.body);
    await newComment.save();
    req.flash('success', 'Comment Saved!');
    res.redirect('back');
};
