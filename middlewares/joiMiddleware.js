const AppError = require('../error/AppError');

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (!error) {
      return next();
    } else {
      const { details } = error;
      let message = '';
      details.forEach((element) => {
        message += element.message + ' ';
      });

      return next(new AppError(message, 400));
    }
  };
};
