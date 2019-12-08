const { $user } = require('micro');
const { MoleculerError } = require('micro/mods/App');
const { Account } = require('#/models');

// cf register comments
const crypt = (x) => x;

module.exports = async function login ({ pseudo, password }) {
  const user = await $user.findOne({ pseudo });
  if (!user) {
    throw new MoleculerError('Login failed', 401, 'Unauthorized');
  }

  const account = await Account.findOne({ userId: user.id });
  if (account.password !== crypt(password)) {
    throw new MoleculerError('Login failed', 401, 'Unauthorized');
  }

  return { token: account.token, user };
}