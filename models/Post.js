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
    comments: [{
    body: { type : String, default : '' },
    user: { type : mongoose.Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
    created: {
    type: Date,
    default: Date.now
    }
  }, {
      toJSON: { virtuals: true },
      toObject: { virtuals: true}  
});

// create virtual user property under the author property of the post schema
// author property already has / is the _id of the user
// the virtual fields pull in the user fields from the user model
// to be available on the post model under author
// the fields are populated when the db find for all post

// postSchema.virtual('authors', {
//     ref: 'User', // User model
//     localField: 'author', // author field in POST schema
//     foreignField: '_id'   // user _id of User model
// });

// function autopopulate(next) {
//     this.populate('authors');
//     next();
// }
// // whenenver I query post all the author data will be populated
// postSchema.pre('find', autopopulate);
// postSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Post', postSchema);