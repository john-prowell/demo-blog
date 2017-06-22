const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Please enter a Post Title!'
    },
    text: {
        type: String,
        trim: true,
        required: 'Please enter your post!'
    },
    image: String,
    category: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author'
    },
    created: {
    type: Date,
    default: Date.now
    }
  }, {
      toJSON: { virtuals: true },
      toObject: { virtuals: true}
});

// which field on our post needs to match up
// with which field on the comment
// find comments where post _id property === comments post property
postSchema.virtual('comments', {
    ref: 'Comment', // What model to link?
    localField: '_id', // which field on the post?
    foreignField: 'post' // which field on the comment?
});

module.exports = mongoose.model('Post', postSchema);
