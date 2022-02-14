const login = (authService) => {
  return async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const accessToken = await authService.login({ email, password });
      return res.status(200).json({
        message: 'login successful',
        accessToken,
      });
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = login;
