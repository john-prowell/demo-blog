const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');
const { catchErrors } = require('../handlers/errorHandlers');
// only imports the catchErrors function from file

/* User Routes */
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.checkIfUserExist,
  userController.register,
  authController.login
);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));

/* GET Home Page */
router.get('/', catchErrors(postController.getPosts));

/* Posts Routes */
router.get('/posts/:id', catchErrors(postController.getPost))
router.get('/posts', catchErrors(postController.getPosts));
router.get('/posts/page/:page', catchErrors(postController.getPosts));
router.get('/add', authController.isLoggedIn, postController.addPost);
router.post('/add', catchErrors(postController.createPost));
router.get('/posts/:id/edit', catchErrors(postController.editPost));
router.post('/add/:id', catchErrors(postController.updatePost));
// by author
router.get('/author/:id/:name', catchErrors(postController.authorPosts));
router.get('/author/:id/:name/page/:page', catchErrors(postController.authorPosts));
// by category
router.get('/category/:name', catchErrors(postController.categoryPosts));
router.get('/category/:name/page/:page', catchErrors(postController.categoryPosts));

/* Comment Routes */
router.post('/comments/:id', authController.isLoggedIn, catchErrors(commentController.addComment));

module.exports = router;
