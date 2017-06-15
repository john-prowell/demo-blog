const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.homePage = (req, res) => {
    res.render('index', { title: 'My Demo Blog' });
};

exports.addPost = (req, res) => {    
    res.render('editPost', { title: 'Add Post'});
};

exports.createPost = async (req, res) => {
    req.body.author = req.user._id;
    const post = await (new Post(req.body)).save();
    //await post.save(); // returns promise
    //res.json(req.body);
    req.flash('success', `Your post "<strong>${post.title}</strong>" was saved!`);
    res.redirect('/');    
};

exports.getPosts = async (req, res) => {
    // 1. Query the database for a list of all posts before we can dsplay them on the page
    const posts = await Post.find().populate('author'); // Post.find() returns a promise
    //console.log(posts);
    res.render('posts', { title: 'Posts', posts }); // passing in the returned post data into the pug template posts.pug
};

const confirmOwner = (post, user) => {
    // the post.author is an object id and in order to compare and object id to a string,
    // you need to use the equals() method that lives inside of it
    if (!post.author.equals(user._id)) {
        throw Error('You must be the post author in order to edit it');
    }
};

exports.editPost = async (req, res) => {
    // 1. Find the post given the id
    // res.json(req.params);
    const post = await Post.findOne({ _id: req.params.id }) // Post.findOne returns a promise so we have to await it
    //res.json(post);
    // 2. Confirm they are the owner of the post    
    confirmOwner(post, req.user);
    // 3. Render out the edit form so the user can update their post
    res.render('editPost', { title: `Edit ${post.title}`, post }); // passing the post title and the entire post to editPost.pug template
};

exports.updatePost = async (req, res) => {
    // find and update the post
    const post = await Post.findOneAndUpdate({ _id: req.params.id}, req.body, {
        new: true, // return the new post instead of the old one
        runValidators: true // runs validators in model like model or true etc.
    }).exec();
    //tell them it worked!
    req.flash('success', `Successfully updated "${post.title}".`)
    // redirect to the edit post page
    res.redirect(`/posts/${post._id}/edit`);
};

exports.authorPosts = async (req, res) => {
    //res.json(req.params);
    const id = req.params.id; // takes in the id
    const author = req.params.name;
    const posts = await Post.find({ author: id })
        .populate('author')        
        .sort({ created: 'desc'});    
    res.render('authorPosts', { title: `All Posts By: ${author}`, posts })
};

exports.categoryPosts = async (req, res) => {
    const category = req.params.name;
    const posts = await Post.find({ category: category })
    .populate('author')
    .sort({ created: 'desc' });
    res.render('posts', { title: `All Posts in ${category}`, posts});
}
