const Joi = require('@hapi/joi');
const { app } = require('micro');
const { User } = require('#/models');

// simple example (kinda useless for this case)
const validate = app.makeValidator(Joi.object().required().keys({
  pseudo: Joi.string().required()
}));

// useless args destructuration with ts :/
// we are destructuring here to make everything more explicit
module.exports = validate(async function create ({ pseudo }) {
  const user = await User.create({ pseudo });
  app.emit('user.created', user);
  return user;
});
