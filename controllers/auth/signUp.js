const AppError = require('../../error/AppError');

const signUp = (authService) => {
  return async (req, res, next) => {
    const { email, firstName, lastName, password, phoneNumber } = req.body;

    try {
      const data = await authService.signUp({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      return res.status(201).json({
        message: 'User sign up successful',
        data,
      });
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = signUp;
