const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

module.exports = {
  validateUser: (userData) => {
    return userSchema.validate(userData);
  },
};