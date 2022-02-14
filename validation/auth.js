const Joi = require('joi');

module.exports = {
  userSignUpValidator: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Invalid email',
    }),
    firstName: Joi.string().min(3).required().messages({
      'any.required': 'First name is required',
      'string.min': 'First name must be at least 3 characters',
    }),
    lastName: Joi.string().min(3).required().messages({
      'any.required': 'Last name is required',
      'string.min': 'Last name must be at least 3 characters',
    }),
    password: Joi.string().min(8).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
    }),
    phoneNumber: Joi.string().required().messages({
        'any.required': 'Phone number is required',
    })
  }),

  userLoginValidator: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Invalid email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  }),
};