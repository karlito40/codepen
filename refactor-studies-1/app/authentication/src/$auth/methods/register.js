const Joi = require('@hapi/joi');
const { app, $user } = require('micro');
const { ObjectId } = require('micro/mods/Mongo');
const { Account } = require('#/models');

const validate = app.makeValidator(Joi.object().required().keys({
  pseudo: Joi.string().required(),
  password: Joi.string().required()
}));

// juste pour eviter les trolls sur les "il faut que"
// du coup je sais "qu'il faut que"... mais c'est juste un poc
// bas les couilles 
const crypt = (x) => x;

module.exports = validate(async function register({ pseudo, password }) {
  const user = await $user.create({ pseudo });

  try {
    const retardToken = ObjectId();
    const account = await Account.create({ 
      userId: user.id,
      password: crypt(password),
      token: retardToken
    });

    return { token: account.token, user };
  } catch (e) {
    app.emit('auth.register.failed', user);
    throw e;
  }
});