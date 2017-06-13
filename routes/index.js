const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');
// only imports the catchErrors function from file

/* GET Home Page */
router.get('/', catchErrors(postController.getPosts));

/* GET Posts Page */
router.get('/posts', catchErrors(postController.getPosts));

/* GET Post */
router.get('/add', authController.isLoggedIn, postController.addPost);

/* POST Blog Post */
router.post('/add', catchErrors(postController.createPost));

/* GET Edit Post Page */
router.get('/posts/:id/edit', catchErrors(postController.editPost));

/* POST Edit Post Page */
router.post('/add/:id', catchErrors(postController.updatePost));

/* GET register page. */
router.get('/register', userController.registerForm);

/* POST register page. */
// 1. Validate the registration data
// 2. Check if user already exist
// 3. Register User
// 4. log them in immediately
router.post('/register',  
  userController.validateRegister,
  userController.checkIfUserExist,  
  userController.register,
  authController.login
);

/* Get login Page */
router.get('/login', userController.loginForm);

/* POST login Page */
router.post('/login', authController.login);

/* GET logout Page */
router.get('/logout', authController.logout);

/* GET Account Page */
router.get('/account', authController.isLoggedIn, userController.account);

/* POST Account Page */
router.post('/account', catchErrors(userController.updateAccount));

/* POST Forgot Password Page */
router.post('/account/forgot', catchErrors(authController.forgot));

/* Forgot Password Link */
router.get('/account/reset/:token', catchErrors(authController.reset));

/* POST Update Password */
router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));

/* GET Author Posts */
router.get('/author/:id/:name', catchErrors(postController.authorPosts));

module.exports = router;
