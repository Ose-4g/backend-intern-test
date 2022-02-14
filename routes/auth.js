const signUp = require('../controllers/auth/signUp');
const joiMiddleware = require('../middlewares/joiMiddleware');
const User = require('../models/User');
const UserRepository = require('../repository/UserRepository');
const AuthService = require('../services/AuthService');
const { userSignUpValidator } = require('../validation/auth');

const router = require('express').Router();

const userRepository = new UserRepository(User);
const authService = new AuthService(userRepository);

router.post('/signup', joiMiddleware(userSignUpValidator),signUp(authService));

module.exports = router;
